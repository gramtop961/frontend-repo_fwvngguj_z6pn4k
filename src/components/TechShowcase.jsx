import React from 'react';
import { motion } from 'framer-motion';

export default function TechShowcase() {
  return (
    <section id="tech" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5">
          <h3 className="text-lg font-medium text-white">Development visibility</h3>
          <p className="mt-2 text-sm text-zinc-300">Live traces, token histograms, and regression dashboards expose exactly where GEO wins and where to iterate next.</p>
          <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
            <CodeBlock />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }} className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-medium text-white">Impact at a glance</h3>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Metric label="Latency" value="-41%" trend="down" />
            <Metric label="Cost" value="-32%" trend="down" />
            <Metric label="Accuracy" value="-0.6%" trend="flat" />
            <Metric label="Cache hit" value="68%" trend="up" />
            <Metric label="Context" value="-47%" trend="down" />
            <Metric label="Throughput" value="+2.1x" trend="up" />
          </div>
          <div className="mt-6 text-xs text-zinc-400">Metrics shown are representative; project-specific results vary with traffic patterns.</div>
        </motion.div>
      </div>
    </section>
  );
}

function CodeBlock() {
  const code = `// GEO routing example
const route = createRoute({
  model: 'gpt-4o-mini',
  cache: true,
  compress: 'semantic',
  pruneContext: 0.45,
  evals: ['helpfulness', 'consistency']
});

const result = await route.call({
  prompt, // tokens reduced 38%
  functions, // trimmed to top-3
});

log.trace(result.tokens); // histogram + drift guard
`;
  return (
    <pre className="text-[12px] leading-relaxed text-zinc-200 p-4 bg-zinc-900">
      <code>{code}</code>
    </pre>
  );
}

function Metric({ label, value, trend }) {
  const color = trend === 'down' ? 'text-emerald-400' : trend === 'up' ? 'text-cyan-400' : 'text-zinc-300';
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-900 p-4">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className={`mt-1 text-xl font-semibold ${color}`}>{value}</div>
    </div>
  );
}
