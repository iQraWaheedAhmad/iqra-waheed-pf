"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", budget: "$500 - $1k" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${form.name || "your website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nBudget: ${form.budget}\n\n${form.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10 grid gap-14 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Inquiry</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6">
            Let&apos;s build something together.
          </h2>
          <p className="text-text-secondary max-w-md mb-10">
            Currently accepting new freelance and full-time front-end opportunities.
            Reach out directly, or send a message with the form.
          </p>

          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 rounded-full border border-border-strong px-4 py-2.5 text-sm hover:border-accent-soft hover:text-accent-soft transition-colors"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {profile.email}
            </button>
          </div>

          <div className="flex items-center gap-4 mb-12">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-border-soft flex items-center justify-center hover:border-accent-soft hover:text-accent-soft transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon width={17} height={17} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-border-soft flex items-center justify-center hover:border-accent-soft hover:text-accent-soft transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon width={17} height={17} />
            </a>
          </div>

          <pre className="font-mono text-xs md:text-[13px] text-text-secondary bg-bg-elevated border border-border-soft rounded-xl p-5 overflow-x-auto">
{`const developer = {
  name: '${profile.name}',
  role: '${profile.role}',
  status: 'Available',
  stack: ['React', 'Next.js', 'Tailwind'],
  location: '${profile.location}',
};`}
          </pre>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-7 md:p-8 flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="eyebrow block mb-2">Your name</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg bg-bg-elevated-2 border border-border-soft px-4 py-3 text-sm focus:border-accent-soft outline-none"
              placeholder="Full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="eyebrow block mb-2">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg bg-bg-elevated-2 border border-border-soft px-4 py-3 text-sm focus:border-accent-soft outline-none"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="budget" className="eyebrow block mb-2">Budget range</label>
            <select
              id="budget"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="w-full rounded-lg bg-bg-elevated-2 border border-border-soft px-4 py-3 text-sm focus:border-accent-soft outline-none"
            >
              <option>$500 - $1k</option>
              <option>$1k - $5k</option>
              <option>$5k+</option>
              <option>To be discussed</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="eyebrow block mb-2">Project description</label>
            <textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg bg-bg-elevated-2 border border-border-soft px-4 py-3 text-sm focus:border-accent-soft outline-none resize-none"
              placeholder="Tell me a bit about what you're building..."
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-soft transition-colors"
          >
            Send inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
