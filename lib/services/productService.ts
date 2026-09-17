import { PRODUCTS } from '@/lib/products-data';
import { Product } from '@/types';
import { ProductFilterInput } from '@/lib/validations';

export class ProductService {
  /**
   * Search & filter products according to structured input criteria
   */
  static async searchProducts(params: ProductFilterInput & { gender?: string }): Promise<{ total: number; products: Product[] }> {
    let filtered = [...PRODUCTS];

    if (params.category && params.category !== 'All') {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === params.category!.toLowerCase()
      );
    }

    if (params.gender && params.gender !== 'All') {
      filtered = filtered.filter(
        (p) => p.gender.toLowerCase() === params.gender!.toLowerCase() || p.gender === 'Unisex'
      );
    }

    if (params.maxPrice !== undefined && params.maxPrice > 0) {
      filtered = filtered.filter((p) => p.price <= params.maxPrice!);
    }

    if (params.minPrice !== undefined && params.minPrice > 0) {
      filtered = filtered.filter((p) => p.price >= params.minPrice!);
    }

    if (params.occasion && params.occasion !== 'All') {
      const occLower = params.occasion.toLowerCase();
      filtered = filtered.filter((p) =>
        p.occasion.some((o) => o.toLowerCase().includes(occLower))
      );
    }

    if (params.style && params.style !== 'All') {
      const styleLower = params.style.toLowerCase();
      filtered = filtered.filter((p) =>
        p.style.some((s) => s.toLowerCase().includes(styleLower))
      );
    }

    if (params.color) {
      filtered = filtered.filter((p) =>
        p.colors.some((c) => c.name.toLowerCase().includes(params.color!.toLowerCase()))
      );
    }

    if (params.size) {
      filtered = filtered.filter((p) =>
        p.sizes.some((s) => s.toUpperCase() === params.size!.toUpperCase())
      );
    }

    if (params.searchQuery && params.searchQuery.trim() !== '') {
      const q = params.searchQuery.toLowerCase();
      const stopWords = [
        'under', 'below', 'less', 'than', 'budget', 'for', 'show', 'me', 'find',
        'need', 'want', 'something', 'with', 'and', 'look', 'outfit', 'a', 'an',
        'the', 'velora', 'vela', 'design', 'build', 'worth', 'create', 'give',
        'lakh', 'lakhs', 'lac', 'lacs', 'thousand', 'thousands', 'cr', 'crore',
        'crores', 'rs', 'rupees', 'ruppess', 'inr', 'price', 'max'
      ];
      const tokens = q
        .split(/\s+/)
        .filter((w) => !stopWords.includes(w) && !/^\d+$/.test(w));

      if (tokens.length > 0) {
        const matches = filtered.filter((p) =>
          tokens.some((token) =>
            p.name.toLowerCase().includes(token) ||
            p.subcategory.toLowerCase().includes(token) ||
            p.category.toLowerCase().includes(token) ||
            p.description.toLowerCase().includes(token) ||
            p.tags.some((t) => t.toLowerCase().includes(token)) ||
            p.materials.toLowerCase().includes(token)
          )
        );
        if (matches.length > 0) filtered = matches;
      }
    }

    // Sorting
    switch (params.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return {
      total: filtered.length,
      products: filtered,
    };
  }

  static async getProductBySlug(slug: string): Promise<Product | undefined> {
    return PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  }

  static async getFeaturedProducts(limit = 4): Promise<Product[]> {
    return PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
  }

