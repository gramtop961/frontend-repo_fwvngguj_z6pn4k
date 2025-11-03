import React, { useEffect, useMemo, useState } from 'react';
import { Info, CheckCircle2, ChevronLeft, ChevronRight, X, Plus, Mail, Globe2, Building2, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const priceOptions = ['Under $50', '$50-200', '$200-1000', '$1000-5000', '$5000+'];
const industries = ['Consumer Electronics', 'SaaS', 'E-commerce', 'Services', 'B2B Tools', 'Wellness', 'Finance', 'Other'];
const marketingOptions = [
  'Heavy Reddit presence',
  'Active on YouTube',
  'Strong review sites (Amazon, Trustpilot, G2)',
  'Press coverage',
  'Influencer partnerships',
  'None/Starting out',
  'Other',
];

export default function DataCaptureForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('form'); // form | processing | waiting
  const [email, setEmail] = useState('');
  const [form, setForm] = useState({
    company_name: '',
    product_name: '',
    website_url: '',
    product_description: '',
    industry_vertical: '',
    selling_point: '',
    price_point: '',
    marketing_practices: [],
    competitors: [],
  });
  const [urlOk, setUrlOk] = useState(null);
  const [urlChecking, setUrlChecking] = useState(false);

  // URL reachability check (best-effort)
  useEffect(() => {
    const url = form.website_url.trim();
    if (!url) { setUrlOk(null); return; }
    let controller = new AbortController();
    setUrlChecking(true);
    const validFormat = /^(https?:\/\/)[\w.-]+(\.[\w.-]+)+/i.test(url);
    if (!validFormat) { setUrlOk(false); setUrlChecking(false); return; }
    fetch(url, { method: 'HEAD', mode: 'no-cors', signal: controller.signal })
      .then(() => { setUrlOk(true); })
      .catch(() => { setUrlOk(false); })
      .finally(() => setUrlChecking(false));
    return () => controller.abort();
  }, [form.website_url]);

  const canNext1 =
    form.company_name.trim().length > 1 &&
    form.product_name.trim().length > 1 &&
    /^(https?:\/\/)[\w.-]+(\.[\w.-]+)+/i.test(form.website_url.trim()) &&
    form.product_description.trim().length >= 50 &&
    form.product_description.trim().length <= 150;

  const canNext2 = form.industry_vertical && form.selling_point.trim().length >= 80 && form.selling_point.trim().length <= 200 && !!form.price_point;

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  const addCompetitor = (name) => {
    const n = name.trim();
    if (!n) return;
    if (form.competitors.includes(n)) return;
    if (form.competitors.length >= 5) return;
    setForm((f) => ({ ...f, competitors: [...f.competitors, n] }));
  };
  const removeCompetitor = (name) => setForm((f) => ({ ...f, competitors: f.competitors.filter((c) => c !== name) }));

  const handleSubmit = (e) => {
    e?.preventDefault();
    setStatus('processing');
    setTimeout(() => setStatus('waiting'), 1500);
  };

  return (
    <section id="analysis-form" className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">Free GEO Analysis</h3>
          <div className="text-sm text-zinc-500">{progress}% complete</div>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-zinc-100">
          <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {status === 'form' && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <h4 className="text-lg font-semibold text-zinc-900">Let's learn about your product</h4>
                <p className="text-sm text-zinc-600 mt-1">This helps us understand your positioning.</p>

                <div className="mt-6 space-y-6">
                  <Field label="Company Name" placeholder="e.g., Tesla, Dyson, CloudFlare" value={form.company_name} onChange={(v) => setForm({ ...form, company_name: v })} tooltip="Your company name as customers know it" icon={<Building2 size={16} />} />
                  <Field label="Product Name" placeholder="e.g., Model Y, Supersonic Hair Dryer, CDN Pro" value={form.product_name} onChange={(v) => setForm({ ...form, product_name: v })} tooltip="Specific product or service you want analyzed" icon={<Tag size={16} />} />
                  <Field label="Website URL" placeholder="https://yourcompany.com" value={form.website_url} onChange={(v) => setForm({ ...form, website_url: v })} tooltip="We'll analyze your web presence for GEO signals" icon={<Globe2 size={16} />} right={
                    <div className="flex items-center gap-2 text-xs">
                      {urlChecking && <span className="text-zinc-500">Checking…</span>}
                      {!urlChecking && urlOk === true && <span className="flex items-center text-emerald-600"><CheckCircle2 size={16} className="mr-1" /> Reachable</span>}
                      {!urlChecking && urlOk === false && <span className="text-zinc-500">Will verify during analysis</span>}
                    </div>
                  } />
                  <TextArea label="Brief Product Description" placeholder="What does your product do in one sentence?" min={50} max={150} value={form.product_description} onChange={(v) => setForm({ ...form, product_description: v })} tooltip="This helps us understand your positioning" />
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div />
                  <button type="button" disabled={!canNext1} onClick={() => setStep(2)} className={`inline-flex items-center rounded-md px-4 py-2 text-white font-medium transition ${canNext1 ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-zinc-300 cursor-not-allowed'}`}>
                    Next <ChevronRight size={18} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <h4 className="text-lg font-semibold text-zinc-900">Help us understand your market position</h4>
                <div className="mt-6 space-y-6">
                  <SelectField label="Industry Vertical" value={form.industry_vertical} onChange={(v) => setForm({ ...form, industry_vertical: v })} options={industries} tooltip="We'll benchmark against similar products in your category" />
                  <TextArea label="Product's Unique Selling Point" placeholder="e.g., First wireless charging over 50ft, AI-powered CRM with 99.9% uptime" min={80} max={200} value={form.selling_point} onChange={(v) => setForm({ ...form, selling_point: v })} tooltip="What makes you different? This is how we position you for GEO scoring" />
                  <SelectField label="Product Price Point" value={form.price_point} onChange={(v) => setForm({ ...form, price_point: v })} options={priceOptions} tooltip="Price affects recommendation patterns in LLM responses" />
                  <CheckboxGroup label="Current Marketing Practices (optional, max 3)" tooltip="We'll see which channels you're using well and which are gaps" options={marketingOptions} value={form.marketing_practices} onChange={(arr) => setForm({ ...form, marketing_practices: arr })} />
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <button type="button" onClick={() => setStep(1)} className="inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-800 hover:bg-zinc-50 transition"><ChevronLeft size={18} className="mr-1" /> Previous</button>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setStep(3)} className="text-sm text-zinc-600 hover:text-zinc-900">Skip</button>
                    <button type="button" disabled={!canNext2} onClick={() => setStep(3)} className={`inline-flex items-center rounded-md px-4 py-2 text-white font-medium transition ${canNext2 ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-zinc-300 cursor-not-allowed'}`}>Next <ChevronRight size={18} className="ml-1" /></button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <h4 className="text-lg font-semibold text-zinc-900">Who are your main competitors?</h4>
                <div className="mt-6 space-y-6">
                  <TagsInput label="Primary Target Competitors (optional)" placeholder="Type competitor names (press Enter to add, max 5)" value={form.competitors} onAdd={addCompetitor} onRemove={removeCompetitor} tooltip="We'll compare your GEO score against these. Leave blank if unknown." />

                  <div>
                    <label className="flex items-center gap-2 text-sm text-zinc-700">
                      Industry Vertical
                    </label>
                    <div className="mt-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">{form.industry_vertical || '—'}</div>
                    <p className="mt-1 text-xs text-zinc-500">We'll use this to find similar competitors if you leave the field above blank</p>
                  </div>

                  <SummaryCard form={form} onEdit={(toStep) => setStep(toStep)} />
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-800 hover:bg-zinc-50 transition"><ChevronLeft size={18} className="mr-1" /> Previous</button>
                  <button type="submit" className="inline-flex items-center rounded-md bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-500 transition">Submit Analysis</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      )}

      {status === 'processing' && (
        <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center animate-pulse">
            <div className="h-6 w-6 rounded-full bg-indigo-400" />
          </div>
          <h4 className="mt-4 text-xl font-semibold text-zinc-900">Your analysis is being generated</h4>
          <p className="mt-1 text-sm text-zinc-600">We're scanning the web for your product's LLM optimization score. This typically takes 3-5 minutes.</p>
          <div className="mt-4 text-sm text-zinc-700">
            <div>✓ Competitor benchmark</div>
            <div>✓ Social proof signals (Reddit, forums, reviews)</div>
            <div>✓ Authority mentions (press, industry sites)</div>
            <div>✓ Content gaps in AI training data</div>
          </div>
        </div>
      )}

      {status === 'waiting' && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h4 className="text-xl font-semibold text-zinc-900">While your analysis runs, see what's possible</h4>
          <div className="mt-4 grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-6">
              <div>
                <div className="text-zinc-900 font-semibold">The GEO Opportunity</div>
                <ul className="mt-2 text-sm text-zinc-700 list-disc list-inside space-y-1">
                  <li>Companies acting on GEO optimization see 3x increase in AI-recommended sales</li>
                  <li>Only 8% of your competitors are even aware GEO exists</li>
                  <li>The earlier you start, the bigger your moat</li>
                </ul>
              </div>

              <div className="rounded-lg border border-zinc-200 p-4">
                <div className="text-sm text-zinc-500">A product like yours did this</div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-sm">
                  <Badge color="red">GEO Score: 28</Badge>
                  <Badge color="red">AI Recommendation Rate: 5%</Badge>
                  <Badge color="red">Competitor Mentions: 3x higher</Badge>
                  <div className="col-span-3 text-center text-zinc-400">↓ 90 days with our strategy ↓</div>
                  <Badge color="green">GEO Score: 79</Badge>
                  <Badge color="green">AI Recommendation Rate: 47%</Badge>
                  <Badge color="green">Competitor Mentions: Now leading</Badge>
                </div>
                <button className="mt-4 inline-flex items-center rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm hover:bg-zinc-50 transition">See How They Did It</button>
              </div>

              <div>
                <div className="text-zinc-900 font-semibold">Your Results Will Show</div>
                <ul className="mt-2 text-sm text-zinc-700 list-disc list-inside space-y-1">
                  <li>Your current GEO Score (0-100)</li>
                  <li>Where you rank vs competitors</li>
                  <li>Your top 5 optimization opportunities</li>
                  <li>Specific actions to improve each metric</li>
                  <li>Estimated impact of each action</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-2 p-4 rounded-lg border border-zinc-200 bg-zinc-50">
              <div className="text-lg font-semibold text-zinc-900">Ready to take action?</div>
              <p className="text-sm text-zinc-700 mt-1">Once you see your score, we can help you improve it.</p>
              <div className="mt-4 grid gap-2">
                <button className="rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-500 transition">Schedule GEO Strategy Call (15 min)</button>
                <button className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm hover:bg-zinc-50 transition">See Pricing & Plans</button>
                <p className="text-xs text-zinc-600 mt-2">First call is free. We'll show you exactly which channels to activate first.</p>
                <p className="text-xs text-zinc-600">⏰ Most companies wait until they see their score. By then, competitors may have moved.</p>
                <p className="text-xs text-zinc-600">📧 Your report is being emailed to {email || 'your inbox'}. Check back here or your inbox in 5 minutes.</p>
              </div>

              <div className="mt-4">
                <label className="block text-sm text-zinc-700">Email address to receive your report</label>
                <div className="mt-1 flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2">
                  <Mail size={16} className="text-zinc-500" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="w-full bg-transparent text-sm outline-none" />
                </div>
                <button className="mt-2 rounded-md bg-emerald-600 text-white px-3 py-2 text-sm font-medium hover:bg-emerald-500 transition">Confirm & Wait for Results</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({ label, placeholder, value, onChange, tooltip, icon, right }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm text-zinc-700">
        {label}
        <Info size={14} className="text-zinc-400" title={tooltip} />
      </label>
      <div className="mt-1 flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2">
        {icon && <span className="text-zinc-500">{icon}</span>}
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {right}
      </div>
    </div>
  );
}

