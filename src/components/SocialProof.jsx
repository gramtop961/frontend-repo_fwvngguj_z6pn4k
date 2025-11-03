import React from 'react';

const cards = [
  {
    name: 'Electric Razor Co',
    score: '32 → 76 in 90 days',
    impact: '2.4x increase in AI-recommended purchases',
  },
  {
    name: 'SaaS Tool',
    score: '18 → 65 in 60 days',
    impact: 'First in category mentioned by ChatGPT for their use case',
  },
  {
    name: 'Premium Headphones',
    score: '41 → 88 in 120 days',
    impact: 'Now appears in 95% of product recommendation queries',
  },
];

export default function SocialProof({ onCTAClick }) {
  return (
    <section id="proof" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">Why companies analyze their GEO score now</h2>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.name} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="text-sm text-zinc-500">{c.name}</div>
            <div className="mt-2 text-xl font-semibold text-zinc-900">{c.score}</div>
            <div className="mt-2 text-sm text-zinc-700">{c.impact}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-zinc-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-lg md:text-xl font-semibold text-zinc-900">Get Your Free GEO Analysis in 2 Minutes</div>
          <p className="text-sm text-zinc-700 mt-1">No hard sell—just expert insights on your visibility in AI recommendations.</p>
        </div>
        <button onClick={onCTAClick} className="inline-flex items-center rounded-md bg-indigo-600 text-white px-5 py-3 font-medium hover:bg-indigo-500 transition">Start Analysis</button>
      </div>
    </section>
  );
}
