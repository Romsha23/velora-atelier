'use client';

import React from 'react';
import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block group">
            <span className="font-serif text-3xl tracking-[0.3em] font-light text-white block">
              VÉLORA
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#C5A059] font-medium block">
              Curated for your style.
            </span>
          </Link>
          <p className="text-xs text-white/60 font-light">
            Create your VÉLORA Private Membership & Unlock VELA AI Recommendations
          </p>
        </div>

        {/* Clerk Sign-Up Widget Container */}
        <div className="bg-[#12121A] border border-[#20202E] p-6 sm:p-8 rounded-2xl shadow-2xl flex justify-center">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-transparent shadow-none p-0 w-full',
                headerTitle: 'font-serif text-white text-xl text-center',
                headerSubtitle: 'text-xs text-white/60 text-center',
                socialButtonsBlockButton:
                  'bg-[#1A1A26] border border-[#2D2D40] text-white hover:bg-[#252538] text-xs font-semibold py-2.5',
                dividerLine: 'bg-[#20202E]',
                dividerText: 'text-xs text-white/40 uppercase',
                formFieldLabel: 'text-xs text-white/70 font-medium uppercase tracking-wider',
                formFieldInput:
                  'bg-[#181824] border border-[#2A2A3C] text-white text-xs p-3 rounded-lg focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]',
                formButtonPrimary:
                  'bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-all shadow-lg',
                footerActionLink: 'text-[#C5A059] hover:underline font-semibold text-xs',
              },
            }}
          />
        </div>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Boutique Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
