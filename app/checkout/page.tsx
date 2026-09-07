'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, Lock, CreditCard, Truck, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { ShippingAddress } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, shippingFee, total, clearCart } = useCart();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400013',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // Send checkout payload to OrderService API endpoint
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((i) => ({
            product: { id: i.product.id, price: i.product.price },
            selectedSize: i.selectedSize,
            selectedColor: i.selectedColor,
            quantity: i.quantity,
          })),
          shippingAddress: formData,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server rejected order creation');
      }

      // Save order record to localStorage for user account history
      const orderRecord = {
        id: data.orderId,
        date: data.date,
        items: cart,
        subtotal: data.subtotal,
        shippingFee: data.shippingFee,
        total: data.total,
        shippingAddress: formData,
        paymentMethod: paymentMethod.toUpperCase(),
        status: data.status,
        estimatedDelivery: data.estimatedDelivery,
      };

      try {
        const existingOrders = JSON.parse(localStorage.getItem('elan_orders') || '[]');
        localStorage.setItem('elan_orders', JSON.stringify([orderRecord, ...existingOrders]));
      } catch (err) {
        console.error('Failed to update local order history', err);
      }

      clearCart();
      router.push(`/order-confirmation/${data.orderId}`);
    } catch (err: any) {
      console.error('Order creation error:', err);
      setErrorMessage(err.message || 'Failed to authorize order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl text-white">Your Bag is Empty</h1>
        <p className="text-xs text-white/50">Add items to your bag before proceeding to checkout.</p>
        <button
          onClick={() => router.push('/shop')}
          className="bg-[#C5A059] text-black font-semibold text-xs px-6 py-3 rounded uppercase tracking-wider"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-[#1C1C26] pb-4">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">
          VÉLORA Concierge Checkout
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
          FINALISE YOUR ORDER
        </h1>
      </div>

      {errorMessage && (
        <div className="bg-red-950/80 border border-red-800 text-red-300 p-4 rounded-xl text-xs">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Info */}
          <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-lg text-white font-normal border-b border-[#1E1E2A] pb-3 flex items-center justify-between">
              <span>1. Client Contact Details</span>
              <Lock size={15} className="text-[#C5A059]" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-white/70">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-[#181824] border border-[#262638] text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-white/70">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="client@velora.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#181824] border border-[#262638] text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] uppercase tracking-wider text-white/70">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#181824] border border-[#262638] text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-lg text-white font-normal border-b border-[#1E1E2A] pb-3 flex items-center justify-between">
              <span>2. Shipping Destination</span>
              <Truck size={15} className="text-[#C5A059]" />
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-white/70">Street Address & Residence *</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Apartment, Suite, Street name"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-[#181824] border border-[#262638] text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-white/70">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#181824] border border-[#262638] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-white/70">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-[#181824] border border-[#262638] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-white/70">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-[#181824] border border-[#262638] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Options */}
          <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-lg text-white font-normal border-b border-[#1E1E2A] pb-3 flex items-center justify-between">
              <span>3. Payment Gateway</span>
              <CreditCard size={15} className="text-[#C5A059]" />
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'card', label: 'Credit / Debit Card' },
                { id: 'upi', label: 'UPI / NetBanking' },
                { id: 'cod', label: 'Cash on Delivery' },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`py-3 px-2 text-xs rounded-xl border text-center font-medium transition-all ${
                    paymentMethod === m.id
                      ? 'bg-[#C5A059]/20 text-[#C5A059] border-[#C5A059]'
                      : 'bg-[#181824] text-white/60 border-[#262638] hover:border-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  placeholder="Card Number (4000 1234 5678 9010)"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-[#181824] border border-[#262638] text-white text-xs px-3.5 py-2.5 rounded-lg"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="bg-[#181824] border border-[#262638] text-white text-xs px-3.5 py-2.5 rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="CVC"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="bg-[#181824] border border-[#262638] text-white text-xs px-3.5 py-2.5 rounded-lg"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. mobile@upi)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-[#181824] border border-[#262638] text-white text-xs px-3.5 py-2.5 rounded-lg"
                />
              </div>
            )}

            {paymentMethod === 'cod' && (
              <p className="text-xs text-white/60 pt-2">
                Pay in cash or card upon delivery. Concierge verification included.
              </p>
            )}
          </div>
        </div>

        {/* Right Summary Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-6 space-y-6">
            <h3 className="font-serif text-lg text-white font-normal border-b border-[#1E1E2A] pb-3">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>

            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {cart.map((item, i) => (
                <div key={i} className="flex space-x-3 text-xs">
                  <div className="relative w-12 h-14 bg-[#181824] rounded overflow-hidden shrink-0">
                    <Image src={item.product.images[0]} alt="" fill className="object-cover object-top" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-serif line-clamp-1">{item.product.name}</h4>
                    <p className="text-white/40 text-[10px]">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                    <p className="text-[#C5A059] font-semibold mt-0.5">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-[#1E1E2A]" />

            <div className="space-y-2 text-xs text-white/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Concierge Express Shipping</span>
                <span className="text-[#C5A059] font-medium">
                  {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-3 border-t border-[#1E1E2A]">
                <span>Total Due</span>
                <span className="text-[#C5A059]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C5A059] hover:bg-[#D4AF37] disabled:opacity-50 text-black py-4 rounded-xl text-xs uppercase font-bold tracking-[0.2em] shadow-2xl flex items-center justify-center space-x-2 transition-all duration-300"
            >
              {isSubmitting ? (
                <span>Authorizing Order via Server...</span>
              ) : (
                <>
                  <span>Authorize & Place Order</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-3 text-xs text-white/50 bg-[#12121A] p-4 rounded-xl border border-[#20202E]">
            <ShieldCheck size={20} className="text-[#C5A059] shrink-0" />
            <span>256-bit SSL encrypted transaction powered by VÉLORA security.</span>
          </div>
        </div>
      </form>
    </div>
  );
}
