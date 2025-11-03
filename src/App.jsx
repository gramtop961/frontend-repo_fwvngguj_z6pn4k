import React from 'react';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import TechShowcase from './components/TechShowcase.jsx';
import DataCaptureForm from './components/DataCaptureForm.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-500" />
            <span className="font-semibold tracking-tight">LLMO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <a href="#features" className="hover:text-white transition">Why LLMO</a>
            <a href="#tech" className="hover:text-white transition">Technology</a>
            <a href="#contact" className="hover:text-white transition">Get Access</a>
          </nav>
          <a href="#contact" className="inline-flex items-center rounded-md bg-white/10 hover:bg-white/20 transition px-3 py-1.5 text-sm">Request Invite</a>
        </div>
      </header>

      <main>
        <Hero />
        <Features />
        <TechShowcase />
        <DataCaptureForm />
      </main>

      <footer className="border-t border-zinc-800 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LLMO — LLM Optimization</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-white transition" href="#features">Features</a>
            <a className="hover:text-white transition" href="#tech">Tech</a>
            <a className="hover:text-white transition" href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
