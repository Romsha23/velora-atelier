'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, User as UserIcon } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useAIStylist } from '@/lib/ai-stylist-context';
import SearchModal from './search-modal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { setIsCartOpen, itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { openAI } = useAIStylist();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collection', href: '/shop' },
    { name: 'Women', href: '/shop?category=Women' },
    { name: 'Men', href: '/shop?category=Men' },
    { name: 'Accessories', href: '/shop?category=Accessories' },
    { name: 'Runway Studio', href: '/runway' },
    { name: 'The Journal', href: '/journal' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0A0A0C] text-[#D4AF37] text-[11px] font-medium tracking-[0.2em] uppercase py-2 px-4 text-center border-b border-[#222226]">
        <span>Complimentary Concierge Shipping on Orders Above ₹5,000</span>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0C]/90 backdrop-blur-md border-b border-[#1C1C22] shadow-xl py-4'
            : 'bg-[#0A0A0C] py-6 border-b border-[#18181F]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Navigation Links */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white/80 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors hover:text-[#C5A059] ${
                      isActive ? 'text-[#C5A059]' : 'text-white/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: VÉLORA Brand Logo Treatment */}
          <div className="text-center">
            <Link href="/" className="group inline-block">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.3em] font-light text-white group-hover:text-[#C5A059] transition-colors block">
                VÉLORA
              </span>
              <span className="text-[8px] tracking-[0.35em] uppercase text-[#C5A059] font-medium block -mt-1">
                Curated for your style.
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-white/80 hover:text-[#C5A059] transition-colors flex items-center space-x-1"
              title="Search Catalog"
            >
              <Search size={19} />
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.15em] ml-1">Search</span>
            </button>

            <button
              onClick={() => openAI()}
              className="relative group flex items-center space-x-1.5 bg-[#1B1B22] hover:bg-[#252530] text-[#D4AF37] border border-[#C5A059]/30 hover:border-[#C5A059] px-3 py-1.5 rounded-full transition-all duration-300 text-xs font-medium"
            >
              <Sparkles size={14} className="text-[#D4AF37] animate-pulse" />
              <span className="hidden sm:inline tracking-wider uppercase text-[10px]">Ask VELA</span>
            </button>

            <Link
              href="/wishlist"
              className="relative text-white/80 hover:text-[#C5A059] transition-colors"
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#C5A059] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white/80 hover:text-[#C5A059] transition-colors flex items-center"
              title="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#C5A059] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Authentication States via Clerk Hook */}
            <div className="flex items-center pl-1 border-l border-[#22222E] ml-1 min-w-[70px]">
              {isLoaded && isSignedIn ? (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/account"
                    className="text-xs uppercase tracking-wider text-white/80 hover:text-[#C5A059] transition-colors hidden sm:block font-medium"
                  >
                    VIP Salon
                  </Link>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8 border border-[#C5A059]',
                      },
                    }}
                  />
                </div>
              ) : isLoaded ? (
                <Link
                  href="/sign-in"
                  className="bg-[#C5A059]/10 hover:bg-[#C5A059] text-[#C5A059] hover:text-black border border-[#C5A059]/50 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow"
                >
                  <UserIcon size={13} />
                  <span>VIP Sign In</span>
                </Link>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#181824] animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[85px] z-50 bg-[#0A0A0C] px-6 py-8 flex flex-col justify-between border-t border-[#1C1C22]">
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-2xl tracking-wider text-white hover:text-[#C5A059] transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <hr className="border-[#22222A]" />

              {isLoaded && isSignedIn ? (
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-xl text-[#C5A059]"
                >
                  My VIP Account & Orders
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 bg-[#C5A059] text-black font-bold py-3 rounded text-xs uppercase tracking-widest"
                >
                  <UserIcon size={16} />
                  <span>VIP Client Login / Register</span>
                </Link>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAI();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-[#1A1A24] border border-[#C5A059]/40 text-[#C5A059] font-medium py-3 rounded text-xs uppercase tracking-widest"
              >
                <Sparkles size={16} />
                <span>Consult VELA AI Stylist</span>
              </button>
            </div>

            <div className="text-center text-xs text-white/40 tracking-widest pt-8">
              VÉLORA © 2026 • Curated for your style.
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
