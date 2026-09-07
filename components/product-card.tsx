'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useAIStylist } from '@/lib/ai-stylist-context';

interface ProductCardProps {
  product: Product;
  onAskStylist?: (product: Product) => void;
}

export default function ProductCard({ product, onAskStylist }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openAI } = useAIStylist();

  const isLiked = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0]?.name || 'Default';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAskStylistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAskStylist) {
      onAskStylist(product);
    } else {
      openAI(`Tell me about ${product.name}. How can I style it?`);
    }
  };

  return (
    <div
      className="group relative bg-[#121216] border border-[#1E1E26] rounded overflow-hidden hover:border-[#C5A059]/40 transition-all duration-500 flex flex-col justify-between"
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setCurrentImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#18181E] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[currentImageIndex] || product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          {product.isNew && (
            <span className="bg-[#C5A059] text-black font-semibold text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-xs shadow">
              New Arrival
            </span>
          )}
          {product.isTrending && !product.isNew && (
            <span className="bg-[#0A0A0C]/80 text-[#D4AF37] border border-[#C5A059]/40 text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-xs backdrop-blur-sm">
              Trending
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            isLiked
              ? 'bg-[#C5A059] text-black scale-110'
              : 'bg-[#0A0A0C]/60 text-white/80 hover:text-white hover:bg-[#0A0A0C]'
          }`}
          title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} className={isLiked ? 'fill-black' : ''} />
        </button>

        {/* Bottom Hover Action Overlay Bar */}
        <div
          className={`absolute bottom-3 left-3 right-3 flex items-center space-x-2 transition-all duration-300 z-10 ${
            isHovered ? 'opacity-100 translateY(0)' : 'opacity-0 translateY(10px) pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-white text-black hover:bg-[#C5A059] transition-colors py-2.5 px-3 rounded text-[10px] uppercase font-bold tracking-widest flex items-center justify-center space-x-1.5 shadow-lg"
          >
            <ShoppingBag size={14} />
            <span>Quick Bag</span>
          </button>
          <button
            onClick={handleAskStylistClick}
            className="bg-[#1C1C26] hover:bg-[#282836] text-[#D4AF37] border border-[#C5A059]/30 p-2.5 rounded text-[10px] transition-colors"
            title="Ask AI Stylist about this product"
          >
            <Sparkles size={14} />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-[#121216]">
        <div>
          <div className="flex items-center justify-between text-[11px] text-white/40 uppercase tracking-widest mb-1">
            <span>{product.category} • {product.subcategory}</span>
            <div className="flex items-center text-[#D4AF37] text-[10px]">
              <Star size={11} className="fill-[#D4AF37] mr-0.5" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#C5A059] transition-colors">
            <h3 className="font-serif text-base font-normal text-white line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="pt-2 border-t border-[#1C1C22] flex items-center justify-between mt-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-sm font-semibold text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-white/40 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Color Swatch Dots */}
          <div className="flex items-center space-x-1">
            {product.colors.slice(0, 3).map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-white/20"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
