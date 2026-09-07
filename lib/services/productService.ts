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
      // Remove generic stop words to get clean search terms
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
   * AI Outfit Builder: Assembles a harmonized, multi-piece outfit matching gender, occasion, and max budget limit
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

    const maxLimit = maxBudget && maxBudget > 0 ? maxBudget : 15000;

    // Filter items that individually do not exceed budget
    let availableItems = pool.filter((p) => p.price <= maxLimit);

    // Pick 1 Main Apparel Garment (Shirt/Blazer/Dress/Trousers)
    let garments = availableItems.filter(
      (p) => p.category === 'Women' || p.category === 'Men'
    );
    let garment = garments.find((p) => p.price <= maxLimit * 0.7) || garments[0] || pool[0];

    let currentCost = garment ? garment.price : 0;
    let remainingBudget = maxLimit - currentCost;

    // Pick 1 Accessory / Jewelry / Bag
    let accessories = PRODUCTS.filter(
      (p) => p.category === 'Accessories' && p.price <= remainingBudget
    );
    let accessory = accessories[0];
    if (accessory) currentCost += accessory.price;

    // Pick 1 Footwear item if remaining budget allows
    remainingBudget = maxLimit - currentCost;
    let footwears = PRODUCTS.filter(
      (p) => p.category === 'Footwear' && p.price <= remainingBudget
    );
    let footwear = footwears[0];

    const outfitItems = [garment, accessory, footwear].filter(Boolean) as Product[];
    const totalOutfitCost = outfitItems.reduce((sum, item) => sum + item.price, 0);

    return {
      items: outfitItems,
      totalOutfitCost,
    };
  }
}
