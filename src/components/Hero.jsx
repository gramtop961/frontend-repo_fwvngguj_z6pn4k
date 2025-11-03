import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Hero({ onCTAClick }) {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[78vh] overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient veil (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-zinc-900"
          >
            Your Products Are Invisible to AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 text-lg text-zinc-700 max-w-xl"
          >
            Discover how your product ranks when AI recommends solutions. Most companies score 0. GEO is the next SEO.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={onCTAClick}
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-5 py-3 font-medium hover:bg-indigo-500 transition shadow-sm"
            >
              Analyze Your Product (Free)
              <ArrowRight size={18} className="ml-2" />
            </button>
            <div className="flex items-center text-sm text-zinc-600">
              <ShieldCheck size={16} className="text-emerald-500 mr-2" />
              Join 150+ companies analyzing their GEO score this week
            </div>
          </motion.div>
        </div>

        {/* Chat demo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-xl border border-zinc-200 bg-white/80 backdrop-blur p-4 shadow-sm"
        >
          <div className="flex items-center mb-3 text-zinc-600 text-sm"><MessageSquare size={16} className="mr-2" /> LLM Recommendation Preview</div>
          <div className="space-y-3">
            <ChatBubble side="left" text="What are the best cordless vacuums for pet hair?" />
            <ChatBubble side="right" text="Top picks: Cyclone Pro X, DustAway Max, AeroClean 2.0." subtle />
            <ChatBubble side="left" text="Does AeroClean 2.0 handle long hair without tangling?" />
            <ChatBubble side="right" text="Yes, but consider Cyclone Pro X for better filter longevity." subtle />
            <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm px-3 py-2">
              Your product isn’t mentioned. GEO optimization surfaces you in answers like these.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ChatBubble({ side = 'left', text, subtle = false }) {
  const isLeft = side === 'left';
  return (
    <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
      <div className={`${subtle ? 'bg-zinc-50 border-zinc-200 text-zinc-700' : 'bg-indigo-50 border-indigo-200 text-indigo-900'} border px-3 py-2 rounded-lg max-w-[85%] shadow-sm`}>
        <p className="text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
