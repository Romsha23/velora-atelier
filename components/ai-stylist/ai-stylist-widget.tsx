'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import { AIMessage } from '@/types';
import ChatMessage from './chat-message';
import StarterPrompts from './starter-prompts';

interface AIStylistWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string | null;
}

export default function AIStylistWidget({ isOpen, onClose, initialPrompt }: AIStylistWidgetProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Welcome to VÉLORA. I am VELA, your private AI personal stylist.\n\nWhether you are curating an ensemble for a **wedding**, seeking **resort linen essentials**, or building a **complete outfit under ₹6,000**, I am here to guide your style journey.`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      const aiMsg: AIMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.content || 'VELA has selected these pieces for your consideration.',
        recommendedProducts: data.recommendedProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowups: data.suggestedFollowups,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error fetching VELA AI response:', err);
      const errorMsg: AIMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Apologies, I encountered a brief interruption connecting to the VÉLORA database. Please try your request again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Conversation refreshed. How may VELA assist your style journey today?`,
        timestamp: 'Just now',
      },
    ]);
  };

  if (!isOpen) return null;

  const lastMessage = messages[messages.length - 1];

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isExpanded
          ? 'inset-2 sm:inset-6 max-w-4xl mx-auto'
          : 'bottom-4 right-4 w-[92vw] sm:w-[440px] h-[650px] max-h-[85vh]'
      } bg-[#0D0D12] text-white border border-[#C5A059]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl`}
    >
      {/* Header Bar */}
      <div className="bg-[#12121B] px-5 py-4 border-b border-[#222230] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-9 h-9 rounded-full bg-[#1C1C2A] border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-serif font-bold text-sm shadow-md">
            <span>V</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#12121B]" />
          </div>
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wide flex items-center space-x-1.5">
              <span>VELA AI Personal Stylist</span>
              <Sparkles size={13} className="text-[#C5A059]" />
            </h3>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">
              VÉLORA Atelier Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-white/60">
          <button
            onClick={handleReset}
            className="hover:text-[#C5A059] p-1.5 rounded transition-colors"
            title="Reset Conversation"
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden sm:block hover:text-white p-1.5 rounded transition-colors"
            title={isExpanded ? 'Minimize Window' : 'Expand Window'}
          >
            {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
          <button
            onClick={onClose}
            className="hover:text-white p-1.5 rounded transition-colors"
            title="Close VELA"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#0A0A0E]/80">
        {messages.length === 1 && (
          <StarterPrompts onSelectPrompt={(text) => handleSend(text)} />
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isLoading && (
          <ChatMessage
            message={{
              id: 'typing',
              role: 'assistant',
              content: 'VELA is styling VÉLORA options for you...',
              timestamp: 'Styling...',
            }}
            isTyping={true}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Followups */}
      {lastMessage?.role === 'assistant' && lastMessage.suggestedFollowups && !isLoading && (
        <div className="px-4 py-2 bg-[#101018] border-t border-[#1C1C28] flex gap-2 overflow-x-auto scrollbar-none">
          {lastMessage.suggestedFollowups.map((f, i) => (
            <button
              key={i}
              onClick={() => handleSend(f)}
              className="shrink-0 bg-[#1A1A28] hover:bg-[#252538] text-white/80 hover:text-[#C5A059] border border-[#28283C] text-[10px] px-3 py-1 rounded-full transition-colors"
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <div className="p-4 bg-[#12121A] border-t border-[#20202E]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Ask VELA (e.g. Build an outfit under ₹6,000 for a gala)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-[#181824] border border-[#28283A] text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C5A059] placeholder-white/30"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-[#C5A059] hover:bg-[#D4AF37] disabled:opacity-40 text-black p-3 rounded-xl transition-all duration-200 shrink-0 font-bold"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