function TextArea({ label, placeholder, value, onChange, tooltip, min = 0, max = 9999 }) {
  const count = value.length;
  const valid = count >= min && count <= max;
  return (
    <div>
      <label className="flex items-center gap-2 text-sm text-zinc-700">
        {label}
        <Info size={14} className="text-zinc-400" title={tooltip} />
      </label>
      <textarea
        className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-zinc-400"
        placeholder={placeholder}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={`mt-1 text-xs ${valid ? 'text-zinc-500' : 'text-red-600'}`}>{count}/{max} {min ? `(min ${min})` : ''}</div>
    </div>
  );
}

function SelectField({ label, value, onChange, options, tooltip }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm text-zinc-700">
        {label}
        <Info size={14} className="text-zinc-400" title={tooltip} />
      </label>
      <select
        className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>Choose…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function CheckboxGroup({ label, options, value, onChange, tooltip }) {
  const toggle = (opt) => {
    const exists = value.includes(opt);
    let next = exists ? value.filter((o) => o !== opt) : [...value, opt];
    if (next.length > 3) return; // max 3
    onChange(next);
  };
  return (
    <div>
      <label className="flex items-center gap-2 text-sm text-zinc-700">
        {label}
        <Info size={14} className="text-zinc-400" title={tooltip} />
      </label>
      <div className="mt-2 grid md:grid-cols-2 gap-2">
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => toggle(opt)} className={`text-left rounded-md border px-3 py-2 text-sm transition ${value.includes(opt) ? 'border-indigo-500 bg-indigo-50 text-indigo-900' : 'border-zinc-300 bg-white hover:bg-zinc-50'}`}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

function TagsInput({ label, placeholder, value, onAdd, onRemove, tooltip }) {
  const [input, setInput] = useState('');
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAdd(input);
      setInput('');
    }
  };
  return (
    <div>
      <label className="flex items-center gap-2 text-sm text-zinc-700">
        {label}
        <Info size={14} className="text-zinc-400" title={tooltip} />
      </label>
      <div className="mt-1 rounded-md border border-zinc-300 bg-white px-2 py-2">
        <div className="flex flex-wrap gap-2">
          {value.map((v) => (
            <span key={v} className="inline-flex items-center gap-1 rounded-full bg-zinc-100 text-zinc-700 px-2 py-1 text-xs border border-zinc-200">
              {v}
              <button type="button" className="text-zinc-500 hover:text-zinc-700" onClick={() => onRemove(v)}><X size={14} /></button>
            </span>
          ))}
          <input
            className="flex-1 min-w-[160px] bg-transparent text-sm outline-none placeholder:text-zinc-400 px-2"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ form, onEdit }) {
  return (
    <div className="rounded-lg border border-zinc-200 p-4 bg-zinc-50">
      <div className="text-sm text-zinc-600">Review</div>
      <div className="mt-2 grid md:grid-cols-2 gap-4 text-sm">
        <SummaryRow label="Analyzing" value={`${form.product_name || '—'} by ${form.company_name || '—'}`} onEdit={() => onEdit(1)} />
        <SummaryRow label="Category" value={form.industry_vertical || '—'} onEdit={() => onEdit(2)} />
        <SummaryRow label="Comparing against" value={form.competitors.length ? form.competitors.join(', ') : 'Auto-detection enabled'} onEdit={() => onEdit(3)} />
        <SummaryRow label="Selling Point" value={form.selling_point || '—'} onEdit={() => onEdit(2)} />
      </div>
    </div>
  );
}

function SummaryRow({ label, value, onEdit }) {
  return (
    <div>
      <div className="text-zinc-500 text-xs">{label}</div>
      <div className="flex items-center justify-between gap-3">
        <div className="text-zinc-800">{value}</div>
        <button type="button" onClick={onEdit} className="text-xs text-indigo-600 hover:text-indigo-500">Edit</button>
      </div>
    </div>
  );
}

function Badge({ children, color }) {
  const styles =
    color === 'green'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : color === 'red'
      ? 'bg-rose-50 text-rose-800 border-rose-200'
      : 'bg-zinc-100 text-zinc-800 border-zinc-200';
  return <div className={`rounded-md border px-3 py-2 text-xs font-medium ${styles}`}>{children}</div>;
}
