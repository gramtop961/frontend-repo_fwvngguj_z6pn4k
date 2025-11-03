import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Rocket, Zap, LineChart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[82vh] md:h-[88vh] overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Y7DK6OtMHusdC345/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlays for depth (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/30 to-zinc-950" />

      {/* Animated ambient glows */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: [1.05, 0.95, 1.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl h-full px-4 flex items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
          >
            <Zap size={14} className="text-cyan-400" />
            <span>GEO: Generative Efficiency Optimization</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 text-4xl md:text-6xl font-semibold leading-tight tracking-tight"
          >
            Optimize LLM performance without compromising quality
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-4 text-lg text-zinc-300"
          >
            LLMO reveals where tokens are wasted, then applies GEO strategies to reduce cost, latency, and drift—while preserving accuracy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center rounded-md bg-cyan-500 text-zinc-950 font-medium px-5 py-3 hover:bg-cyan-400 transition"
            >
              <Rocket className="mr-2" size={18} /> Request Private Beta
              {/* subtle shine */}
              <span className="pointer-events-none absolute inset-0 rounded-md [mask-image:radial-gradient(100px_40px_at_0%_0%,black,transparent)] bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition will-change-transform" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 px-5 py-3 hover:bg-white/10 transition text-zinc-100"
            >
              <LineChart className="mr-2" size={18} /> See impact
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-zinc-300"
          >
            <Stat label="Avg cost reduction" value="32%" />
            <Stat label="Median latency delta" value="-41%" />
            <Stat label="Accuracy deviation" value="<1%" />
            <Stat label="A/B iterations" value=">10k" />
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 hidden md:flex items-center gap-2 text-xs text-zinc-400"
          >
            <div className="h-5 w-[1px] bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
            <span>Scroll to explore</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="rounded-lg border border-white/10 bg-white/5 p-3"
    >
      <div className="text-xl font-semibold text-white">{value}</div>
      <div className="text-xs text-zinc-400">{label}</div>
    </motion.div>
  );
}
