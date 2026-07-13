"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", budget: "$500 - $1k" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
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
              className="flex items-center gap-2 rounded-full border border-border-strong px-4 py-2.5 text-sm hover:border-accent-soft hover:text-accent-soft transition-colors cursor-pointer"
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

        {status === "success" ? (
          <div className="glass-card rounded-2xl p-7 md:p-8 flex flex-col items-center justify-center text-center min-h-[420px] transition-all duration-300">
            <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
              <Check size={28} />
            </div>
            <h3 className="font-display text-2xl font-semibold mb-3 text-text-primary">
              Message Sent!
            </h3>
            <p className="text-text-secondary max-w-sm text-sm mb-8 leading-relaxed">
              Thank you, <strong className="text-text-primary">{form.name}</strong>. Your inquiry has been stored and emailed directly to me. I will get back to you shortly!
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setForm({ name: "", email: "", message: "", budget: "$500 - $1k" });
              }}
              className="rounded-full border border-border-strong px-6 py-2.5 text-sm hover:border-accent-soft hover:text-accent-soft transition-colors cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-7 md:p-8 flex flex-col gap-5">
            {status === "error" && (
              <div className="rounded-lg bg-red-950/20 border border-red-500/30 p-4 text-xs text-red-400">
                {errorMessage}
              </div>
            )}
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
              disabled={status === "loading"}
              className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending inquiry...
                </>
              ) : (
                "Send inquiry"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
