import { ProductService } from './productService';
import { Product } from '@/types';
import { AIChatRequestSchema } from '@/lib/validations';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PRODUCTS } from '@/lib/products-data';

export interface AIShoppingResponse {
  content: string;
  recommendedProducts: Product[];
  suggestedFollowups: string[];
  outfitComposition?: {
    items: Product[];
    totalCost: number;
  };
  toolActionExecuted?: string;
}

export class AIShoppingService {
  /**
   * Process incoming client message through VELA AI Service
   */
  static async processClientMessage(rawBody: unknown): Promise<AIShoppingResponse> {
    // 1. Zod Input Validation
    const validationResult = AIChatRequestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      throw new Error(`Validation Error: ${validationResult.error.errors.map((e) => e.message).join(', ')}`);
    }

    const { message } = validationResult.data;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return this.fallbackProcessQuery(message);
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: `You are VELA, the intelligent personal stylist at VÉLORA, a luxury boutique fashion house ("Curated for your style.").
Your persona is articulate, sophisticated, warm, and fashion-forward.
Suggest real products from our database based on natural language intent (budget in ₹ INR, occasion, aesthetic style, color, category).
Format your response as valid JSON adhering strictly to:
{
  "content": "Your elegant advice to the client...",
  "recommendedProductIds": ["prod-1", "prod-[#]"],
  "isOutfitRequest": false,
  "suggestedFollowups": ["Followup query 1", "Followup query 2"]
}`
      });

      const prompt = `Client Query: "${message}".
Catalog Inventory:
${PRODUCTS.map((p) => `- ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Price: ₹${p.price}, Occasions: ${p.occasion.join(', ')}, Style: ${p.style.join(', ')}, Colors: ${p.colors.map((c) => c.name).join(', ')}, Description: ${p.description}`).join('\n')}

Analyze client intent and return the structured JSON output.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanText);

      const recommendedProducts = PRODUCTS.filter((p) =>
        parsed.recommendedProductIds?.includes(p.id)
      );

      if (parsed.isOutfitRequest || message.toLowerCase().includes('outfit') || message.toLowerCase().includes('build')) {
        const outfit = await ProductService.buildOutfit(undefined, undefined, 12000);
        return {
          content: parsed.content || `VELA has curated a complete VÉLORA ensemble for you.`,
          recommendedProducts: outfit.items,
          suggestedFollowups: parsed.suggestedFollowups || ['Can you adjust the budget?', 'Show me alternative footwear'],
          outfitComposition: {
            items: outfit.items,
            totalCost: outfit.totalOutfitCost,
          },
          toolActionExecuted: 'buildOutfit',
        };
      }

      return {
        content: parsed.content || `VELA has selected these signature pieces for your consideration.`,
        recommendedProducts: recommendedProducts.length > 0 ? recommendedProducts : PRODUCTS.slice(0, 3),
        suggestedFollowups: parsed.suggestedFollowups || ['Tell me about the fabric', 'Show matching accessories'],
        toolActionExecuted: 'geminiFunctionCalling',
      };
    } catch (error) {
      console.error('Gemini LLM call failed, executing VELA fallback engine:', error);
      return this.fallbackProcessQuery(message);
    }
  }

  /**
   * Advanced Fallback Intent Engine with Robust Number & Comma Parsing
   */
  private static async fallbackProcessQuery(userQuery: string): Promise<AIShoppingResponse> {
    const query = userQuery.toLowerCase();

    // 1. Robust Price Limit Extractor (Handles commas like ₹5,000 -> 5000, 10,000 -> 10000)
    let maxPrice: number | undefined;
    const priceMatch =
      query.match(/(?:under|below|less than|within|budget of?|max)\s*₹?\s*([\d,]+)/i) ||
      query.match(/₹?\s*([\d,]+)\s*(?:budget|max|or less|rs|inr)/i) ||
      query.match(/₹\s*([\d,]+)/i) ||
      query.match(/\b(\d{4,5})\b/);

    if (priceMatch && priceMatch[1]) {
      const cleanNum = priceMatch[1].replace(/,/g, '');
      const parsedNum = parseInt(cleanNum, 10);
      if (!isNaN(parsedNum) && parsedNum >= 500) {
        maxPrice = parsedNum;
      }
    }

    // 2. Extract Gender
    let gender: string | undefined;
    if (query.includes('men') || query.includes('man') || query.includes('male') || query.includes('suit') || query.includes('blazer') || query.includes('him')) {
      gender = 'Men';
    } else if (query.includes('women') || query.includes('woman') || query.includes('female') || query.includes('dress') || query.includes('gown') || query.includes('skirt') || query.includes('her') || query.includes('sister')) {
      gender = 'Women';
    }

    // 3. Extract Occasion
    let occasion: string | undefined;
    if (query.includes('wedding') || query.includes('reception') || query.includes('marriage')) occasion = 'Wedding';
    else if (query.includes('date') || query.includes('romantic') || query.includes('dinner')) occasion = 'Date Night';
    else if (query.includes('resort') || query.includes('vacation') || query.includes('beach') || query.includes('summer')) occasion = 'Resort / Vacation';
    else if (query.includes('gala') || query.includes('formal') || query.includes('red carpet')) occasion = 'Formal / Gala';
    else if (query.includes('work') || query.includes('office') || query.includes('meeting')) occasion = 'Workwear';

    // 4. Extract Style
    let style: string | undefined;
    if (query.includes('minimal') || query.includes('clean') || query.includes('sleek')) style = 'Minimal';
    else if (query.includes('glam') || query.includes('fancy')) style = 'Glam';
    else if (query.includes('boho') || query.includes('relaxed')) style = 'Boho';

    // 5. Specific Product Query Intent (e.g. "Tell me about Aurelia" or "Style the Aurelia Silk Wrap Midi Dress")
    const matchedProduct = PRODUCTS.find(
      (p) => query.includes(p.name.toLowerCase()) || query.includes(p.slug) || (p.name.length > 5 && query.includes(p.name.toLowerCase().split(' ')[0]))
    );

    if (matchedProduct) {
      const paired = PRODUCTS.filter((p) => matchedProduct.pairsWith?.includes(p.id));
      const recommendations = paired.length > 0 ? [matchedProduct, ...paired] : [matchedProduct, ...PRODUCTS.filter(p => p.category === matchedProduct.category && p.id !== matchedProduct.id).slice(0, 2)];

      return {
        content: `VELA recommends styling the **${matchedProduct.name}** (₹${matchedProduct.price.toLocaleString('en-IN')}) with these complementary VÉLORA pieces. Crafted from ${matchedProduct.materials}, it offers an effortless silhouette ideal for ${matchedProduct.occasion.join(' or ')}.`,
        recommendedProducts: recommendations,
        suggestedFollowups: [
          `What sizes are available in ${matchedProduct.name}?`,
          `Show matching luxury accessories`,
          `Tell me about the fabric care`
        ],
        toolActionExecuted: 'getProductDetails'
      };
    }

    // 6. Gifting Intent (e.g., "gift for my sister under ₹5,000")
    if (query.includes('gift') || query.includes('present') || query.includes('sister') || query.includes('friend')) {
      let gifts = PRODUCTS.filter((p) => p.category === 'Accessories' || p.tags.includes('gift'));
      if (maxPrice) gifts = gifts.filter((p) => p.price <= maxPrice);

      const selections = gifts.length > 0 ? gifts.slice(0, 4) : PRODUCTS.filter(p => p.price <= (maxPrice || 5000)).slice(0, 4);

      return {
        content: `VELA has curated a selection of signature VÉLORA gifts${maxPrice ? ` within your ₹${maxPrice.toLocaleString('en-IN')} budget` : ''}. Each piece arrives in our signature hardbox packaging with personalized calligraphy notes.`,
        recommendedProducts: selections,
        suggestedFollowups: [
          'Show gifts under ₹4,000',
          'Do you offer silk scarves?',
          'What are your best-selling gold pieces?'
        ],
        toolActionExecuted: 'curateGiftSelection'
      };
    }

    // 7. Outfit Building Intent (e.g., "Build an outfit under ₹6,000" or "Create a summer outfit")
    if (query.includes('outfit') || query.includes('ensemble') || query.includes('complete look') || query.includes('combine')) {
      const outfit = await ProductService.buildOutfit(gender, occasion, maxPrice || 10000);
      
      let outfitDesc = `VELA has styled a complete VÉLORA outfit for you`;
      if (occasion) outfitDesc += ` designed for your **${occasion}**`;
      if (maxPrice) outfitDesc += ` within your **₹${maxPrice.toLocaleString('en-IN')}** budget`;
      outfitDesc += `. The combined ensemble comes to **₹${outfit.totalOutfitCost.toLocaleString('en-IN')}**.`;

      return {
        content: outfitDesc,
        recommendedProducts: outfit.items,
        suggestedFollowups: [
          'Can you adjust the budget?',
          'Show me alternative heels',
          'What outerwear pairs with this?'
        ],
        outfitComposition: {
          items: outfit.items,
          totalCost: outfit.totalOutfitCost,
        },
        toolActionExecuted: 'buildOutfit',
      };
    }

    // 8. Trending / New Arrivals Intent
    if (query.includes('trending') || query.includes('popular') || query.includes('bestseller') || query.includes('new')) {
      const trending = PRODUCTS.filter((p) => p.isTrending || p.isFeatured || p.isNew);
      return {
        content: `VELA presents our most coveted runway and editorial pieces currently defining the VÉLORA silhouette this season.`,
        recommendedProducts: trending.slice(0, 4),
        suggestedFollowups: [
          'Filter these by price under ₹8,000',
          'Show me evening gowns only',
          'What accessories match these?'
        ],
        toolActionExecuted: 'getTrendingCollection'
      };
    }

    // 9. Multi-faceted Catalog Search
    const { products: matches } = await ProductService.searchProducts({
      category: query.includes('dress') ? 'Women' : query.includes('blazer') ? 'Men' : query.includes('bag') || query.includes('jewelry') ? 'Accessories' : query.includes('shoe') || query.includes('heel') || query.includes('loafer') ? 'Footwear' : undefined,
      gender,
      maxPrice,
      occasion,
      style,
      searchQuery: query,
    });

    let finalSelection = matches.length > 0 ? matches.slice(0, 4) : [];
    if (finalSelection.length === 0) {
      finalSelection = PRODUCTS.filter((p) => (maxPrice ? p.price <= maxPrice : true)).slice(0, 4);
    }

    let intro = `VELA has selected these signature VÉLORA pieces for your consideration`;
    if (occasion) intro += ` designed for your **${occasion}**`;
    if (maxPrice) intro += ` within your **₹${maxPrice.toLocaleString('en-IN')}** budget`;
    intro += `.`;

    return {
      content: `${intro} Each garment embodies master craftsmanship, pure silk/cashmere weaves, and timeless elegance.`,
      recommendedProducts: finalSelection,
      suggestedFollowups: [
        `Show options under ₹${maxPrice || 8000}`,
        `Would these work for an evening gala?`,
        `How do I choose the correct size?`
      ],
      toolActionExecuted: 'searchProducts',
    };
  }
}
