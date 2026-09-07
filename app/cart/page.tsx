'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, shippingFee, total } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ELAN10' || promoCode.trim().toUpperCase() === 'ATELIER') {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "ELAN10" for 10% off.');
    }
  };

  const finalTotal = Math.max(0, total - discountAmount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[#1C1C26] pb-6 flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">
            Your Atelier Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
            SHOPPING BAG ({cart.reduce((sum, i) => sum + i.quantity, 0)})
          </h1>
        </div>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-white/40 hover:text-red-400 transition-colors uppercase tracking-widest"
          >
            Clear Bag
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-16 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-[#181824] flex items-center justify-center mx-auto text-white/30">
            <ShoppingBag size={38} />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl text-white font-normal">Your Bag is Empty</h2>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              Your haute couture selection is empty. Discover our latest arrivals or ask our AI Stylist for recommendations.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Item Table (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-6 divide-y divide-[#1A1A26]">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-24 bg-[#181822] rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-serif text-base text-white hover:text-[#C5A059] transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-white/40 mt-1">
                        Category: <span className="text-white">{item.product.category}</span>
                      </p>
                      <p className="text-xs text-white/40">
                        Size: <span className="text-white font-medium">{item.selectedSize}</span> | Color: <span className="text-white font-medium">{item.selectedColor}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto space-x-6">
                    {/* Quantity Modifier */}
                    <div className="flex items-center border border-[#2A2A3A] rounded-lg bg-[#181824]">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        className="p-2 text-white/60 hover:text-white"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                        className="p-2 text-white/60 hover:text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <span className="text-base font-bold text-white min-w-[90px] text-right">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() =>
                        removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                      }
                      className="text-white/40 hover:text-red-400 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Panel (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-6 space-y-6">
              <h3 className="font-serif text-lg text-white font-normal border-b border-[#1E1E2A] pb-3">
                Order Summary
              </h3>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70 font-medium flex items-center">
                  <Tag size={13} className="mr-1 text-[#C5A059]" />
                  <span>Promo Code</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. ELAN10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-[#181824] border border-[#28283A] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    type="submit"
                    className="bg-[#242436] hover:bg-[#303048] text-white text-xs px-4 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-emerald-400">10% Atelier VIP discount applied!</p>
                )}
                {promoError && <p className="text-xs text-red-400">{promoError}</p>}
              </form>

              <hr className="border-[#1E1E2A]" />

              <div className="space-y-2.5 text-xs text-white/70">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Promo Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Concierge Express Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-[#C5A059]">Complimentary</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white pt-3 border-t border-[#1E1E2A]">
                  <span>Total Amount</span>
                  <span className="text-[#C5A059]">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-black py-4 rounded-xl text-xs uppercase font-bold tracking-[0.2em] shadow-xl flex items-center justify-center space-x-2 transition-all"
              >
                <span>Proceed to Concierge Checkout</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="flex items-center space-x-3 text-xs text-white/50 bg-[#12121A] p-4 rounded-xl border border-[#20202E]">
              <ShieldCheck size={20} className="text-[#C5A059] shrink-0" />
              <span>All transactions are encrypted with 256-bit SSL luxury security protocols.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
