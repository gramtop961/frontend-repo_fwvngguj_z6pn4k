import React, { useState } from 'react';
import { Mail, Building2, User } from 'lucide-react';

export default function DataCaptureForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', usecase: '' });
  const [status, setStatus] = useState('idle');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // Simple front-end validation
    if (!form.name || !form.email || !form.company) return setStatus('error');
    setStatus('success');
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Request private beta access</h3>
          <p className="mt-3 text-zinc-300 max-w-xl">Tell us a little about your traffic and goals. We’ll follow up with sizing guidance and a GEO impact estimate for your workload.</p>
          <ul className="mt-6 text-sm text-zinc-300 list-disc list-inside space-y-1">
            <li>Best for teams with >5M monthly tokens</li>
            <li>Supports multi-model + function calling</li>
            <li>HIPAA-ready and SOC2 in progress</li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="grid grid-cols-1 gap-4">
            <Field label="Name" name="name" value={form.name} onChange={onChange} icon={<User size={16} className="text-zinc-400" />} placeholder="Alex Rivera" />
            <Field label="Work email" name="email" type="email" value={form.email} onChange={onChange} icon={<Mail size={16} className="text-zinc-400" />} placeholder="alex@company.com" />
            <Field label="Company" name="company" value={form.company} onChange={onChange} icon={<Building2 size={16} className="text-zinc-400" />} placeholder="Acme AI" />

            <div>
              <label className="block text-sm mb-1 text-zinc-300">Primary use case</label>
              <textarea name="usecase" value={form.usecase} onChange={onChange} placeholder="Support assistant, code-gen, RAG search, etc." className="w-full rounded-md bg-zinc-900/80 border border-white/10 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" rows={4} />
            </div>

            {status === 'error' && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 text-red-400 text-sm px-3 py-2">Please fill in name, email, and company.</div>
            )}
            {status === 'success' && (
              <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm px-3 py-2">Thanks! We’ll reach out shortly with next steps.</div>
            )}

            <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-md bg-cyan-500 text-zinc-950 font-medium px-5 py-3 hover:bg-cyan-400 transition">
              Request Invite
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, placeholder, type = 'text', icon }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-zinc-300">{label}</label>
      <div className="flex items-center gap-2 rounded-md bg-zinc-900/80 border border-white/10 px-3 py-2">
        {icon}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
