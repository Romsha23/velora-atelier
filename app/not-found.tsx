'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md space-y-6 bg-[#12121A] border border-[#20202E] p-8 sm:p-12 rounded-2xl shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mx-auto text-[#C5A059]">
          <Compass size={32} className="animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold">
            404 — Page Uncharted
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Piece Not Found
          </h1>
          <p className="text-xs text-white/60 leading-relaxed font-light">
            The page or atelier creation you are searching for has moved or is currently unavailable in our active collection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link
            href="/shop"
            className="flex-1 bg-[#C5A059] hover:bg-[#D4AF37] text-black py-3 px-4 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg"
          >
            <ShoppingBag size={15} />
            <span>Explore Collection</span>
          </Link>

          <Link
            href="/"
            className="flex-1 bg-[#1A1A24] hover:bg-[#252534] text-white border border-[#2A2A3C] py-3 px-4 rounded-xl text-xs uppercase font-medium tracking-wider flex items-center justify-center space-x-2 transition-all"
          >
            <ArrowLeft size={15} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
