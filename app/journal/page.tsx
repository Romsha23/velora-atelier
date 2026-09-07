'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';

export default function JournalPage() {
  const { addToCart } = useCart();

  const articles = [
    {
      id: 'art-1',
      title: 'The Art of Silk Styling for Autumn Galas',
      subtitle: 'How liquid Mulberry silk and hand-poured gold jewelry transform evening reception looks.',
      category: 'Haute Couture Edit',
      date: 'September 2026',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
      featuredProductId: 'prod-1',
    },
    {
      id: 'art-2',
      title: 'Building a Minimalist Capsule Wardrobe',
      subtitle: 'Mastering Italian linen blazers and high-waisted pleated trousers for modern elegance.',
      category: 'Style Manifesto',
      date: 'August 2026',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
      featuredProductId: 'prod-2',
    },
    {
      id: 'art-3',
      title: 'The Italian Craftsmanship Behind Fine Tuscan Leather',
      subtitle: 'Inside the historic Florentine workshops shaping hand-stitched saddle bags and loafers.',
      category: 'Artisan Heritage',
      date: 'July 2026',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
      featuredProductId: 'prod-4',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-3 pb-6 border-b border-[#1C1C26]">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">
          Editorial Journal & Lookbook
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-white font-light">
          THE STYLE EDIT
        </h1>
        <p className="text-xs sm:text-sm text-white/60 max-w-xl mx-auto font-light">
          Inspirations from Milan, Paris, and Mumbai. Explore runway trends and shop the looks directly.
        </p>
      </div>

      {/* Main Articles Grid */}
      <div className="space-y-16">
        {articles.map((article, idx) => {
          const featuredProduct = PRODUCTS.find((p) => p.id === article.featuredProductId);

          return (
            <div
              key={article.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Article Image */}
              <div className="lg:col-span-7 relative aspect-[16/10] bg-[#14141E] rounded-2xl overflow-hidden border border-[#222230] group">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Article Copy & Shop the Look */}
              <div className="lg:col-span-5 space-y-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                  {article.category} • {article.date}
                </div>

                <h2 className="font-serif text-3xl text-white font-normal leading-tight">
                  {article.title}
                </h2>

                <p className="text-xs text-white/70 leading-relaxed font-light">
                  {article.subtitle}
                </p>

                {/* Direct "Shop the Look" Product Card Widget */}
                {featuredProduct && (
                  <div className="bg-[#12121A] border border-[#262638] rounded-xl p-4 flex items-center space-x-4">
                    <div className="relative w-14 h-16 bg-[#181824] rounded overflow-hidden shrink-0">
                      <Image src={featuredProduct.images[0]} alt="" fill className="object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-semibold block">
                        Featured Runway Item
                      </span>
                      <h4 className="font-serif text-xs text-white truncate">{featuredProduct.name}</h4>
                      <p className="text-xs font-bold text-white mt-0.5">
                        ₹{featuredProduct.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(featuredProduct, featuredProduct.sizes[0] || 'M', featuredProduct.colors[0]?.name || 'Default', 1)}
                      className="bg-[#C5A059] hover:bg-[#D4AF37] text-black p-2.5 rounded-lg font-bold text-xs shrink-0 flex items-center space-x-1"
                      title="Shop the Look"
                    >
                      <ShoppingBag size={14} />
                      <span className="hidden sm:inline">Shop</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
