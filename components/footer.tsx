'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Github,
  Mail,
  Linkedin,
  Phone,
  Globe,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#070709] text-white border-t border-[#1C1C24] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Manifesto & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.3em] font-light text-white block">
                VÉLORA
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#C5A059] font-medium block">
                Curated for your style.
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-md font-light">
              Crafting timeless haute couture and contemporary ready-to-wear pieces designed with master Italian silk, Mongolian cashmere, and artisan craftsmanship.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-3">
                Join The VÉLORA Private Journal
              </h4>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs text-[#C5A059] bg-[#16161D] p-3 rounded border border-[#C5A059]/30">
                  <CheckCircle2 size={16} />
                  <span>Welcome to VÉLORA. You will receive private invitations.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email for private invitations"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#121218] border border-[#262632] text-white text-xs px-4 py-3 rounded-l focus:outline-none focus:border-[#C5A059] w-full"
                  />
                  <button
                    type="submit"
                    className="bg-[#C5A059] text-black px-5 py-3 rounded-r text-xs uppercase tracking-wider font-semibold hover:bg-[#D4AF37] transition-colors flex items-center shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={14} className="ml-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links: Boutique */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-4">
              Boutique
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/shop?category=Women" className="hover:text-[#C5A059] transition-colors">
                  Womenswear Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Men" className="hover:text-[#C5A059] transition-colors">
                  Menswear Tailoring
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Accessories" className="hover:text-[#C5A059] transition-colors">
                  Leather Goods & Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Footwear" className="hover:text-[#C5A059] transition-colors">
                  Italian Artisan Footwear
                </Link>
              </li>
              <li>
                <Link href="/shop?occasion=Wedding" className="hover:text-[#C5A059] transition-colors">
                  The Wedding & Gala Edit
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge & Contact Us */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-4">
              Contact & Concierge
            </h4>
            <ul className="space-y-3 text-xs text-white/70">
              <li>
                <a
                  href="https://github.com/Romsha23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white/80 hover:text-[#C5A059] transition-colors group"
                >
                  <Github size={14} className="text-[#C5A059] group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-white/20 underline-offset-4 font-mono text-[11px]">
                    github.com/Romsha23
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@velora-atelier.com"
                  className="flex items-center space-x-2 text-white/80 hover:text-[#C5A059] transition-colors group"
                >
                  <Mail size={14} className="text-[#C5A059] group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-white/20 underline-offset-4">
                    contact@velora-atelier.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center space-x-2 text-white/80 hover:text-[#C5A059] transition-colors group"
                >
                  <Phone size={14} className="text-[#C5A059] group-hover:scale-110 transition-transform" />
                  <span>+91 (022) 8800-VELORA</span>
                </a>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#C5A059] transition-colors block">
                  Order Tracking & Support
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#C5A059] transition-colors block">
                  Styling & Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Flagship Ateliers & Developer Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-4">
              Flagship Salons
            </h4>
            <div className="space-y-3 text-xs text-white/70">
              <div>
                <p className="font-semibold text-white">Paris Atelier</p>
                <p className="text-[11px] text-white/50">28 Rue du Faubourg Saint-Honoré</p>
              </div>
              <div>
                <p className="font-semibold text-white">Mumbai Salon</p>
                <p className="text-[11px] text-white/50">Altimus, Lower Parel, Mumbai</p>
              </div>
              <div>
                <p className="font-semibold text-white">Milan Boutique</p>
                <p className="text-[11px] text-white/50">Via Montenapoleone 14</p>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Contact & Engineering Showcase Card */}
        <div className="bg-[#0F0F16] border border-[#222230] rounded-xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] shrink-0">
              <Github size={24} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  Lead Engineer & Full-Stack Architect
                </h4>
                <span className="text-[10px] bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 px-2 py-0.5 rounded font-mono uppercase">
                  Verified Builder
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Engineered with Next.js 15, TypeScript, Tailwind CSS & AI VELA Stylist Engine.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/Romsha23"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1A1A26] hover:bg-[#252538] text-white border border-[#2D2D40] hover:border-[#C5A059]/60 px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all group"
            >
              <Github size={15} className="text-[#C5A059] group-hover:scale-110 transition-transform" />
              <span>github.com/Romsha23</span>
              <ExternalLink size={12} className="text-white/40 group-hover:text-white" />
            </a>

            <a
              href="mailto:contact@velora-atelier.com"
              className="bg-[#C5A059] hover:bg-[#D4AF37] text-black px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md"
            >
              <Mail size={15} />
              <span>Contact via Email</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#181822] flex flex-col md:flex-row justify-between items-center text-xs text-white/40 space-y-4 md:space-y-0">
          <p>© 2026 VÉLORA Atelier. All Rights Reserved. Curated for your style.</p>
          <div className="flex items-center space-x-6">
            <span className="text-white/60">
              Currency: <strong className="text-[#C5A059]">₹ INR (India)</strong>
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
