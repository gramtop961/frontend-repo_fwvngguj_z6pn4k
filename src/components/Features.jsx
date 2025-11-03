import React from 'react';
import { Database, Globe, Shield, LineChart } from 'lucide-react';

const features = [
  {
    icon: LineChart,
    title: 'Observability for tokens',
    desc: 'Trace prompts, responses, and function-calls. Identify waste across chains and sessions with precision.'
  },
  {
    icon: Database,
    title: 'GEO playbook',
    desc: 'Compression, routing, caching, and context pruning applied automatically to your highest-ROI paths.'
  },
  {
    icon: Shield,
    title: 'Quality preserved',
    desc: 'Guardrails and live evals ensure improvements hold accuracy, helpfulness, and safety thresholds.'
  },
  {
    icon: Globe,
    title: 'FOMO-worthy advantage',
    desc: 'Teams adopting GEO early see structural cost wins and faster iteration cycles across markets.'
  }
];

export default function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-4 py-20">
      <div className="mb-10">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Where GEO compounds</h2>
        <p className="mt-3 text-zinc-300 max-w-2xl">We analyze your LLM traffic, find the highest-leverage bottlenecks, and deploy optimization patterns that pay back immediately.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <article key={f.title} className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5 hover:border-cyan-500/40 transition">
            <div className="h-10 w-10 rounded-md bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <f.icon size={18} />
            </div>
            <h3 className="text-lg font-medium text-white">{f.title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{f.desc}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <DataCard label="Traffic analyzed" value="2.6B tokens" />
        <DataCard label="Net cost saved" value="$3.4M" />
        <DataCard label="Median time-to-impact" value="9 days" />
      </div>
    </section>
  );
}

function DataCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-sm text-zinc-400">{label}</div>
    </div>
  );
}
