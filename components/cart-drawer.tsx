'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    total,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 5000;
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F14] text-white border-l border-[#22222C] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#1E1E28] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} className="text-[#C5A059]" />
              <h2 className="font-serif text-xl font-normal tracking-wide">
                Your Atelier Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#161620] px-6 py-3 border-b border-[#22222E]">
            {amountUntilFreeShipping > 0 ? (
              <p className="text-xs text-white/70">
                Add <strong className="text-[#C5A059]">₹{amountUntilFreeShipping.toLocaleString('en-IN')}</strong> more to unlock <span className="text-white font-medium">Free Express Concierge Delivery</span>
              </p>
            ) : (
              <p className="text-xs text-[#C5A059] font-medium flex items-center">
                ✨ You have unlocked Complimentary Concierge Express Shipping!
              </p>
            )}
            <div className="w-full bg-[#242432] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#C5A059] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#181822] flex items-center justify-center mx-auto text-white/40">
                  <ShoppingBag size={32} />
                </div>
                <h3 className="font-serif text-lg text-white font-normal">Your Bag is Empty</h3>
                <p className="text-xs text-white/50 max-w-xs mx-auto">
                  Explore our Haute Couture and Ready-to-Wear collections or ask our AI Personal Stylist for recommendations.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block bg-[#C5A059] text-black font-semibold text-xs px-6 py-3 rounded uppercase tracking-wider hover:bg-[#D4AF37] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                  className="flex space-x-4 pb-6 border-b border-[#1A1A24] last:border-b-0"
                >
                  <div className="relative w-20 h-24 bg-[#1A1A22] rounded overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-normal text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                          }
                          className="text-white/40 hover:text-red-400 transition-colors ml-2"
                          title="Remove Item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="text-xs text-white/50 mt-0.5">
                        Size: <span className="text-white">{item.selectedSize}</span> | Color: <span className="text-white">{item.selectedColor}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#2A2A38] rounded bg-[#14141C]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 text-white/60 hover:text-white"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          className="p-1.5 text-white/60 hover:text-white"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-white">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#12121A] border-t border-[#1E1E2A] space-y-4">
              <div className="space-y-1.5 text-xs text-white/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Concierge Express Shipping</span>
                  <span className="text-white font-medium">
                    {shippingFee === 0 ? (
                      <strong className="text-[#C5A059]">Complimentary</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-white pt-2 border-t border-[#222230]">
                  <span>Total</span>
                  <span className="text-[#C5A059]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center border border-[#333344] hover:border-[#C5A059] text-white py-3 rounded text-xs uppercase font-medium tracking-wider transition-colors"
                >
                  View Bag
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center bg-[#C5A059] hover:bg-[#D4AF37] text-black py-3 rounded text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Checkout</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
