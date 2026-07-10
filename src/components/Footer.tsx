"use client";

import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/lib/data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-bg/40 pt-8 pb-10 overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-accent-glow/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 md:px-10 flex flex-col items-center text-center gap-8 relative z-10">
        
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          className="font-display text-lg tracking-widest text-text-primary hover:text-accent-soft transition-colors font-bold uppercase"
        >
          IQRA<span className="text-accent">.</span>WAHEED
        </a>

        {/* Tagline / Subtitle */}
        <p className="text-sm text-text-secondary max-w-md leading-relaxed font-body">
          Available for freelance &amp; full-time front-end roles. Let&apos;s build something exceptional.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="h-10 w-10 rounded-full border border-border-soft flex items-center justify-center text-text-tertiary hover:border-accent-soft hover:text-accent-soft hover:bg-bg-elevated transition-all"
          >
            <LinkedinIcon width={16} height={16} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="h-10 w-10 rounded-full border border-border-soft flex items-center justify-center text-text-tertiary hover:border-accent-soft hover:text-accent-soft hover:bg-bg-elevated transition-all"
          >
            <GithubIcon width={16} height={16} />
          </a>
        </div>

        {/* Bottom bar with copyright and back-to-top */}
        <div className="w-full pt-8 border-t border-border-soft flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <p className="font-display text-xs text-text-tertiary">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-accent-soft transition-colors"
            aria-label="Scroll back to top"
          >
            Back to top
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>

      </div>
    </footer>
  );
}
