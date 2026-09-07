'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, GlassWater, Sun, Heart, Compass, Gem } from 'lucide-react';
import { useAIStylist } from '@/lib/ai-stylist-context';
import { PRODUCTS } from '@/lib/products-data';

export default function MoodDial() {
  const [activeMood, setActiveMood] = useState<string>('gala');
  const { openAI } = useAIStylist();

  const moods = [
    {
      id: 'gala',
      name: 'Milan Art Gala',
      tagline: 'Dramatic silhouettes, liquid silk, and heavy velvet.',
      icon: <Gem size={18} className="text-[#C5A059]" />,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
      prompt: 'I need a dramatic outfit for a Milan Art Gala under ₹15,000',
      productIds: ['prod-3', 'prod-1', 'prod-11', 'prod-10'],
    },
    {
      id: 'wedding',
      name: 'Tuscan Villa Wedding',
      tagline: 'Romantic drape dresses, tailored linen blazers, and baroque pearls.',
      icon: <Heart size={18} className="text-[#C5A059]" />,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      prompt: 'Suggest a complete outfit for a Tuscan Villa Wedding under ₹10,000',
      productIds: ['prod-1', 'prod-2', 'prod-19', 'prod-9'],
    },
    {
      id: 'resort',
      name: 'Riviera Sunset Resort',
      tagline: 'Breathable French flax linen, raffia totes, and bio-acetate eyewear.',
      icon: <Sun size={18} className="text-[#C5A059]" />,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      prompt: 'Build a resort summer outfit under ₹6,000',
      productIds: ['prod-8', 'prod-20', 'prod-12', 'prod-18'],
    },
    {
      id: 'date',
      name: 'Midnight Cocktail Date',
      tagline: 'Sleek two-piece silk co-ords, minimal leather saddles, and stiletto heels.',
      icon: <GlassWater size={18} className="text-[#C5A059]" />,
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1000&auto=format&fit=crop',
      prompt: 'Show me something minimal and romantic for a date night',
      productIds: ['prod-13', 'prod-4', 'prod-10', 'prod-6'],
    },
  ];

  const currentMood = moods.find((m) => m.id === activeMood) || moods[0];
  const matchedProducts = PRODUCTS.filter((p) => currentMood.productIds.includes(p.id));

  return (
    <div className="bg-[#0E0E14] border border-[#20202E] rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E1E2A] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold flex items-center space-x-1">
            <Compass size={13} className="mr-1" />
            <span>Interactive Curation</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
            SHOP BY MOOD & AMBIANCE
          </h2>
        </div>
        <p className="text-xs text-white/60 max-w-sm font-light">
          Select an aesthetic mood to dynamically transform the gallery and consult VELA for bespoke styling notes.
        </p>
      </div>

      {/* Mood Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {moods.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveMood(m.id)}
            className={`p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between space-y-3 ${
              activeMood === m.id
                ? 'bg-[#181824] border-[#C5A059] ring-1 ring-[#C5A059] shadow-lg scale-[1.02]'
                : 'bg-[#121218] border-[#222230] hover:border-white/40 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              {m.icon}
              {activeMood === m.id && (
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              )}
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium text-white">{m.name}</h4>
              <p className="text-[10px] text-white/40 line-clamp-1 mt-0.5">{m.tagline}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Dynamic Mood Showcase Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        {/* Mood Editorial Hero Card */}
        <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-[#262638] group">
          <Image
            src={currentMood.image}
            alt={currentMood.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
              Current Vibe
            </span>
            <h3 className="font-serif text-2xl text-white font-normal">{currentMood.name}</h3>
            <p className="text-xs text-white/80 font-light leading-relaxed">{currentMood.tagline}</p>

            <button
              onClick={() => openAI(currentMood.prompt)}
              className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all w-full shadow-xl"
            >
              <Sparkles size={14} />
              <span>Ask VELA to Style This Mood</span>
            </button>
          </div>
        </div>

        {/* Matched Mood Products */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-white/50 pb-2">
            <span>Signature VÉLORA items matching <strong>{currentMood.name}</strong></span>
            <Link href={`/shop?occasion=${encodeURIComponent(currentMood.name.split(' ')[1] || 'Wedding')}`} className="text-[#C5A059] hover:underline flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matchedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="bg-[#12121A] hover:bg-[#1A1A24] border border-[#222230] hover:border-[#C5A059]/60 p-3.5 rounded-xl flex items-center space-x-4 transition-all duration-300 group"
              >
                <div className="relative w-16 h-20 bg-[#181822] rounded-lg overflow-hidden shrink-0">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover object-top group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-medium block">
                    {p.category}
                  </span>
                  <h4 className="font-serif text-sm text-white group-hover:text-[#C5A059] transition-colors truncate">
                    {p.name}
                  </h4>
                  <p className="text-xs text-white/50 line-clamp-1 mt-0.5 font-light">
                    {p.materials}
                  </p>
                  <p className="text-xs font-bold text-white mt-1">
                    ₹{p.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
