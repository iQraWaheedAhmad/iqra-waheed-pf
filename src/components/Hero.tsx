"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { profile } from "@/lib/data";


// ─── component ────────────────────────────────────────────────────────────────


export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set avatar visible immediately so ctx.revert() never hides it
    gsap.set(".hero-avatar", { opacity: 1, scale: 1 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: -12, opacity: 0, duration: 0.5 })
        .from(".hero-eyebrow", { y: -8, opacity: 0, duration: 0.45 }, "-=0.2")
        .from(".hero-name", { y: 40, opacity: 0, duration: 0.85, stagger: 0.1 }, "-=0.2")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.45")
        .from(".hero-cta", { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.35")
        .from(".hero-terminal", { x: 50, opacity: 0, duration: 0.85 }, "-=0.75")
        .fromTo(
          ".hero-avatar",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55 },
          "-=0.4"
        );
    }, rootRef);

    return () => {
      ctx.revert();
      // Re-ensure avatar stays visible after revert
      gsap.set(".hero-avatar", { opacity: 1, scale: 1, clearProps: "all" });
    };
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden noise-grid"
    >
      {/* ambient glow — right side to halo the terminal */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-1/4 h-[500px] w-[600px] rounded-full blur-[140px] opacity-25"
        style={{ background: "radial-gradient(closest-side, var(--accent-glow), transparent)" }}
      />
      {/* secondary glow — left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-0 h-[400px] w-[500px] rounded-full blur-[120px] opacity-15"
        style={{ background: "radial-gradient(closest-side, var(--accent-glow), transparent)" }}
      />

      <div className="relative mx-auto max-w-6xl w-full px-6 md:px-10 pt-32 pb-24 md:pt-36 md:pb-28 flex flex-col md:flex-row md:items-center gap-14 md:gap-12 lg:gap-20">

        {/* ── Left: text content ───────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Available badge */}
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-border-soft bg-bg-elevated px-3.5 py-1.5 mb-7">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-status" />
            <span className="eyebrow !text-text-secondary">Available for new projects</span>
          </div>

          {/* Eyebrow */}
          <p className="hero-eyebrow eyebrow text-accent-soft mb-5 tracking-[0.2em]">
            Front-End Developer
          </p>

          {/* Name */}
          <h1 className="font-display font-semibold leading-[1.04] mb-7">
            <span className="hero-name block text-5xl sm:text-6xl md:text-6xl lg:text-7xl">
              {profile.name.split(" ")[0]}
            </span>
            <span className="hero-name block text-5xl sm:text-6xl md:text-6xl lg:text-7xl text-accent-soft">
              {profile.name.split(" ")[1]}
            </span>
          </h1>

          {/* Description */}
          <p className="hero-sub max-w-[420px] text-text-secondary text-base md:text-[17px] leading-relaxed mb-10">
            I build fast, responsive React &amp; Next.js interfaces — turning designs
            into clean, component-driven code that&apos;s ready to ship.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="hero-cta inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-white hover:bg-accent-soft transition-colors"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3 text-sm font-medium hover:border-accent-soft hover:text-accent-soft transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* ── Right: large circular photo + orbital tech chips ──── */}
        <div className="hero-terminal hidden md:flex relative w-full md:w-[420px] lg:w-[480px] shrink-0 items-center justify-center min-h-[420px]">

          {/* Outer decorative rings */}
          <div className="absolute h-[320px] w-[320px] lg:h-[360px] lg:w-[360px] rounded-full border border-accent/10 pointer-events-none" />
          <div className="absolute h-[390px] w-[390px] lg:h-[440px] lg:w-[440px] rounded-full border border-accent/5 pointer-events-none" />

          {/* Avatar glow backdrop */}
          <div className="absolute h-64 w-64 rounded-full blur-[70px] opacity-25 bg-gradient-to-r from-accent to-accent-soft pointer-events-none" />

          {/* Large circular avatar */}
          <div
            className="hero-avatar relative rounded-full border-2 border-accent-soft/50 bg-bg-elevated p-[3px] overflow-hidden shadow-[0_0_50px_rgba(108,99,255,0.3)] transition-all duration-500 hover:border-accent-soft hover:shadow-[0_0_70px_rgba(108,99,255,0.5)] hover:scale-[1.03] cursor-default"
            style={{ width: 260, height: 260 }}
          >
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/myself.jpeg"
                alt="Iqra"
                fill
                priority
                className="object-cover"
                style={{ objectPosition: "center 65%" }}
              />
            </div>
          </div>

          {/* React.js — top-left (10 o clock) */}
          <span className="hero-chip float-a absolute top-[8%] left-[6%] inline-flex items-center gap-2 rounded-full border border-border-soft bg-bg-elevated/95 px-4 py-2 font-mono text-xs text-accent-soft shadow-[0_0_18px_-4px_rgba(108,99,255,0.6)] backdrop-blur-sm whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[#61dafb]" />
            React.js
          </span>

          {/* TypeScript — top-right (2 o clock) */}
          <span className="hero-chip float-b absolute top-[8%] right-[4%] inline-flex items-center gap-2 rounded-full border border-accent-dim/60 bg-accent-dim/20 px-4 py-2 font-mono text-xs text-accent-soft shadow-[0_0_18px_-4px_rgba(108,99,255,0.6)] backdrop-blur-sm whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[#3178c6]" />
            TypeScript
          </span>

          {/* Next.js — right (3 o clock) */}
          <span className="hero-chip float-c absolute top-[42%] right-[-2%] -translate-y-1/2 inline-flex items-center gap-2 rounded-full border border-border-soft bg-bg-elevated/95 px-4 py-2 font-mono text-xs text-text-primary shadow-[0_0_14px_-4px_rgba(108,99,255,0.5)] backdrop-blur-sm whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-white/70" />
            Next.js
          </span>

          {/* GSAP — bottom-left (7 o clock) */}
          <span className="hero-chip float-a absolute bottom-[10%] left-[4%] inline-flex items-center gap-2 rounded-full border border-border-soft bg-bg-elevated/95 px-4 py-2 font-mono text-xs text-text-secondary shadow-[0_0_14px_-4px_rgba(108,99,255,0.5)] backdrop-blur-sm whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[#88ce02]" />
            GSAP
          </span>

          {/* Tailwind CSS — bottom-right (5 o'clock) */}
          <span className="hero-chip float-b absolute bottom-[10%] right-[4%] inline-flex items-center gap-2 rounded-full border border-border-soft bg-bg-elevated/95 px-4 py-2 font-mono text-xs text-text-secondary shadow-[0_0_14px_-4px_rgba(108,99,255,0.5)] backdrop-blur-sm whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
            Tailwind CSS
          </span>

        </div>

      </div>
    </section>
  );
}
