'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Package, MapPin, Heart, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { Order } from '@/types';

export default function AccountPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('elan_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to load past orders', e);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Client Profile Header */}
      <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 rounded-full bg-[#1C1C2A] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059] font-serif text-2xl font-bold shadow-md">
            É
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-2xl text-white font-normal">Atelier VIP Member</h1>
              <span className="bg-[#C5A059]/20 text-[#C5A059] text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded border border-[#C5A059]/40">
                Platinum Status
              </span>
            </div>
            <p className="text-xs text-white/50 mt-1">
              Member since 2026 • Exclusive Access to Private Trunk Shows
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div className="bg-[#181824] px-4 py-2.5 rounded-xl border border-[#262638] text-center">
            <span className="text-white/40 block text-[10px] uppercase tracking-widest">Total Orders</span>
            <strong className="text-white text-base font-bold">{orders.length}</strong>
          </div>
          <div className="bg-[#181824] px-4 py-2.5 rounded-xl border border-[#262638] text-center">
            <span className="text-white/40 block text-[10px] uppercase tracking-widest">Reward Tier</span>
            <strong className="text-[#C5A059] text-base font-bold">5,400 pts</strong>
          </div>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex border-b border-[#1C1C26] space-x-8 text-xs uppercase tracking-widest font-medium">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 transition-colors flex items-center space-x-2 ${
            activeTab === 'orders'
              ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Package size={16} />
          <span>My Orders ({orders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-4 transition-colors flex items-center space-x-2 ${
            activeTab === 'profile'
              ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <User size={16} />
          <span>Client Profile</span>
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-4 transition-colors flex items-center space-x-2 ${
            activeTab === 'addresses'
              ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-bold'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <MapPin size={16} />
          <span>Saved Destinations</span>
        </button>
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-12 text-center space-y-4">
              <Package size={32} className="text-white/30 mx-auto" />
              <h3 className="font-serif text-lg text-white">No Past Orders Found</h3>
              <p className="text-xs text-white/50">When you place an order, your tracking details and receipt will be stored here.</p>
              <Link
                href="/shop"
                className="inline-block bg-[#C5A059] text-black font-semibold text-xs px-6 py-3 rounded uppercase tracking-wider"
              >
                Shop Collection
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#12121A] border border-[#20202E] rounded-2xl p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#1E1E2A] pb-4 gap-2">
                  <div>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Order Reference</span>
                    <h3 className="font-serif text-lg text-white font-normal">{order.id}</h3>
                    <p className="text-xs text-white/50">Placed on {order.date}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                      {order.status}
                    </span>
                    <Link
                      href={`/order-confirmation/${order.id}`}
                      className="text-xs text-[#C5A059] hover:underline flex items-center space-x-1"
                    >
                      <span>Track Order</span>
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-14 bg-[#181824] rounded overflow-hidden shrink-0">
                          <Image src={item.product.images[0]} alt="" fill className="object-cover object-top" />
                        </div>
                        <div>
                          <h4 className="text-white font-serif">{item.product.name}</h4>
                          <p className="text-white/40 text-[10px]">
                            Size: {item.selectedSize} | Color: {item.selectedColor} | Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#C5A059]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#1E1E2A] flex justify-between items-center text-xs">
                  <span className="text-white/50">Payment Method: <strong>{order.paymentMethod}</strong></span>
                  <span className="text-base font-bold text-white">Total: <strong className="text-[#C5A059]">₹{order.total.toLocaleString('en-IN')}</strong></span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-[#12121A] border border-[#20202E] rounded-2xl p-8 space-y-6 max-w-2xl">
          <h3 className="font-serif text-xl text-white font-normal border-b border-[#1E1E2A] pb-3">
            Personal Information
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-white/40 block text-[10px] uppercase tracking-widest mb-1">Full Name</label>
              <input type="text" readOnly value="Countess Client" className="w-full bg-[#181824] border border-[#262638] text-white p-3 rounded-lg" />
            </div>
            <div>
              <label className="text-white/40 block text-[10px] uppercase tracking-widest mb-1">Email Address</label>
              <input type="email" readOnly value="vip@atelier.com" className="w-full bg-[#181824] border border-[#262638] text-white p-3 rounded-lg" />
            </div>
            <div>
              <label className="text-white/40 block text-[10px] uppercase tracking-widest mb-1">Preferred Atelier Currency</label>
              <input type="text" readOnly value="₹ INR (Indian Rupee)" className="w-full bg-[#181824] border border-[#262638] text-white p-3 rounded-lg" />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Saved Destinations */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#12121A] border border-[#C5A059]/40 rounded-2xl p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Default Residence</span>
              <span className="text-xs text-emerald-400">Verified</span>
            </div>
            <h4 className="font-serif text-base text-white">Private Villa</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Lower Parel, Mumbai, Maharashtra 400013<br />
              India
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
