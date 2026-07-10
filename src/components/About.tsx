"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap } from "lucide-react";
import { aboutBio, aboutCurrentlyLearning, aboutInfo } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column
      gsap.from(".about-left > *", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".about-left", start: "top 82%" },
      });

      // Right info rows
      gsap.from(".about-info-row", {
        x: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".about-info-list", start: "top 82%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">

        {/* Two-column split */}
        <div className="grid md:grid-cols-[1fr_auto] gap-16 md:gap-24 items-start">

          {/* ── Left: bio text ────────────────────────────────────────── */}
          <div className="about-left">
            <p className="eyebrow mb-5">About</p>

            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight mb-8 max-w-xl">
              Detail-driven front-end work,{" "}
              <span className="text-accent-soft">start to finish.</span>
            </h2>

            <p className="text-text-secondary text-base md:text-[17px] leading-relaxed max-w-lg mb-10">
              {aboutBio}
            </p>

            {/* Currently learning pill */}
            <div className="inline-flex items-start gap-3 rounded-2xl border border-accent-dim/50 bg-accent-dim/10 px-5 py-4 max-w-md">
              <span className="mt-0.5 shrink-0">
                <Zap size={15} className="text-accent-soft" />
              </span>
              <div>
                <p className="eyebrow text-accent-soft mb-1">Currently learning</p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {aboutCurrentlyLearning}
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: info list ──────────────────────────────────────── */}
          <div className="about-info-list w-full md:w-[280px] lg:w-[320px] shrink-0">

            {/* Thin top accent line */}
            <div className="h-px bg-gradient-to-r from-accent/60 to-transparent mb-1" />

            {aboutInfo.map((item, i) => (
              <div
                key={item.label}
                className={`about-info-row flex items-baseline justify-between gap-6 py-4 ${
                  i < aboutInfo.length - 1 ? "border-b border-[#262838]" : ""
                }`}
              >
                <span className="eyebrow !text-text-tertiary shrink-0">{item.label}</span>
                <span
                  className={`text-sm font-medium text-right ${
                    item.label === "Availability"
                      ? "text-status"
                      : "text-text-primary"
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}

            {/* Thin bottom line */}
            <div className="h-px bg-gradient-to-r from-accent/60 to-transparent mt-1" />
          </div>

        </div>
      </div>
    </section>
  );
}
