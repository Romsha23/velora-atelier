'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/lib/products-data';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(matches);
  }, [query]);

  if (!isOpen) return null;

  const popularTags = [
    'Silk Wrap Dress',
    'Linen Blazer',
    'Gold Earrings',
    'Velvet Gown',
    'Cashmere Turtleneck',
    'Under ₹5000',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-start justify-center pt-16 px-4 pb-20">
        <div className="relative w-full max-w-3xl bg-[#121218] border border-[#262634] rounded-lg shadow-2xl overflow-hidden p-6 sm:p-8">
          {/* Header Input */}
          <div className="flex items-center space-x-3 border-b border-[#2A2A3A] pb-4">
            <Search size={22} className="text-[#C5A059]" />
            <input
              type="text"
              autoFocus
              placeholder="Search by product, category, material (e.g. Silk, Linen, Wedding)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-white text-lg font-serif placeholder-white/40 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Popular Search Suggestions */}
          {query.trim() === '' && (
            <div className="py-6 space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                Trending Atelier Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="bg-[#1C1C26] hover:bg-[#282838] text-white/80 hover:text-[#C5A059] border border-[#2A2A38] text-xs px-3.5 py-1.5 rounded-full transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Grid */}
          {results.length > 0 && (
            <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <p className="text-xs text-white/50 uppercase tracking-widest">
                Found {results.length} matched pieces
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center space-x-4 bg-[#181822] hover:bg-[#20202E] border border-[#222230] hover:border-[#C5A059]/50 p-3 rounded transition-colors group"
                  >
                    <div className="relative w-14 h-16 bg-[#12121A] rounded overflow-hidden shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm text-white group-hover:text-[#C5A059] transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-white/40 uppercase tracking-wider">
                        {product.category} • {product.subcategory}
                      </p>
                      <p className="text-xs font-semibold text-[#C5A059] mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Empty Search State */}
          {query.trim() !== '' && results.length === 0 && (
            <div className="py-12 text-center space-y-3">
              <p className="text-white/60 text-sm">
                No catalog items found matching "{query}"
              </p>
              <p className="text-xs text-[#C5A059]">
                Try searching for materials like "Silk", "Linen", or "Cashmere"
              </p>
            </div>
          )}

          {/* Bottom AI Hint */}
          <div className="border-t border-[#222230] pt-4 mt-2 flex items-center justify-between text-xs text-white/50">
            <span className="flex items-center space-x-1.5">
              <Sparkles size={14} className="text-[#C5A059]" />
              <span>Looking for styled advice? Use our AI Personal Shopper.</span>
            </span>
            <Link
              href="/shop"
              onClick={onClose}
              className="text-[#C5A059] hover:underline flex items-center space-x-1"
            >
              <span>Explore All Shop</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
