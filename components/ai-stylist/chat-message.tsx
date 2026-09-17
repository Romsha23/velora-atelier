'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowUpRight, Sparkles } from 'lucide-react';
import { AIMessage, Product } from '@/types';
import { useCart } from '@/lib/cart-context';

interface ChatMessageProps {
  message: AIMessage;
  isTyping?: boolean;
}

export default function ChatMessage({ message, isTyping }: ChatMessageProps) {
  const { addToCart } = useCart();
  const isAssistant = message.role === 'assistant';
  const isOutfit = message.toolActionExecuted === 'buildOutfit' || Boolean(message.outfitComposition);

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0]?.name || 'Default';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleAddEntireOutfit = (products: Product[]) => {
    products.forEach((p) => {
      const defaultSize = p.sizes[0] || 'M';
      const defaultColor = p.colors[0]?.name || 'Default';
      addToCart(p, defaultSize, defaultColor, 1);
    });
  };

  return (
    <div
      className={`flex space-x-3 ${
        isAssistant ? 'justify-start' : 'justify-end'
      } mb-4`}
    >
      {/* VELA AI Avatar */}
      {isAssistant && (
        <div className="w-8 h-8 rounded-full bg-[#1A1A24] border border-[#C5A059]/40 flex items-center justify-center shrink-0 shadow text-[#C5A059] font-serif text-xs font-bold">
          V
        </div>
      )}

      <div className={`max-w-[85%] sm:max-w-[80%] ${isAssistant ? '' : 'order-1'}`}>
        {/* Message Bubble */}
        <div
          className={`p-4 rounded-2xl text-xs leading-relaxed ${
            isAssistant
              ? 'bg-[#15151E] text-white/90 border border-[#242432] rounded-tl-xs shadow-md'
              : 'bg-[#C5A059] text-black font-medium rounded-tr-xs shadow-lg'
          }`}
        >
          <div className="space-y-2 whitespace-pre-line">
            {message.content.split('\n').map((paragraph, i) => (
              <p key={i}>
                {paragraph.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={j} className={isAssistant ? 'text-[#C5A059] font-semibold' : 'font-extrabold'}>
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                })}
              </p>
            ))}
          </div>

          {isTyping && (
            <div className="flex items-center space-x-1.5 pt-2">
              <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* Recommended Products or Outfit Builder Card */}
        {message.recommendedProducts && message.recommendedProducts.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-[10px] uppercase tracking-widest text-[#C5A059] font-medium">
                <Sparkles size={11} />
                <span>
                  {isOutfit ? 'Complete Outfit Composition' : 'Recommended VÉLORA Items'}
                </span>
              </div>
              {message.recommendedProducts.length > 1 && (
                <button
                  onClick={() => handleAddEntireOutfit(message.recommendedProducts!)}
                  className="bg-[#C5A059] hover:bg-[#D4AF37] text-black text-[10px] uppercase font-bold px-2.5 py-1 rounded flex items-center space-x-1 transition-colors"
                >
                  <ShoppingBag size={11} />
                  <span>{isOutfit ? 'Add Entire Outfit' : 'Add All to Cart'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {message.recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-3 bg-[#181824] border border-[#2A2A3A] hover:border-[#C5A059]/50 p-2.5 rounded-lg transition-all group"
                >
                  <div className="relative w-14 h-16 bg-[#121218] rounded overflow-hidden shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] uppercase tracking-widest text-white/40">
                      {product.category} • ₹{product.price.toLocaleString('en-IN')}
                    </div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="block font-serif text-xs text-white group-hover:text-[#C5A059] transition-colors truncate"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[10px] text-white/60 line-clamp-1 mt-0.5">
                      {product.materials}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-1 shrink-0">
                    <Link
                      href={`/product/${product.slug}`}
                      className="bg-[#242434] hover:bg-[#303044] text-white p-1.5 rounded text-[10px] flex items-center justify-center transition-colors"
                      title="View Details"
                    >
                      <ArrowUpRight size={13} />
                    </Link>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="bg-[#C5A059] hover:bg-[#D4AF37] text-black p-1.5 rounded text-[10px] font-bold flex items-center justify-center transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingBag size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className={`text-[9px] text-white/30 mt-1 px-1 ${
            isAssistant ? 'text-left' : 'text-right'
          }`}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}
