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
 * Parses lakhs, lacs, lakh, lac, crores, cr, thousand, thousands, k, word numbers, commas, and rupees
 */
function extractPriceBudget(query: string): number | undefined {
  const q = query.toLowerCase();

  const wordNumbers: Record<string, number> = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    'fifteen': 15, 'twenty': 20, 'twenty five': 25, 'thirty': 30,
    'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70,
    'eighty': 80, 'ninety': 90, 'hundred': 100, 'one hundred': 100,
  };

  // 1. Check word numbers + thousand / lakh (e.g. "fifty thousand", "twenty lakhs")
  for (const [word, num] of Object.entries(wordNumbers)) {
    if (q.includes(`${word} thousand`) || q.includes(`${word} thousands`)) {
      return num * 1000;
    }
    if (q.includes(`${word} lakh`) || q.includes(`${word} lakhs`) || q.includes(`${word} lac`) || q.includes(`${word} lacs`)) {
      return num * 100000;
    }
  }

  // 2. Lakhs / Lacs / Lakh / Lac (e.g. "ruppess 10lacs", "10 lacs", "10 lakhs", "1 lakh", "2.5 lacs")
  const lakhMatch =
    q.match(/(\d+(?:\.\d+)?)\s*(?:lacs|lakhs|lakh|lac|l)\b/i) ||
    q.match(/ruppess?\s*(\d+(?:\.\d+)?)\s*(?:lacs|lakhs|lakh|lac)\b/i) ||
    q.match(/(?:worth|budget of?|price|under|below|for)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(?:lacs|lakhs|lakh|lac)\b/i);

  if (lakhMatch && lakhMatch[1]) {
    const num = parseFloat(lakhMatch[1]);
    if (!isNaN(num)) return Math.round(num * 100000);
  }

  // 3. Crores / Cr (e.g. "1 crore", "2.5 cr")
  const croreMatch = q.match(/(\d+(?:\.\d+)?)\s*(?:crores?|cr)\b/i);
  if (croreMatch && croreMatch[1]) {
    const num = parseFloat(croreMatch[1]);
    if (!isNaN(num)) return Math.round(num * 10000000);
  }

  // 4. Thousands / K (e.g. "50 thousand", "50k", "7.5k", "100 thousand")
  const thousandMatch =
    q.match(/(\d+(?:\.\d+)?)\s*(?:thousand|thousands|k)\b/i) ||
    q.match(/ruppess?\s*(\d+(?:\.\d+)?)\s*(?:thousand|thousands|k)\b/i) ||
    q.match(/(?:worth|budget of?|price|under|below|for)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(?:thousand|thousands|k)\b/i);

  if (thousandMatch && thousandMatch[1]) {
    const num = parseFloat(thousandMatch[1]);
    if (!isNaN(num)) return Math.round(num * 1000);
  }

  // 5. Standard numbers with commas or rupees (e.g. "₹5,000", "10,000", "50000", "rs 8000")
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
Important Rules:
1. If the client asks for a specific single item (e.g. "heel", "heels", "saree", "dress", "bag", "blazer", "necklace"), set "isOutfitRequest": false and recommend products matching that item.
2. Only set "isOutfitRequest": true if the client explicitly asks for an "outfit", "ensemble", "complete look", or "full look".
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

      let gender: string | undefined;
      const qLower = message.toLowerCase();
      const femaleKeywords = ['women', 'woman', 'female', 'dress', 'gown', 'skirt', 'saree', 'sari', 'lehenga', 'anarkali', 'kurti', 'blouse', 'heels', 'her', 'sister', 'girl'];
      const maleKeywords = ['men', 'man', 'male', 'sherwani', 'tuxedo', 'suit', 'blazer', 'him', 'boy'];

      if (femaleKeywords.some((k) => qLower.includes(k))) {
        gender = 'Women';
      } else if (maleKeywords.some((k) => qLower.includes(k))) {
        gender = 'Men';
      }

      const isSpecificItemQuery =
        qLower.includes('heel') || qLower.includes('heels') || qLower.includes('stiletto') ||
        qLower.includes('saree') || qLower.includes('sari') || qLower.includes('lehenga') ||
        qLower.includes('gown') || qLower.includes('dress') || qLower.includes('blazer') ||
        qLower.includes('suit') || qLower.includes('sherwani') || qLower.includes('bag') ||
        qLower.includes('tote') || qLower.includes('handbag') || qLower.includes('jewelry') ||
        qLower.includes('earring') || qLower.includes('necklace') || qLower.includes('shirt') ||
        qLower.includes('trouser') || qLower.includes('pants') || qLower.includes('skirt') ||
        qLower.includes('shoe') || qLower.includes('boots') || qLower.includes('loafer');

      const isExplicitOutfitRequest =
        qLower.includes('outfit') || qLower.includes('ensemble') || qLower.includes('complete look') || qLower.includes('full look') || qLower.includes('head to toe');

      const shouldBuildOutfit = isExplicitOutfitRequest || (parsed.isOutfitRequest && !isSpecificItemQuery);

      if (shouldBuildOutfit) {
        const outfit = await ProductService.buildOutfit(gender, undefined, maxPrice, message);
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

    // 1. Extract Price Budget (lacs, lakhs, cr, thousand, k, rupees, ₹)
    const maxPrice: number | undefined = extractPriceBudget(userQuery);

    // 2. Extract Gender
    let gender: string | undefined;
    const femaleKeywords = ['women', 'woman', 'female', 'dress', 'gown', 'skirt', 'saree', 'sari', 'lehenga', 'anarkali', 'kurti', 'blouse', 'heels', 'her', 'sister', 'girl'];
    const maleKeywords = ['men', 'man', 'male', 'sherwani', 'tuxedo', 'suit', 'blazer', 'him', 'boy'];

    if (femaleKeywords.some((k) => query.includes(k))) {
      gender = 'Women';
    } else if (maleKeywords.some((k) => query.includes(k))) {
      gender = 'Men';
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
    else if (query.includes('glam') || query.includes('fancy') || query.includes('expensive') || query.includes('luxury') || query.includes('ethnic') || query.includes('royal')) style = 'Glam';
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

    // 7. Explicit Outfit / Ensemble Intent
    const isSpecificItemQuery =
      query.includes('heel') || query.includes('heels') || query.includes('stiletto') ||
      query.includes('saree') || query.includes('sari') || query.includes('lehenga') ||
      query.includes('gown') || query.includes('dress') || query.includes('blazer') ||
      query.includes('suit') || query.includes('sherwani') || query.includes('bag') ||
      query.includes('tote') || query.includes('handbag') || query.includes('jewelry') ||
      query.includes('earring') || query.includes('necklace') || query.includes('shirt') ||
      query.includes('trouser') || query.includes('pants') || query.includes('skirt') ||
      query.includes('shoe') || query.includes('boots') || query.includes('loafer');

    const isExplicitOutfitRequest =
      query.includes('outfit') || query.includes('ensemble') || query.includes('complete look') || query.includes('full look') || query.includes('head to toe');

    if (isExplicitOutfitRequest || (!isSpecificItemQuery && (query.includes('design') || query.includes('build') || query.includes('style me') || query.includes('combine')))) {
      const outfit = await ProductService.buildOutfit(gender, occasion, maxPrice, query);

      let outfitDesc = `VELA has curated an `;
      if (typeof maxPrice === 'number' && maxPrice >= 100000) {
        outfitDesc += `ultra-exclusive Haute Couture VÉLORA ensemble for your **₹${maxPrice.toLocaleString('en-IN')}** budget, bringing together our most prestigious Mulberry silk, zardosi handloom, Mongolian cashmere, and artisan leather creations.`;
      } else {
        outfitDesc += `exclusive VÉLORA ensemble for you`;
        if (occasion) outfitDesc += ` designed for your **${occasion}**`;
        if (typeof maxPrice === 'number') outfitDesc += ` within your **₹${maxPrice.toLocaleString('en-IN')}** budget`;
        outfitDesc += `.`;
      }

      outfitDesc += ` The combined ensemble comes to **₹${outfit.totalOutfitCost.toLocaleString('en-IN')}**.`;

      return {
        content: outfitDesc,
        recommendedProducts: outfit.items,
        suggestedFollowups: [
          'Can you adjust the budget?',
          'Show me alternative heels',
          'What accessories pair with this?'
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

    // 9. Specific Category / Multi-faceted Catalog Search
    let targetCategory: string | undefined;
    if (query.includes('dress') || query.includes('saree') || query.includes('sari') || query.includes('lehenga') || query.includes('gown') || query.includes('skirt')) targetCategory = 'Women';
    else if (query.includes('blazer') || query.includes('suit') || query.includes('sherwani') || query.includes('tuxedo')) targetCategory = 'Men';
    else if (query.includes('bag') || query.includes('tote') || query.includes('jewelry') || query.includes('earring') || query.includes('necklace') || query.includes('scarf') || query.includes('sunglasses')) targetCategory = 'Accessories';
    else if (query.includes('shoe') || query.includes('heel') || query.includes('heels') || query.includes('stiletto') || query.includes('loafer') || query.includes('boot') || query.includes('boots')) targetCategory = 'Footwear';

    const isHighBudget = typeof maxPrice === 'number' && maxPrice >= 30000;

    const { products: matches } = await ProductService.searchProducts({
      category: targetCategory,
      gender,
      maxPrice,
      occasion,
      style,
      searchQuery: query,
      sortBy: isHighBudget ? 'price-desc' : 'featured'
    });

    let finalSelection = matches.length > 0 ? matches.slice(0, 4) : [];
    if (finalSelection.length === 0) {
      const maxLimit = typeof maxPrice === 'number' ? maxPrice : undefined;
      finalSelection = PRODUCTS.filter((p) => (maxLimit ? p.price <= maxLimit : true)).slice(0, 4);
    }

    const priceText = typeof maxPrice === 'number' ? ` within your **₹${maxPrice.toLocaleString('en-IN')}** budget` : '';
    const budgetFollowup = typeof maxPrice === 'number' ? maxPrice.toLocaleString('en-IN') : '8,000';

    let itemTypeLabel = 'signature VÉLORA creations';
    if (query.includes('heel') || query.includes('heels') || query.includes('stiletto')) itemTypeLabel = 'handcrafted luxury heels & stilettos';
    else if (query.includes('saree') || query.includes('sari')) itemTypeLabel = 'Haute Couture silk sarees';
    else if (query.includes('lehenga')) itemTypeLabel = 'royal Banarasi silk lehengas';
    else if (query.includes('dress') || query.includes('gown')) itemTypeLabel = 'silk evening gowns & dresses';
    else if (query.includes('bag') || query.includes('tote')) itemTypeLabel = 'Tuscan leather handbags & totes';
    else if (query.includes('blazer') || query.includes('suit')) itemTypeLabel = 'Italian linen & wool tailoring';

    let intro = `VELA has selected our finest **${itemTypeLabel}** for your consideration`;
    if (occasion) intro += ` designed for your **${occasion}**`;
    intro += `${priceText}.`;

    return {
      content: `${intro} Each creation embodies master Italian & Indian artisan craftsmanship, pure Mulberry silk, and timeless luxury.`,
      suggestedFollowups: [
        `Show options under ₹${budgetFollowup}`,
        `What accessories pair with these?`,
        `How do I choose the correct size?`
      ],
      recommendedProducts: finalSelection,
      toolActionExecuted: 'searchProducts',
    };
  }
}
