import React, { useRef } from 'react';
import Hero from './components/Hero.jsx';
import ValueProps from './components/ValueProps.jsx';
import SocialProof from './components/SocialProof.jsx';
import DataCaptureForm from './components/DataCaptureForm.jsx';

export default function App() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    const el = document.getElementById('analysis-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500" />
            <span className="font-semibold tracking-tight">LLMO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <button onClick={scrollToForm} className="hover:text-zinc-900 transition">Analyze Free</button>
            <a href="#why" className="hover:text-zinc-900 transition">Why GEO</a>
            <a href="#proof" className="hover:text-zinc-900 transition">Results</a>
          </nav>
          <button onClick={scrollToForm} className="inline-flex items-center rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-500 transition">Analyze Your Product</button>
        </div>
      </header>

      <main>
        <Hero onCTAClick={scrollToForm} />
        <ValueProps />
        <SocialProof onCTAClick={scrollToForm} />
        <DataCaptureForm refEl={formRef} />
      </main>

      <footer className="border-t border-zinc-200 mt-20">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-zinc-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LLMO — LLM Optimization</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-zinc-900 transition" href="#why">Why GEO</a>
            <a className="hover:text-zinc-900 transition" href="#proof">Case Studies</a>
            <button onClick={scrollToForm} className="hover:text-zinc-900 transition">Start Analysis</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
