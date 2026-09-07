import { PRODUCTS } from './products-data';
import { Product } from '@/types';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AIResponse {
  content: string;
  recommendedProducts: Product[];
  suggestedFollowups: string[];
  toolActionExecuted?: string;
}

// Structured catalog helper methods used by both Gemini tool handler and Fallback Engine
export function searchCatalog({
  query,
  category,
  maxPrice,
  minPrice,
  occasion,
  style,
  color,
}: {
  query?: string;
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  occasion?: string;
  style?: string;
  color?: string;
}): Product[] {
  return PRODUCTS.filter((product) => {
    // Category match
    if (category && category !== 'All' && product.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // Price match
    if (maxPrice && product.price > maxPrice) return false;
    if (minPrice && product.price < minPrice) return false;

    // Occasion match
    if (occasion) {
      const occLower = occasion.toLowerCase();
      const hasOccasion = product.occasion.some((o) => o.toLowerCase().includes(occLower));
      if (!hasOccasion) return false;
    }

    // Style match
    if (style) {
      const styleLower = style.toLowerCase();
      const hasStyle = product.style.some((s) => s.toLowerCase().includes(styleLower));
      if (!hasStyle) return false;
    }

    // Color match
    if (color) {
      const colLower = color.toLowerCase();
      const hasColor = product.colors.some((c) => c.name.toLowerCase().includes(colLower));
      if (!hasColor) return false;
    }

    // Text Search Query match
    if (query && query.trim() !== '') {
      const q = query.toLowerCase();
      const matches =
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.tags.some((t) => t.toLowerCase().includes(q)) ||
        product.subcategory.toLowerCase().includes(q) ||
        product.materials.toLowerCase().includes(q);
      if (!matches) return false;
    }

    return true;
  });
}

// Fallback Natural Language Parser when API Key is absent or during fast mode
function fallbackProcessQuery(userQuery: string): AIResponse {
  const query = userQuery.toLowerCase();

  // Extract Price Limit
  let maxPrice: number | undefined;
  const priceMatch = query.match(/(?:under|below|less than|within|budget of?|max)\s*₹?\s*(\d+)/i) ||
                     query.match(/₹?\s*(\d+)\s*(?:budget|max|or less)/i);
  if (priceMatch && priceMatch[1]) {
    maxPrice = parseInt(priceMatch[1], 10);
  }

  // Extract Occasion
  let occasion: string | undefined;
  if (query.includes('wedding') || query.includes('reception') || query.includes('marriage')) occasion = 'Wedding';
  else if (query.includes('date') || query.includes('romantic') || query.includes('dinner')) occasion = 'Date Night';
  else if (query.includes('resort') || query.includes('vacation') || query.includes('beach') || query.includes('summer')) occasion = 'Resort / Vacation';
  else if (query.includes('gala') || query.includes('formal') || query.includes('red carpet')) occasion = 'Formal / Gala';
  else if (query.includes('work') || query.includes('office') || query.includes('meeting')) occasion = 'Workwear';
  else if (query.includes('party') || query.includes('cocktail')) occasion = 'Wedding'; // party maps to high-end evening/wedding category

  // Extract Category / Type
  let category: string | undefined;
  if (query.includes('dress') || query.includes('gown') || query.includes('skirt') || query.includes('camisole')) category = 'Women';
  else if (query.includes('blazer') || query.includes('suit') || query.includes('shirt') || query.includes('men')) category = 'Men';
  else if (query.includes('bag') || query.includes('tote') || query.includes('earring') || query.includes('jewelry') || query.includes('scarf') || query.includes('sunglasses')) category = 'Accessories';
  else if (query.includes('heel') || query.includes('shoe') || query.includes('loafer') || query.includes('boot')) category = 'Footwear';

  // Extract Style
  let style: string | undefined;
  if (query.includes('minimal') || query.includes('clean') || query.includes('sleek')) style = 'Minimal';
  else if (query.includes('glam') || query.includes('sparkle') || query.includes('fancy')) style = 'Glam';
  else if (query.includes('boho') || query.includes('lace') || query.includes('relaxed')) style = 'Boho';

  // Perform Catalog Search
  let matches = searchCatalog({
    query: category ? undefined : query.replace(/(under|below|₹|\d+|need|want|show|me|for|a|an|the|something)/gi, '').trim(),
    category,
    maxPrice,
    occasion,
    style,
  });

  // Gifting Intent
  if (query.includes('gift') || query.includes('sister') || query.includes('friend') || query.includes('present')) {
    matches = PRODUCTS.filter((p) => p.category === 'Accessories' || p.tags.includes('gift'));
    if (maxPrice) matches = matches.filter((p) => p.price <= maxPrice);

    return {
      content: `I've curated a selection of exquisite signature gifts from our Atelier. Each item arrives in our luxury keepsake packaging with optional personalized calligraphy notes.`,
      recommendedProducts: matches.slice(0, 4),
      suggestedFollowups: [
        'Do you need help with gift wrap?',
        'Show me gifts under ₹5,000',
        'What are your best-selling accessories?'
      ],
      toolActionExecuted: 'curateGiftSelection'
    };
  }

  // Outfit Building Intent
  if (query.includes('outfit') || query.includes('combine') || query.includes('go with') || query.includes('complete look')) {
    let topOrDress = PRODUCTS.find((p) => p.category === 'Women' && (maxPrice ? p.price <= maxPrice * 0.6 : true));
    let accessory = PRODUCTS.find((p) => p.category === 'Accessories' && p.price <= (maxPrice ? maxPrice * 0.4 : 5000));
    let footwear = PRODUCTS.find((p) => p.category === 'Footwear');

    const outfitItems = [topOrDress, accessory, footwear].filter(Boolean) as Product[];

    return {
      content: `I've styled a complete luxury ensemble for you. The silken textures and refined accessories harmonize beautifully for an effortless editorial silhouette.`,
      recommendedProducts: outfitItems,
      suggestedFollowups: [
        'Can you adjust the budget?',
        'Show me alternative heels',
        'What outerwear pairs with this?'
      ],
      toolActionExecuted: 'buildCompleteOutfit'
    };
  }

  // Trending Intent
  if (query.includes('trending') || query.includes('popular') || query.includes('bestseller') || query.includes('new')) {
    const trending = PRODUCTS.filter((p) => p.isTrending || p.isFeatured || p.isNew);
    return {
      content: `Here are our most coveted runway and editorial pieces currently defining the ÉLAN silhouette this season.`,
      recommendedProducts: trending.slice(0, 4),
      suggestedFollowups: [
        'Filter these by price under ₹8,000',
        'Show me evening gowns only',
        'What accessories match these?'
      ],
      toolActionExecuted: 'getTrendingCollection'
    };
  }

  // Fallback to general matched products
  if (matches.length === 0) {
    // Return top featured if strict filter returned 0
    matches = PRODUCTS.filter((p) => maxPrice ? p.price <= maxPrice : true).slice(0, 3);
  }

  let introText = `I have selected these exquisite pieces from our Atelier collection`;
  if (occasion) introText += ` designed specifically for your **${occasion}**`;
  if (maxPrice) introText += ` within your **₹${maxPrice.toLocaleString('en-IN')}** budget`;
  introText += `.`;

  return {
    content: `${introText} Each piece reflects our commitment to master craftsmanship, pure fabrics, and timeless design.`,
    recommendedProducts: matches.slice(0, 4),
    suggestedFollowups: [
      `Show more options under ₹${maxPrice || 8000}`,
      `Would these work for an evening reception?`,
      `How do I choose the correct size?`
    ],
    toolActionExecuted: 'searchCatalog'
  };
}

// Main AI Assistant Entry Point
export async function generateAIResponse(userMessage: string, history: { role: string; content: string }[] = []): Promise<AIResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    // Use high-fidelity intelligent natural language fallback parser
    return fallbackProcessQuery(userMessage);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `You are ÉLAN Stylist, an ultra-exclusive personal shopper and luxury fashion consultant at ÉLAN ATELIER, a high-end fashion house.
Your tone is refined, articulate, warm, and stylish—like a senior stylist at a Paris or Milan atelier.
Always suggest real products from our catalog. You must understand intent, budget in INR (₹), occasion, and style preferences.
When giving product suggestions, explain WHY the items complement the client's physique, occasion, or budget.`
    });

    const prompt = `Client request: "${userMessage}".
Available products catalog summary:
${PRODUCTS.map((p) => `- ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Price: ₹${p.price}, Occasions: ${p.occasion.join(', ')}, Style: ${p.style.join(', ')}, Colors: ${p.colors.map(c => c.name).join(', ')}, Description: ${p.description}`).join('\n')}

Analyze the client's request, recommend 1 to 4 appropriate product IDs from the catalog above, and craft a stylish response.
Your response MUST be formatted strictly as JSON with this schema:
{
  "content": "Your elegant advice to the client...",
  "recommendedProductIds": ["prod-1", "prod-4"],
  "suggestedFollowups": ["Followup question 1", "Followup question 2"]
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Clean JSON markdown if wrapped in ```json ... ```
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanText);

    const recommendedProducts = PRODUCTS.filter((p) =>
      parsed.recommendedProductIds?.includes(p.id)
    );

    return {
      content: parsed.content || 'I have curated these signature pieces for your consideration.',
      recommendedProducts: recommendedProducts.length > 0 ? recommendedProducts : PRODUCTS.slice(0, 3),
      suggestedFollowups: parsed.suggestedFollowups || ['Tell me more about the fabric', 'Show me matching accessories'],
      toolActionExecuted: 'geminiLLM'
    };
  } catch (error) {
    console.error('Gemini API call failed, using fallback engine:', error);
    return fallbackProcessQuery(userMessage);
  }
}
