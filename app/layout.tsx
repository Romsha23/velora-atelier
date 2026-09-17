'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider, useCart } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { AIStylistProvider, useAIStylist } from '@/lib/ai-stylist-context';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CartDrawer from '@/components/cart-drawer';
import AIStylistWidget from '@/components/ai-stylist/ai-stylist-widget';
import { Sparkles, Check } from 'lucide-react';

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

function ToastContainer() {
  const { toastMessage, clearToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 left-4 sm:left-6 z-50 bg-[#C5A059] text-black px-4 py-3 rounded-lg shadow-2xl flex items-center space-x-2 text-xs font-semibold animate-slide-up">
      <Check size={16} />
      <span>{toastMessage}</span>
      <button onClick={clearToast} className="ml-2 text-black/60 hover:text-black">
        ×
      </button>
    </div>
  );
}

function GlobalAIWidgets() {
  const { isAIOpen, openAI, closeAI, initialPrompt } = useAIStylist();

  return (
    <>
      {/* Floating VELA AI Trigger Button */}
      <button
        onClick={() => openAI()}
        className="fixed bottom-6 right-6 z-40 bg-[#14141E] hover:bg-[#1E1E2C] text-[#D4AF37] border-2 border-[#C5A059] px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2.5 transition-all duration-300 hover:scale-105 group"
        title="Talk to VELA AI Personal Stylist"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C5A059]"></span>
        </span>
        <Sparkles size={18} className="text-[#C5A059] group-hover:rotate-12 transition-transform" />
        <span className="font-serif text-xs uppercase tracking-widest font-bold text-white">
          Ask VELA
        </span>
      </button>

      <AIStylistWidget
        isOpen={isAIOpen}
        onClose={closeAI}
        initialPrompt={initialPrompt}
      />
    </>
  );
}

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col selection:bg-[#C5A059] selection:text-black">
      <Navbar />
      
      <main className="flex-1">
        {children}
      </main>

      <Footer />
      <CartDrawer />
      <GlobalAIWidgets />
      <ToastContainer />
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publishableKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    'pk_test_ZWFzeS10YXBpci03MDM5LmNsZXJrLmFjY291bnRzLmRldiQ';

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en" className={`${serifFont.variable} ${sansFont.variable}`}>
        <head>
          <title>VÉLORA | Curated for your style. (AI Personal Stylist: VELA)</title>
          <meta
            name="description"
            content="VÉLORA boutique fashion platform powered by VELA, your intelligent personal shopper."
          />
        </head>
        <body className="font-sans antialiased bg-[#0A0A0C]">
          <CartProvider>
            <WishlistProvider>
              <AIStylistProvider>
                <MainLayoutContent>{children}</MainLayoutContent>
              </AIStylistProvider>
            </WishlistProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
