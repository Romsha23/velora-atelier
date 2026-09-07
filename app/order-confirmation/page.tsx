'use client';

import React from 'react';
import Link from 'next/link';
import { PackageCheck, ShoppingBag, ArrowRight } from 'lucide-react';

export default function OrderConfirmationIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mx-auto text-[#C5A059]">
        <PackageCheck size={32} />
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
          Order Concierge Tracking
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
          Active Orders & Track Status
        </h1>
        <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
          Please check your recent order confirmation link or complete a checkout to track your live courier dispatch status.
        </p>
      </div>

      <div className="pt-4 flex justify-center space-x-4">
        <Link
          href="/shop"
          className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-all"
        >
          <ShoppingBag size={16} />
          <span>Browse Atelier Collection</span>
        </Link>
      </div>
    </div>
  );
}
