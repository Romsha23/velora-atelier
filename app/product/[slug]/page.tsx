'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Check,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useAIStylist } from '@/lib/ai-stylist-context';
import ProductCard from '@/components/product-card';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug) || PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openAI } = useAIStylist();

  const isLiked = isInWishlist(product.id);

  const pairedProducts = PRODUCTS.filter((p) => product.pairsWith?.includes(p.id));
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-white/50 space-x-2 flex items-center">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-white transition-colors">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-[#C5A059] transition-colors"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-white font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Product Specs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-16 h-20 bg-[#161620] rounded overflow-hidden border transition-all ${
                  selectedImageIndex === idx
                    ? 'border-[#C5A059] ring-1 ring-[#C5A059]'
                    : 'border-[#222230] opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover object-top" />
              </button>
            ))}
          </div>

          <div className="relative flex-1 aspect-[3/4] bg-[#121218] rounded-xl overflow-hidden border border-[#20202E]">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover object-top"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-[#C5A059] text-black font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded shadow">
                New Arrival
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Specifications & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-white/50 uppercase tracking-widest mb-1">
              <span>{product.category} • {product.subcategory}</span>
              <div className="flex items-center text-[#D4AF37] font-medium">
                <Star size={13} className="fill-[#D4AF37] mr-1" />
                <span>{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline space-x-3 mt-3">
              <span className="text-2xl font-bold text-[#C5A059]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-white/40 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                In Stock (Ready to Ship)
              </span>
            </div>
          </div>

          <hr className="border-[#1E1E2A]" />

          {/* Color Selector */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70 font-medium block">
              Selected Color: <span className="text-[#C5A059] font-bold">{selectedColor}</span>
            </label>
            <div className="flex items-center space-x-3">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-transform ${
                    selectedColor === color.name
                      ? 'border-[#C5A059] scale-110'
                      : 'border-white/20 hover:border-white'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <Check size={12} className="text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="uppercase tracking-widest text-white/70 font-medium">
                Select Size: <span className="text-[#C5A059] font-bold">{selectedSize}</span>
              </label>
              <button className="text-[10px] text-white/40 hover:text-[#C5A059] underline">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-xs font-semibold rounded border transition-all ${
                    selectedSize === size
                      ? 'bg-[#C5A059] text-black border-[#C5A059]'
                      : 'bg-[#14141E] text-white/80 border-[#242432] hover:border-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/70 font-medium block">
              Quantity
            </label>
            <div className="flex items-center border border-[#282838] rounded-lg bg-[#14141E] w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-white/60 hover:text-white"
              >
                <Minus size={14} />
              </button>
              <span className="flex-1 text-center text-xs font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 text-white/60 hover:text-white"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#C5A059] hover:bg-[#D4AF37] text-black py-4 rounded-xl text-xs uppercase font-bold tracking-[0.2em] shadow-xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-[1.01]"
              >
                <ShoppingBag size={16} />
                <span>Add to Atelier Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-xl border transition-all ${
                  isLiked
                    ? 'bg-[#C5A059] text-black border-[#C5A059]'
                    : 'bg-[#14141E] text-white/80 border-[#262638] hover:border-white'
                }`}
                title={isLiked ? 'In Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={18} className={isLiked ? 'fill-black' : ''} />
              </button>
            </div>

            <button
              onClick={() =>
                openAI(`Can you help me style the ${product.name}? What occasions and accessories go best with it?`)
              }
              className="w-full bg-[#1A1A28] hover:bg-[#252538] text-[#D4AF37] border border-[#C5A059]/40 py-3 rounded-xl text-xs uppercase font-medium tracking-wider flex items-center justify-center space-x-2 transition-all"
            >
              <Sparkles size={15} />
              <span>Consult AI Stylist on how to style this piece</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#1C1C26] text-center text-[10px] text-white/60">
            <div className="space-y-1 p-2">
              <Truck size={18} className="text-[#C5A059] mx-auto" />
              <span>Complimentary Express Shipping</span>
            </div>
            <div className="space-y-1 p-2">
              <RotateCcw size={18} className="text-[#C5A059] mx-auto" />
              <span>14-Day Complimentary Returns</span>
            </div>
            <div className="space-y-1 p-2">
              <ShieldCheck size={18} className="text-[#C5A059] mx-auto" />
              <span>Certified 100% Authentic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-[#12121A] border border-[#20202E] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex border-b border-[#20202E] space-x-6 text-xs uppercase tracking-widest font-medium">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 transition-colors ${
              activeTab === 'details'
                ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Craftsmanship & Fit
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`pb-3 transition-colors ${
              activeTab === 'materials'
                ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Material Composition
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 transition-colors ${
              activeTab === 'shipping'
                ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Concierge Express Shipping
          </button>
        </div>

        {activeTab === 'details' && (
          <div className="space-y-4 text-xs text-white/80 leading-relaxed font-light">
            <p>{product.description}</p>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              {product.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
            <p className="pt-2"><strong>Fit Recommendation:</strong> {product.fit || 'Runs true to size.'}</p>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-3 text-xs text-white/80">
            <p><strong>Primary Fabric:</strong> {product.materials}</p>
            <p>Our fabrics undergo eco-certified non-toxic dyeing processes in Italy.</p>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-3 text-xs text-white/80">
            <p>Orders placed before 2 PM IST are dispatched same-day via insured express courier.</p>
          </div>
        )}
      </div>

      {/* Complete the Ensemble */}
      {pairedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-[#1C1C26]">
          <div className="flex items-center space-x-2 text-[#C5A059]">
            <Sparkles size={18} />
            <h2 className="font-serif text-2xl text-white font-normal">COMPLETE THE ENSEMBLE</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pairedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Related Collection */}
      <div className="space-y-6 pt-6 border-t border-[#1C1C26]">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-white font-normal">YOU MAY ALSO COVET</h2>
          <Link href="/shop" className="text-xs uppercase tracking-widest text-[#C5A059] hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
