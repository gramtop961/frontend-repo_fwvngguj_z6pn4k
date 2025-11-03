import React from 'react';
import { Eye, Rocket, BarChart3 } from 'lucide-react';

const items = [
  {
    icon: Eye,
    title: 'See Invisible Gaps',
    text: "Discover where you're missing from LLM recommendations",
  },
  {
    icon: Rocket,
    title: 'Exploit the Niche',
    text: "90% of competitors aren't doing GEO optimization yet",
  },
  {
    icon: BarChart3,
    title: 'Compound Growth',
    text: 'Early movers capture 3x more AI-powered referrals',
  },
];

export default function ValueProps() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center">
              <Icon size={20} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">{title}</h3>
            <p className="mt-2 text-zinc-600 text-sm">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
