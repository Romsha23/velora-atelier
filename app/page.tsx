'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Compass, Gem, Award, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '@/lib/products-data';
import ProductCard from '@/components/product-card';
import MoodDial from '@/components/mood-dial';
import { useAIStylist } from '@/lib/ai-stylist-context';

export default function HomePage() {
  const { openAI } = useAIStylist();
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#1C1C24]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
          alt="VÉLORA Haute Couture Collection"
          fill
          priority
          className="object-cover object-center scale-105 animate-pulse-subtle"
        />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#121218]/90 border border-[#C5A059]/40 px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] backdrop-blur-md">
            <Sparkles size={13} />
            <span>Autumn / Winter Haute Couture 2026</span>
          </div>

          <h1 className="font-serif text-6xl sm:text-8xl lg:text-9xl text-white font-light tracking-wider leading-tight">
            VÉLORA
          </h1>

          <p className="font-serif text-xl sm:text-3xl italic font-extralight text-[#C5A059] tracking-wide">
            "Curated for your style."
          </p>

          <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            Bespoke Mulberry silk, Italian linen, and fine tailoring. Consult VELA, your intelligent personal stylist, for custom recommendations.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Explore Collection</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/runway"
              className="w-full sm:w-auto bg-[#14141C]/90 hover:bg-[#1E1E28] text-white border border-[#C5A059]/60 font-medium text-xs uppercase tracking-[0.2em] px-8 py-4 rounded transition-all duration-300 backdrop-blur-md flex items-center justify-center space-x-2"
            >
              <SlidersHorizontal size={15} className="text-[#C5A059]" />
              <span>Runway Studio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INFINITE RUNWAY MARQUEE BAR */}
      <div className="bg-[#0D0D12] py-3.5 border-y border-[#222230] overflow-hidden whitespace-nowrap">
        <div className="inline-flex space-x-8 animate-marquee text-[11px] font-serif uppercase tracking-[0.3em] text-[#C5A059]">
          <span>AUTUMN / WINTER HAUTE COUTURE 2026</span>
          <span>•</span>
          <span>100% PURE MULBERRY SILK & MONGOLIAN CASHMERE</span>
          <span>•</span>
          <span>INTELLIGENT PERSONAL STYLIST VELA</span>
          <span>•</span>
          <span>HAND-CRAFTED IN FLORENCE & MARCHE</span>
          <span>•</span>
          <span>COMPLIMENTARY CONCIERGE SHIPPING</span>
          <span>•</span>
          <span>AUTUMN / WINTER HAUTE COUTURE 2026</span>
        </div>
      </div>

      {/* 3. INTERACTIVE MOOD & AMBIANCE DIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MoodDial />
      </section>

      {/* 4. CATEGORY SPOTLIGHT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">
            Curated Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
            THE VÉLORA DEPARTMENTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Womenswear',
              subtitle: 'Silk Wrap Dresses & Velvet Gowns',
              image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
              href: '/shop?category=Women',
            },
            {
              title: 'Menswear Tailoring',
              subtitle: 'Italian Linen & Tropical Wool',
              image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
              href: '/shop?category=Men',
            },
            {
              title: 'Leather Accessories',
              subtitle: 'Tuscan Leather Saddles & Totes',
              image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
              href: '/shop?category=Accessories',
            },
            {
              title: 'Artisan Footwear',
              subtitle: 'Hand-burnished Italian Loafers & Heels',
              image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
              href: '/shop?category=Footwear',
            },
          ].map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-[#22222E] hover:border-[#C5A059] transition-all duration-500 shadow-xl"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                  Department
                </span>
                <h3 className="font-serif text-2xl text-white font-normal group-hover:text-[#C5A059] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/60 mt-1 font-light">{cat.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. RUNWAY STUDIO PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#181510] via-[#1A1A2A] to-[#12121A] border border-[#C5A059]/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full font-semibold">
              <SlidersHorizontal size={13} />
              <span>Digital Fitting Studio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light leading-tight">
              CREATE YOUR LOOK IN THE VÉLORA RUNWAY STUDIO
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              Mix and match garments, Tuscan leather saddlery, and artisan footwear on an interactive editorial canvas with customizable studio lighting ambiance. Ask VELA to critique your outfit or add the complete ensemble to your bag with one click.
            </p>

            <Link
              href="/runway"
              className="inline-flex items-center space-x-2 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span>Open Runway Studio</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative aspect-[4/3] w-full max-w-md rounded-2xl overflow-hidden border border-[#262638] shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop"
              alt="Runway Fitting Studio"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. FEATURED HAUTE COUTURE PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 pb-4 border-b border-[#1C1C26]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">
              Handpicked Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
              FEATURED VÉLORA PIECES
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.2em] text-[#C5A059] hover:underline flex items-center space-x-1 mt-4 sm:mt-0"
          >
            <span>View Complete Shop</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. VÉLORA BRAND VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t border-b border-[#1C1C26] text-center">
          <div className="space-y-2">
            <Gem size={24} className="text-[#C5A059] mx-auto" />
            <h4 className="font-serif text-base text-white font-normal">100% Pure Silk & Cashmere</h4>
            <p className="text-xs text-white/50">Ethically sourced Grade-A Mongolian cashmere and Mulberry silk.</p>
          </div>
          <div className="space-y-2">
            <Compass size={24} className="text-[#C5A059] mx-auto" />
            <h4 className="font-serif text-base text-white font-normal">VELA AI Personal Stylist</h4>
            <p className="text-xs text-white/50">Instant custom recommendations and outfit composition.</p>
          </div>
          <div className="space-y-2">
            <Award size={24} className="text-[#C5A059] mx-auto" />
            <h4 className="font-serif text-base text-white font-normal">Italian Artisan Heritage</h4>
            <p className="text-xs text-white/50">Hand-finished in boutique workshops in Florence and Marche.</p>
          </div>
          <div className="space-y-2">
            <ShieldCheck size={24} className="text-[#C5A059] mx-auto" />
            <h4 className="font-serif text-base text-white font-normal">Concierge Express Shipping</h4>
            <p className="text-xs text-white/50">Complimentary express shipping on all orders over ₹5,000.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
