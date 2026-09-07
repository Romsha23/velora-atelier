'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Package, Truck, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Order } from '@/types';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('elan_orders') || '[]');
      const found = orders.find((o: Order) => o.id === orderId);
      if (found) {
        setOrder(found);
      }
    } catch (e) {
      console.error('Failed to load order confirmation', e);
    }
  }, [orderId]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Confirmation Header */}
      <div className="bg-[#12121A] border border-[#C5A059]/40 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center mx-auto">
          <CheckCircle2 size={36} />
        </div>

        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">
            Order Confirmation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-light">
            THANK YOU FOR YOUR ORDER
          </h1>
          <p className="text-xs text-white/60">
            Order ID: <strong className="text-white font-mono">{orderId}</strong> • Placed on {order?.date || 'Today'}
          </p>
        </div>

        <p className="text-xs text-white/70 max-w-lg mx-auto leading-relaxed">
          Your haute couture order has been registered at our Atelier. A confirmation receipt has been dispatched to{' '}
          <strong className="text-[#C5A059]">{order?.shippingAddress.email || 'your email'}</strong>.
        </p>
      </div>

      {/* Live Order Tracking Simulator */}
      <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-6 space-y-6">
        <h3 className="font-serif text-lg text-white font-normal border-b border-[#1E1E2A] pb-3 flex items-center space-x-2">
          <Truck size={18} className="text-[#C5A059]" />
          <span>Live Concierge Express Tracking</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          {[
            { title: 'Order Registered', status: 'Completed', active: true },
            { title: 'Atelier Quality Inspection', status: 'In Progress', active: true },
            { title: 'Dispatched via Courier', status: 'Pending', active: false },
            { title: 'Delivered', status: 'Pending', active: false },
          ].map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border text-xs space-y-1 ${
                step.active
                  ? 'bg-[#181824] border-[#C5A059]/40 text-white'
                  : 'bg-[#0E0E14] border-[#1E1E28] text-white/40'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-[#C5A059] text-black font-bold mx-auto flex items-center justify-center text-[10px]">
                {idx + 1}
              </div>
              <p className="font-serif font-medium text-white">{step.title}</p>
              <p className="text-[10px] text-[#C5A059]">{step.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Items & Summary */}
      {order && (
        <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-6 space-y-6">
          <h3 className="font-serif text-lg text-white font-normal border-b border-[#1E1E2A] pb-3">
            Summary of Purchased Items
          </h3>

          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between space-x-4 border-b border-[#1A1A24] pb-4 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div className="relative w-14 h-16 bg-[#181824] rounded overflow-hidden shrink-0">
                    <Image src={item.product.images[0]} alt="" fill className="object-cover object-top" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-white">{item.product.name}</h4>
                    <p className="text-xs text-white/50">
                      Size: {item.selectedSize} | Color: {item.selectedColor} | Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#C5A059]">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1E1E2A] flex flex-col sm:flex-row justify-between items-center text-xs space-y-4 sm:space-y-0">
            <div>
              <p className="text-white/60">Shipping Destination:</p>
              <p className="text-white font-medium">{order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}</p>
            </div>
            <div className="text-right">
              <p className="text-white/60">Total Paid:</p>
              <p className="text-lg font-bold text-[#C5A059]">₹{order.total.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/account"
          className="bg-[#1C1C2A] hover:bg-[#252538] text-white border border-[#2A2A3E] px-6 py-3 rounded-xl text-xs uppercase font-medium tracking-wider transition-colors"
        >
          View All Orders in Account
        </Link>
        <Link
          href="/shop"
          className="bg-[#C5A059] hover:bg-[#D4AF37] text-black px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-colors flex items-center space-x-1"
        >
          <span>Continue Shopping</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
