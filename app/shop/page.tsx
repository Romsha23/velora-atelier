'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, Search, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/lib/products-data';
import ProductCard from '@/components/product-card';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string>(searchParams.get('occasion') || 'All');
  const [selectedStyle, setSelectedStyle] = useState<string>(searchParams.get('style') || 'All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [gridCols, setGridCols] = useState<number>(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const occ = searchParams.get('occasion');
    if (occ) setSelectedOccasion(occ);
    const sty = searchParams.get('style');
    if (sty) setSelectedStyle(sty);
  }, [searchParams]);

  // Dynamic Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category
      if (selectedCategory !== 'All' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.tags.some((t) => t.toLowerCase().includes(q)) ||
          product.subcategory.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Max Price
      if (product.price > maxPrice) return false;

      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Colors
      if (selectedColors.length > 0) {
        const hasColor = product.colors.some((c) => selectedColors.includes(c.name));
        if (!hasColor) return false;
      }

      // Occasion
      if (selectedOccasion !== 'All') {
        const hasOccasion = product.occasion.some(
          (o) => o.toLowerCase() === selectedOccasion.toLowerCase()
        );
        if (!hasOccasion) return false;
      }

      // Style
      if (selectedStyle !== 'All') {
        const hasStyle = product.style.some((s) => s.toLowerCase() === selectedStyle.toLowerCase());
        if (!hasStyle) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    selectedCategory,
    searchQuery,
    maxPrice,
    selectedSizes,
    selectedColors,
    selectedOccasion,
    selectedStyle,
    sortBy,
  ]);

  const categories = ['All', 'Women', 'Men', 'Accessories', 'Footwear'];
  const occasions = ['All', 'Wedding', 'Date Night', 'Resort / Vacation', 'Formal / Gala', 'Workwear', 'Casual Chic'];
  const styles = ['All', 'Minimal', 'Editorial', 'Glam', 'Boho', 'Classic'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size', '38', '39', '40', '41', '42'];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(20000);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedOccasion('All');
    setSelectedStyle('All');
    setSortBy('featured');
    router.push('/shop');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3 pb-6 border-b border-[#1C1C26]">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">
          Haute Couture Catalog
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-white font-light">
          THE ATELIER COLLECTION
        </h1>
        <p className="text-xs sm:text-sm text-white/60 max-w-xl mx-auto font-light">
          Explore our handcrafted luxury apparel, Tuscan leather goods, and fine Italian tailoring.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs uppercase tracking-[0.2em] px-5 py-2.5 rounded-full font-medium transition-all duration-200 shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#C5A059] text-black font-semibold shadow-lg'
                : 'bg-[#14141E] text-white/80 hover:text-white border border-[#242432]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter Toolbar Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#12121A] p-4 rounded-xl border border-[#20202E]">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 bg-[#1C1C2A] hover:bg-[#252538] text-white border border-[#2A2A3E] px-4 py-2.5 rounded-lg text-xs uppercase font-medium tracking-wider transition-colors"
          >
            <SlidersHorizontal size={16} className="text-[#C5A059]" />
            <span>Filters ({selectedSizes.length + selectedColors.length + (selectedOccasion !== 'All' ? 1 : 0)})</span>
          </button>

          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#181824] border border-[#262638] text-white text-xs pl-8 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A059]"
            />
            <Search size={14} className="absolute left-2.5 top-3 text-white/40" />
          </div>
        </div>

        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-white/40 uppercase tracking-widest text-[10px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#181824] border border-[#262638] text-white text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-[#C5A059]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="hidden md:flex items-center space-x-1 border border-[#262638] rounded-lg p-1 bg-[#181824]">
            <button
              onClick={() => setGridCols(2)}
              className={`p-1.5 rounded text-xs ${gridCols === 2 ? 'bg-[#C5A059] text-black' : 'text-white/60'}`}
              title="2 Columns"
            >
              2
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded text-xs ${gridCols === 3 ? 'bg-[#C5A059] text-black' : 'text-white/60'}`}
              title="3 Columns"
            >
              3
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded text-xs ${gridCols === 4 ? 'bg-[#C5A059] text-black' : 'text-white/60'}`}
              title="4 Columns"
            >
              4
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Drawer / Sidebar */}
        <div
          className={`${
            isFilterOpen ? 'block' : 'hidden lg:block'
          } w-full lg:w-64 bg-[#12121A] border border-[#20202E] rounded-xl p-6 space-y-6 shrink-0 h-fit`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#20202E]">
            <h3 className="font-serif text-base text-white font-normal">Refine Selection</h3>
            <button
              onClick={clearAllFilters}
              className="text-[10px] uppercase text-[#C5A059] hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/80">
              <span>Max Budget:</span>
              <strong className="text-[#C5A059]">₹{maxPrice.toLocaleString('en-IN')}</strong>
            </div>
            <input
              type="range"
              min="3000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C5A059]"
            />
          </div>

          {/* Occasion Filter */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">Occasion</h4>
            <div className="space-y-1.5">
              {occasions.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`block w-full text-left text-xs px-3 py-1.5 rounded transition-colors ${
                    selectedOccasion === occ
                      ? 'bg-[#C5A059]/20 text-[#C5A059] font-semibold border border-[#C5A059]/40'
                      : 'text-white/70 hover:bg-[#1A1A26]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">Available Sizes</h4>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                    selectedSizes.includes(s)
                      ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                      : 'bg-[#181824] text-white/70 border-[#28283A] hover:border-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between text-xs text-white/50 pb-2">
            <span>Showing <strong>{filteredProducts.length}</strong> luxury items</span>
            {filteredProducts.length === 0 && (
              <span className="text-[#C5A059]">No items match this filter criteria</span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-[#12121A] border border-[#20202E] rounded-xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1C1C28] flex items-center justify-center mx-auto text-[#C5A059]">
                <Sparkles size={28} />
              </div>
              <h3 className="font-serif text-xl text-white font-normal">No Matching Pieces Found</h3>
              <p className="text-xs text-white/60 max-w-md mx-auto">
                Try widening your price limit or clearing active size and occasion filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-block bg-[#C5A059] text-black font-semibold text-xs px-6 py-3 rounded uppercase tracking-wider hover:bg-[#D4AF37] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridCols} gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-white/50">Loading Atelier Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