  /**
   * AI Outfit Builder: Assembles a harmonized multi-piece outfit matching gender, occasion, max budget limit, and specific garment keywords
   */
  static async buildOutfit(
    gender?: string,
    occasion?: string,
    maxBudget?: number,
    searchQuery?: string
  ): Promise<{ items: Product[]; totalOutfitCost: number }> {
    let pool = [...PRODUCTS];

    if (gender && gender !== 'All') {
      const gLower = gender.toLowerCase();
      pool = pool.filter((p) => p.gender.toLowerCase() === gLower || p.gender === 'Unisex');
    }

    if (occasion) {
      const occLower = occasion.toLowerCase();
      const matched = pool.filter((p) => p.occasion.some((o) => o.toLowerCase().includes(occLower)));
      if (matched.length >= 2) pool = matched;
    }

    const isHighBudget = !maxBudget || maxBudget >= 30000;
    const maxLimit = maxBudget && maxBudget > 0 ? maxBudget : 1000000;

    // Strictly filter out items that exceed maxLimit
    pool = pool.filter((p) => p.price <= maxLimit);

    // Sort items to match budget intent
    pool.sort((a, b) => (isHighBudget ? b.price - a.price : a.price - b.price));

    const outfitItems: Product[] = [];
    let currentCost = 0;

    // Extract specific clothing keywords from query (e.g. saree, lehenga, gown, dress, sherwani, suit, blazer)
    const q = (searchQuery || '').toLowerCase();
    const garmentKeywords = ['saree', 'sari', 'lehenga', 'gown', 'dress', 'sherwani', 'suit', 'blazer', 'trench', 'cardigan', 'trousers', 'skirt', 'top'];
    const matchedKeyword = garmentKeywords.find((k) => q.includes(k));

    // 1. Pick Primary Garment (Outerwear, Dress, Saree, Lehenga, Suit, Blazer)
    const garments = pool.filter(
      (p) => p.category === 'Women' || p.category === 'Men'
    );

    let garment1: Product | undefined;
    if (matchedKeyword) {
      garment1 = garments.find(
        (p) =>
          (p.name.toLowerCase().includes(matchedKeyword) ||
           p.subcategory.toLowerCase().includes(matchedKeyword) ||
           p.tags.some((t) => t.toLowerCase().includes(matchedKeyword))) &&
          p.price <= maxLimit - currentCost
      );
    }

    if (!garment1) {
      garment1 = garments.find((p) => p.price <= maxLimit - currentCost);
    }

    if (garment1) {
      outfitItems.push(garment1);
      currentCost += garment1.price;
    }

    // 2. Pick Secondary Garment if budget permits & category differs (skip for one-piece Sarees/Lehengas/Gowns)
    const isOnePiece = garment1 && (
      garment1.subcategory.toLowerCase().includes('saree') ||
      garment1.subcategory.toLowerCase().includes('lehenga') ||
      garment1.subcategory.toLowerCase().includes('dress') ||
      garment1.name.toLowerCase().includes('saree') ||
      garment1.name.toLowerCase().includes('gown')
    );

    if (!isOnePiece) {
      const secondaryGarments = pool.filter(
        (p) =>
          (p.category === 'Women' || p.category === 'Men') &&
          p.id !== garment1?.id &&
          p.subcategory !== garment1?.subcategory &&
          p.price <= maxLimit - currentCost
      );

      const garment2 = secondaryGarments.find((p) => p.price <= maxLimit - currentCost);
      if (garment2 && outfitItems.length < 3 && currentCost + garment2.price <= maxLimit) {
        outfitItems.push(garment2);
        currentCost += garment2.price;
      }
    }

    // 3. Pick Luxury Accessory if budget permits
    const accessories = pool.filter(
      (p) => p.category === 'Accessories' && p.price <= maxLimit - currentCost
    );
    const sortedAccessories = [...accessories].sort((a, b) => (isHighBudget ? b.price - a.price : a.price - b.price));
    const accessory = sortedAccessories.find((p) => p.price <= maxLimit - currentCost);

    if (accessory && !outfitItems.some((i) => i.id === accessory.id) && currentCost + accessory.price <= maxLimit) {
      outfitItems.push(accessory);
      currentCost += accessory.price;
    }

    // 4. Pick Artisan Footwear if budget permits
    const footwears = pool.filter(
      (p) => p.category === 'Footwear' && p.price <= maxLimit - currentCost
    );
    const sortedFootwear = [...footwears].sort((a, b) => (isHighBudget ? b.price - a.price : a.price - b.price));
    const footwear = sortedFootwear.find((p) => p.price <= maxLimit - currentCost);

    if (footwear && !outfitItems.some((i) => i.id === footwear.id) && currentCost + footwear.price <= maxLimit) {
      outfitItems.push(footwear);
      currentCost += footwear.price;
    }

    const totalOutfitCost = outfitItems.reduce((sum, item) => sum + item.price, 0);

    return {
      items: outfitItems,
      totalOutfitCost,
    };
  }
}
