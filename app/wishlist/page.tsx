'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import { Product } from '@/types';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: Product) => {
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0]?.name || 'Default';
    addToCart(product, defaultSize, defaultColor, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[#1C1C26] pb-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">
            Saved Atelier Favorites
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
            YOUR PRIVATE WISHLIST ({wishlist.length})
          </h1>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-16 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-[#181824] flex items-center justify-center mx-auto text-white/30">
            <Heart size={38} />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl text-white font-normal">Your Wishlist is Empty</h2>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              Save your favorite Haute Couture garments, Tuscan leather bags, and fine jewelry pieces while exploring the catalog.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-block bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs px-8 py-4 rounded-xl uppercase tracking-widest transition-colors shadow-xl"
          >
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.product.id}
              className="bg-[#121216] border border-[#1E1E26] rounded-xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative aspect-[3/4] w-full bg-[#18181E]">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover object-top"
                />
                <button
                  onClick={() => removeFromWishlist(item.product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white/80 hover:text-red-400 backdrop-blur-sm transition-colors"
                  title="Remove from Wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">
                    {item.product.category}
                  </span>
                  <h3 className="font-serif text-base text-white line-clamp-1">
                    {item.product.name}
                  </h3>
                  <p className="text-sm font-bold text-[#C5A059] mt-1">
                    ₹{item.product.price.toLocaleString('en-IN')}
                  </p>
                </div>

                <button
                  onClick={() => handleMoveToCart(item.product)}
                  className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-black py-2.5 rounded text-xs uppercase font-bold tracking-wider flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <ShoppingBag size={14} />
                  <span>Move to Atelier Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
