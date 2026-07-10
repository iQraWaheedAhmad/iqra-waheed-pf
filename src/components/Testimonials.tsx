"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/data";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-header", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".testimonial-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".testimonial-card", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.2,
      onComplete: () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
        );
      },
    });
  };

  const handleNext = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.2,
      onComplete: () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
        );
      },
    });
  };

  const item = testimonials[activeIndex];

  return (
    <section id="testimonial" ref={sectionRef} className="relative py-14 md:py-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-glow/15 rounded-full blur-[120px] pointer-events-none opacity-40" />

      <div className="mx-auto max-w-4xl px-6 md:px-10 relative z-10">
        <div className="testimonial-header text-center mb-12 md:mb-16">
          <p className="eyebrow mb-4">Client Feedback</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold">
            What others say.
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="testimonial-card relative">
          <div
            ref={cardRef}
            className="glass-card rounded-3xl p-8 md:p-12 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.4)] border border-border-soft flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden"
          >
            {/* Top-right decorative quote icon */}
            <Quote className="absolute right-8 top-8 w-16 h-16 text-border-soft opacity-30 pointer-events-none" />

            {/* Avatar / Initials section */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-accent/40 via-accent-soft/20 to-border-strong border border-border-soft flex items-center justify-center text-text-primary text-xl md:text-2xl font-display font-semibold shadow-inner relative">
                <span className="relative z-10">{item.initials}</span>
                <span className="absolute inset-0 bg-accent/5 rounded-2xl blur-sm" />
              </div>
            </div>

            {/* Content section */}
            <div className="flex-grow space-y-4">
              {/* Rating stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-accent-soft text-accent-soft" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <p className="text-base md:text-lg leading-relaxed text-text-primary font-body">
                &ldquo;{item.content}&rdquo;
              </p>

              {/* Client Info */}
              <div>
                <h4 className="font-display text-base font-semibold text-text-primary">
                  {item.name}
                </h4>
                <p className="text-xs font-mono text-text-tertiary">
                  {item.role} &bull; {item.company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index === activeIndex) return;
                    const direction = index > activeIndex ? -20 : 20;
                    gsap.to(cardRef.current, {
                      opacity: 0,
                      x: direction,
                      duration: 0.2,
                      onComplete: () => {
                        setActiveIndex(index);
                        gsap.fromTo(
                          cardRef.current,
                          { opacity: 0, x: -direction },
                          { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
                        );
                      },
                    });
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-accent-soft w-6"
                      : "bg-border-strong hover:bg-text-tertiary"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-border-soft flex items-center justify-center text-text-secondary hover:border-accent-soft hover:text-accent-soft hover:bg-bg-elevated transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-border-soft flex items-center justify-center text-text-secondary hover:border-accent-soft hover:text-accent-soft hover:bg-bg-elevated transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
