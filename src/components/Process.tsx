"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-card", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: ".process-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="eyebrow mb-4">The Methodology</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-16 max-w-xl">
          Predictable, from kickoff to launch.
        </h2>

        <div className="process-grid grid gap-5 md:grid-cols-3">
          {process.map((step) => (
            <div
              key={step.index}
              className="process-card glass-card rounded-2xl p-8 flex flex-col"
            >
              <span className="font-display text-4xl text-accent-soft/70 mb-6">
                {step.index}
              </span>
              <h3 className="font-display text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
