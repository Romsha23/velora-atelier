'use client';

import React from 'react';
import { Sparkles, Heart, Gift, TrendingUp, Sun, GlassWater } from 'lucide-react';

interface StarterPromptsProps {
  onSelectPrompt: (promptText: string) => void;
}

export default function StarterPrompts({ onSelectPrompt }: StarterPromptsProps) {
  const prompts = [
    {
      icon: <Sparkles size={13} className="text-[#C5A059]" />,
      text: 'Build a summer outfit under ₹6,000',
    },
    {
      icon: <GlassWater size={13} className="text-[#C5A059]" />,
      text: 'I need a wedding guest dress under ₹7,000',
    },
    {
      icon: <Sun size={13} className="text-[#C5A059]" />,
      text: 'Show me something minimal for date night',
    },
    {
      icon: <Gift size={13} className="text-[#C5A059]" />,
      text: 'I need a luxury gift for my sister under ₹5,000',
    },
    {
      icon: <TrendingUp size={13} className="text-[#C5A059]" />,
      text: "What's trending in VÉLORA right now?",
    },
  ];

  return (
    <div className="p-4 space-y-2 bg-[#12121A] rounded-xl border border-[#222230] mb-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium flex items-center">
        <Sparkles size={12} className="mr-1" />
        <span>Ask VELA AI Stylist</span>
      </p>

      <div className="flex flex-wrap gap-2 pt-1">
        {prompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(p.text)}
            className="flex items-center space-x-1.5 bg-[#1A1A26] hover:bg-[#252538] border border-[#2A2A3E] hover:border-[#C5A059]/40 text-[11px] text-white/90 px-3 py-1.5 rounded-full transition-all duration-200 text-left"
          >
            {p.icon}
            <span>{p.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
