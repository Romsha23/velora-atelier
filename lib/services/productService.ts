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
      const stopWords = ['under', 'below', 'less', 'than', 'budget', 'for', 'show', 'me', 'find', 'need', 'want', 'something', 'with', 'and', 'look', 'outfit', 'a', 'an', 'the', 'velora', 'vela'];
      const searchTerms = q
        .split(/\s+/)
        .filter((w) => !stopWords.includes(w) && !/^\d+$/.test(w))
        .join(' ');

      if (searchTerms.length > 0) {
        const matches = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerms) ||
            p.description.toLowerCase().includes(searchTerms) ||
            p.tags.some((t) => t.toLowerCase().includes(searchTerms)) ||
            p.subcategory.toLowerCase().includes(searchTerms) ||
            p.materials.toLowerCase().includes(searchTerms) ||
            p.style.some((s) => s.toLowerCase().includes(searchTerms))
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
   * AI Outfit Builder: Assembles a harmonized multi-piece outfit matching gender, occasion, and max budget limit
   */
  static async buildOutfit(
    gender?: string,
    occasion?: string,
    maxBudget?: number
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

    // Sort items to match budget intent:
    // High budget -> Sort descending by price to pick premier luxury pieces
    // Strict budget -> Sort descending within affordable limit
    pool.sort((a, b) => (isHighBudget ? b.price - a.price : a.price - b.price));

    const outfitItems: Product[] = [];
    let currentCost = 0;

    // 1. Pick Primary Garment (Outerwear, Dress, Suit, Blazer)
    const garments = pool.filter(
      (p) => p.category === 'Women' || p.category === 'Men'
    );
    const garment1 = garments.find((p) => p.price <= maxLimit - currentCost) || garments[0];

    if (garment1) {
      outfitItems.push(garment1);
      currentCost += garment1.price;
    }

    // 2. Pick Secondary Garment (Trousers, Skirt, Sweater) if budget allows & category differs
    const secondaryGarments = pool.filter(
      (p) =>
        (p.category === 'Women' || p.category === 'Men') &&
        p.id !== garment1?.id &&
        p.subcategory !== garment1?.subcategory &&
        p.price <= maxLimit - currentCost
    );

    const garment2 = secondaryGarments.find((p) => p.price <= maxLimit - currentCost);
    if (garment2 && outfitItems.length < 3) {
      outfitItems.push(garment2);
      currentCost += garment2.price;
    }

    // 3. Pick Luxury Accessory (Leather Tote, Sunglasses, Jewelry, Silk Scarf)
    const accessories = pool.filter(
      (p) => p.category === 'Accessories' && p.price <= maxLimit - currentCost
    );
    const sortedAccessories = [...accessories].sort((a, b) => (isHighBudget ? b.price - a.price : a.price - b.price));
    const accessory = sortedAccessories[0];

    if (accessory && !outfitItems.some((i) => i.id === accessory.id)) {
      outfitItems.push(accessory);
      currentCost += accessory.price;
    }

    // 4. Pick Artisan Footwear (Heels, Loafers, Boots)
    const footwears = pool.filter(
      (p) => p.category === 'Footwear' && p.price <= maxLimit - currentCost
    );
    const sortedFootwear = [...footwears].sort((a, b) => (isHighBudget ? b.price - a.price : a.price - b.price));
    const footwear = sortedFootwear[0];

    if (footwear && !outfitItems.some((i) => i.id === footwear.id)) {
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
