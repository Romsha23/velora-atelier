'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ShoppingBag, RefreshCw, Check, ArrowRight, Sun, Moon, Palette } from 'lucide-react';
import { PRODUCTS } from '@/lib/products-data';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import { useAIStylist } from '@/lib/ai-stylist-context';

export default function RunwayStudioPage() {
  const garments = PRODUCTS.filter((p) => p.category === 'Women' || p.category === 'Men');
  const accessories = PRODUCTS.filter((p) => p.category === 'Accessories');
  const footwears = PRODUCTS.filter((p) => p.category === 'Footwear');

  const [selectedGarment, setSelectedGarment] = useState<Product>(garments[0]);
  const [selectedAccessory, setSelectedAccessory] = useState<Product>(accessories[0]);
  const [selectedFootwear, setSelectedFootwear] = useState<Product>(footwears[0]);
  const [ambientLighting, setAmbientLighting] = useState<'paris' | 'milan' | 'mumbai'>('paris');

  const { addToCart } = useCart();
  const { openAI } = useAIStylist();

  const totalOutfitCost =
    selectedGarment.price + selectedAccessory.price + selectedFootwear.price;

  const handleAddFullOutfitToCart = () => {
    [selectedGarment, selectedAccessory, selectedFootwear].forEach((p) => {
      const defaultSize = p.sizes[0] || 'M';
      const defaultColor = p.colors[0]?.name || 'Default';
      addToCart(p, defaultSize, defaultColor, 1);
    });
  };

  const handleAskVELAForCritique = () => {
    openAI(
      `Please critique and style this VÉLORA ensemble: 1) ${selectedGarment.name} (₹${selectedGarment.price}), 2) ${selectedAccessory.name} (₹${selectedAccessory.price}), and 3) ${selectedFootwear.name} (₹${selectedFootwear.price}). Total budget: ₹${totalOutfitCost.toLocaleString('en-IN')}. What occasions is this look ideal for?`
    );
  };

  const lightingStyles = {
    paris: 'from-[#1A1510] via-[#0D0D12] to-[#0A0A0C] border-[#C5A059]/40',
    milan: 'from-[#101A18] via-[#0D1210] to-[#0A0C0B] border-emerald-500/40',
    mumbai: 'from-[#1E1015] via-[#120D10] to-[#0C0A0B] border-amber-500/40',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-3 pb-6 border-b border-[#1C1C26]">
        <div className="inline-flex items-center space-x-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 text-[10px] uppercase tracking-[0.25em] px-3.5 py-1 rounded-full font-semibold">
          <Sparkles size={13} />
          <span>Interactive Style Studio</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-white font-light">
          VÉLORA RUNWAY CANVAS
        </h1>
        <p className="text-xs sm:text-sm text-white/60 max-w-xl mx-auto font-light">
          Assemble garments, Tuscan leather goods, and artisan footwear on an interactive editorial canvas.
        </p>
      </div>

      {/* Main Studio Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Interactive Canvas View */}
        <div className={`lg:col-span-7 bg-gradient-to-b ${lightingStyles[ambientLighting]} border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between`}>
          {/* Lighting Controls Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs">
            <span className="text-white/60 uppercase tracking-widest text-[10px] font-medium flex items-center">
              <Palette size={13} className="mr-1.5 text-[#C5A059]" />
              <span>Studio Lighting Ambiance</span>
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAmbientLighting('paris')}
                className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-colors ${
                  ambientLighting === 'paris'
                    ? 'bg-[#C5A059] text-black'
                    : 'bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                Paris Sunset
              </button>
              <button
                onClick={() => setAmbientLighting('milan')}
                className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-colors ${
                  ambientLighting === 'milan'
                    ? 'bg-emerald-500 text-black'
                    : 'bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                Milan Runway
              </button>
              <button
                onClick={() => setAmbientLighting('mumbai')}
                className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-colors ${
                  ambientLighting === 'mumbai'
                    ? 'bg-amber-500 text-black'
                    : 'bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                Mumbai Gala
              </button>
            </div>
          </div>

          {/* 3-Slot Canvas Preview Grid */}
          <div className="grid grid-cols-3 gap-4 py-4">
            {/* Slot 1: Garment */}
            <div className="space-y-2 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                1. Garment
              </span>
              <div className="relative aspect-[3/4] bg-[#121218] rounded-xl overflow-hidden border border-white/10 shadow-xl group">
                <Image
                  src={selectedGarment.images[0]}
                  alt={selectedGarment.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-serif text-xs text-white truncate">{selectedGarment.name}</h4>
              <p className="text-[11px] font-bold text-[#C5A059]">₹{selectedGarment.price.toLocaleString('en-IN')}</p>
            </div>

            {/* Slot 2: Accessory */}
            <div className="space-y-2 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                2. Accessory
              </span>
              <div className="relative aspect-[3/4] bg-[#121218] rounded-xl overflow-hidden border border-white/10 shadow-xl group">
                <Image
                  src={selectedAccessory.images[0]}
                  alt={selectedAccessory.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-serif text-xs text-white truncate">{selectedAccessory.name}</h4>
              <p className="text-[11px] font-bold text-[#C5A059]">₹{selectedAccessory.price.toLocaleString('en-IN')}</p>
            </div>

            {/* Slot 3: Footwear */}
            <div className="space-y-2 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                3. Footwear
              </span>
              <div className="relative aspect-[3/4] bg-[#121218] rounded-xl overflow-hidden border border-white/10 shadow-xl group">
                <Image
                  src={selectedFootwear.images[0]}
                  alt={selectedFootwear.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-serif text-xs text-white truncate">{selectedFootwear.name}</h4>
              <p className="text-[11px] font-bold text-[#C5A059]">₹{selectedFootwear.price.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Canvas Total & Studio Actions */}
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-white/50 uppercase tracking-widest block">Combined Ensemble Price</span>
              <span className="font-serif text-2xl font-bold text-[#C5A059]">
                ₹{totalOutfitCost.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={handleAskVELAForCritique}
                className="flex-1 sm:flex-none bg-[#1C1C2A] hover:bg-[#252538] text-[#D4AF37] border border-[#C5A059]/40 py-3 px-4 rounded-xl text-xs uppercase font-medium tracking-wider flex items-center justify-center space-x-2 transition-colors"
              >
                <Sparkles size={14} />
                <span>Ask VELA Critique</span>
              </button>

              <button
                onClick={handleAddFullOutfitToCart}
                className="flex-1 sm:flex-none bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold py-3 px-5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-xl"
              >
                <ShoppingBag size={15} />
                <span>Add Studio Outfit to Bag</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Selector Palettes */}
        <div className="lg:col-span-5 space-y-6">
          {/* Garments Selector */}
          <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-5 space-y-3">
            <h3 className="font-serif text-sm text-white font-normal uppercase tracking-widest text-[#C5A059]">
              Select Garment
            </h3>
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
              {garments.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGarment(g)}
                  className={`relative w-16 h-20 bg-[#181824] rounded-lg overflow-hidden shrink-0 border transition-all ${
                    selectedGarment.id === g.id
                      ? 'border-[#C5A059] ring-2 ring-[#C5A059]'
                      : 'border-[#262638] opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={g.images[0]} alt="" fill className="object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Accessories Selector */}
          <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-5 space-y-3">
            <h3 className="font-serif text-sm text-white font-normal uppercase tracking-widest text-[#C5A059]">
              Select Leather / Jewelry Accessory
            </h3>
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
              {accessories.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelectedAccessory(a)}
                  className={`relative w-16 h-20 bg-[#181824] rounded-lg overflow-hidden shrink-0 border transition-all ${
                    selectedAccessory.id === a.id
                      ? 'border-[#C5A059] ring-2 ring-[#C5A059]'
                      : 'border-[#262638] opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={a.images[0]} alt="" fill className="object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Footwear Selector */}
          <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-5 space-y-3">
            <h3 className="font-serif text-sm text-white font-normal uppercase tracking-widest text-[#C5A059]">
              Select Artisan Footwear
            </h3>
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
              {footwears.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFootwear(f)}
                  className={`relative w-16 h-20 bg-[#181824] rounded-lg overflow-hidden shrink-0 border transition-all ${
                    selectedFootwear.id === f.id
                      ? 'border-[#C5A059] ring-2 ring-[#C5A059]'
                      : 'border-[#262638] opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={f.images[0]} alt="" fill className="object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
