"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((item) => {
        gsap.from(item, {
          x: -24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
      });

      gsap.from(".exp-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".exp-line", start: "top 80%", end: "bottom 60%", scrub: 0.6 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="eyebrow mb-4">Experience</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-16 max-w-2xl">
          Where the work has happened.
        </h2>

        <div className="relative pl-8 md:pl-10">
          <span className="exp-line absolute left-[3px] md:left-[5px] top-1 bottom-1 w-px bg-border-strong" />

          <div className="flex flex-col gap-14">
            {experience.map((item) => (
              <div key={item.role + item.period} className="exp-item relative">
                <span className="absolute -left-8 md:-left-10 top-1.5 h-2.5 w-2.5 rounded-full bg-accent-soft shadow-[0_0_0_4px_var(--accent-glow)]" />
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                  <h3 className="font-display text-xl md:text-2xl font-medium">
                    {item.role}
                  </h3>
                  <span className="eyebrow">{item.period}</span>
                </div>
                <p className="text-text-secondary text-sm mb-4">{item.org}</p>
                <ul className="space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm md:text-[15px] text-text-secondary leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-text-tertiary"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
