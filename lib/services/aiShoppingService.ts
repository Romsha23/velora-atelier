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

/**
 * Advanced Price & Indian Currency Unit Extractor
 * Parses lakhs, lacs, lakh, lac, crores, cr, k, commas, and rupees
 */
function extractPriceBudget(query: string): number | undefined {
  const q = query.toLowerCase();

  // 1. Lakhs / Lacs / Lakh / Lac (e.g. "ruppess 10lacs", "10 lacs", "10 lakhs", "1 lakh", "2.5 lacs")
  const lakhMatch =
    q.match(/(\d+(?:\.\d+)?)\s*(?:lacs|lakhs|lakh|lac|l)\b/i) ||
    q.match(/ruppess?\s*(\d+(?:\.\d+)?)\s*(?:lacs|lakhs|lakh|lac)\b/i) ||
    q.match(/(?:worth|budget of?|price|under|below|for)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(?:lacs|lakhs|lakh|lac)\b/i);

  if (lakhMatch && lakhMatch[1]) {
    const num = parseFloat(lakhMatch[1]);
    if (!isNaN(num)) return Math.round(num * 100000);
  }

  // 2. Crores / Cr (e.g. "1 crore", "2.5 cr")
  const croreMatch = q.match(/(\d+(?:\.\d+)?)\s*(?:crores?|cr)\b/i);
  if (croreMatch && croreMatch[1]) {
    const num = parseFloat(croreMatch[1]);
    if (!isNaN(num)) return Math.round(num * 10000000);
  }

  // 3. Thousands / K (e.g. "10k", "50k", "7.5k")
  const kMatch = q.match(/(\d+(?:\.\d+)?)\s*k\b/i);
  if (kMatch && kMatch[1]) {
    const num = parseFloat(kMatch[1]);
    if (!isNaN(num)) return Math.round(num * 1000);
  }

  // 4. Standard numbers with commas or rupees (e.g. "₹5,000", "10,000", "100000", "rs 8000")
  const priceMatch =
    q.match(/(?:under|below|less than|within|budget of?|worth|max|price)\s*₹?\s*([\d,]+)/i) ||
    q.match(/₹?\s*([\d,]+)\s*(?:budget|max|or less|rs|rupees|ruppess|inr)/i) ||
    q.match(/₹\s*([\d,]+)/i) ||
    q.match(/\b(\d{4,7})\b/);

  if (priceMatch && priceMatch[1]) {
    const cleanNum = priceMatch[1].replace(/,/g, '');
    const parsedNum = parseInt(cleanNum, 10);
    if (!isNaN(parsedNum) && parsedNum >= 500) {
      return parsedNum;
    }
  }

  return undefined;
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

      const maxPrice = extractPriceBudget(message);

      if (parsed.isOutfitRequest || message.toLowerCase().includes('outfit') || message.toLowerCase().includes('design') || message.toLowerCase().includes('build')) {
        const outfit = await ProductService.buildOutfit(undefined, undefined, maxPrice);
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
   * Advanced Fallback Intent Engine with Robust Currency & Lakhs Parsing
   */
  private static async fallbackProcessQuery(userQuery: string): Promise<AIShoppingResponse> {
    const query = userQuery.toLowerCase();

    // 1. Extract Price Budget (lacs, lakhs, cr, k, rupees, ₹)
    const maxPrice: number | undefined = extractPriceBudget(userQuery);

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
    else if (query.includes('glam') || query.includes('fancy') || query.includes('expensive') || query.includes('luxury')) style = 'Glam';
    else if (query.includes('boho') || query.includes('relaxed')) style = 'Boho';

    // 5. Specific Product Query Intent (e.g. "Tell me about Aurelia")
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

    // 6. Gifting Intent
    if (query.includes('gift') || query.includes('present') || query.includes('sister') || query.includes('friend')) {
      let gifts = PRODUCTS.filter((p) => p.category === 'Accessories' || p.tags.includes('gift'));
      if (typeof maxPrice === 'number') {
        const targetPrice = maxPrice;
        gifts = gifts.filter((p) => p.price <= targetPrice);
      }

      const defaultMax = typeof maxPrice === 'number' ? maxPrice : 5000;
      const selections = gifts.length > 0 ? gifts.slice(0, 4) : PRODUCTS.filter(p => p.price <= defaultMax).slice(0, 4);
      const budgetStr = typeof maxPrice === 'number' ? ` within your ₹${maxPrice.toLocaleString('en-IN')} budget` : '';

      return {
        content: `VELA has curated a selection of signature VÉLORA gifts${budgetStr}. Each piece arrives in our signature hardbox packaging with personalized calligraphy notes.`,
        recommendedProducts: selections,
        suggestedFollowups: [
          'Show gifts under ₹4,000',
          'Do you offer silk scarves?',
          'What are your best-selling gold pieces?'
        ],
        toolActionExecuted: 'curateGiftSelection'
      };
    }

    // 7. Outfit Building Intent (e.g. "DESIGN AN OUTFIT WORTH RUPPESS 10LACS", "Build an outfit under ₹6,000", "Create a luxury outfit")
    if (
      query.includes('outfit') ||
      query.includes('design') ||
      query.includes('build') ||
      query.includes('ensemble') ||
      query.includes('complete look') ||
      query.includes('combine') ||
      query.includes('style me') ||
      query.includes('worth')
    ) {
      const outfit = await ProductService.buildOutfit(gender, occasion, maxPrice);

      let outfitDesc = `VELA has curated an `;
      if (typeof maxPrice === 'number' && maxPrice >= 100000) {
        outfitDesc += `ultra-exclusive Haute Couture VÉLORA ensemble for your **₹${maxPrice.toLocaleString('en-IN')}** budget, bringing together our most prestigious Italian silk, Mongolian cashmere, and artisan leather creations.`;
      } else {
        outfitDesc += `exclusive VÉLORA ensemble for you`;
        if (occasion) outfitDesc += ` designed for your **${occasion}**`;
        if (typeof maxPrice === 'number') outfitDesc += ` within your **₹${maxPrice.toLocaleString('en-IN')}** budget`;
        outfitDesc += `.`;
      }

      outfitDesc += ` The combined ensemble comes to **₹${outfit.totalOutfitCost.toLocaleString('en-IN')}**`;
      if (typeof maxPrice === 'number' && maxPrice > 50000 && outfit.totalOutfitCost < maxPrice) {
        outfitDesc += ` (the highest luxury tier in our current atelier collection).`;
      } else {
        outfitDesc += `.`;
      }

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
      const maxLimit = typeof maxPrice === 'number' ? maxPrice : undefined;
      finalSelection = PRODUCTS.filter((p) => (maxLimit ? p.price <= maxLimit : true)).slice(0, 4);
    }

    const priceText = typeof maxPrice === 'number' ? ` within your **₹${maxPrice.toLocaleString('en-IN')}** budget` : '';
    const budgetFollowup = typeof maxPrice === 'number' ? maxPrice.toLocaleString('en-IN') : '8,000';

    let intro = `VELA has selected these signature VÉLORA pieces for your consideration`;
    if (occasion) intro += ` designed for your **${occasion}**`;
    intro += `${priceText}.`;

    return {
      content: `${intro} Each garment embodies master craftsmanship, pure silk/cashmere weaves, and timeless elegance.`,
      suggestedFollowups: [
        `Show options under ₹${budgetFollowup}`,
        `Would these work for an evening gala?`,
        `How do I choose the correct size?`
      ],
      recommendedProducts: finalSelection,
      toolActionExecuted: 'searchProducts',
    };
  }
}
