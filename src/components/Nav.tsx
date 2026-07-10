"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { navLinks } from "@/lib/content";
import ScrollProgress from "@/components/ScrollProgress";

// ─── hooks ────────────────────────────────────────────────────────────────────

function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [ids]);

  return active;
}

// ─── component ────────────────────────────────────────────────────────────────

const sectionIds = navLinks.map((l) => l.href);

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // GSAP entrance on mount
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  // Animate mobile drawer links
  useEffect(() => {
    if (!drawerRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(
        drawerRef.current.querySelectorAll(".drawer-link"),
        { x: -16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: "power2.out" }
      );
    }
  }, [mobileOpen]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Scroll progress bar — sits above everything */}
      <ScrollProgress />

      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-floating" : "nav-transparent"
        }`}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "mx-auto mt-3 max-w-2xl px-2"
              : "mx-auto max-w-6xl px-6 md:px-10"
          }`}
        >
          <nav
            className={`flex items-center justify-between transition-all duration-500 border ${
              scrolled
                ? "nav-pill h-13 rounded-full border-border-strong/60 bg-bg/80 px-5 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(108,99,255,0.18)]"
                : "h-16 border-transparent"
            }`}
          >
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                closeMobile();
              }}
              className="font-display text-sm tracking-wide text-text-primary hover:text-accent-soft transition-colors shrink-0"
            >
              IQRA<span className="text-accent">.</span>WAHEED
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-colors duration-200 ${
                        isActive
                          ? "text-accent-soft"
                          : "text-text-tertiary hover:text-text-primary"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <a
              href="#contact"
              className={`hidden md:inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 shrink-0 ${
                scrolled
                  ? "border-accent/60 text-accent-soft hover:bg-accent/10"
                  : "border-border-strong text-text-primary hover:border-accent-soft hover:text-accent-soft"
              }`}
            >
              Work with me
            </a>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 -mr-1 text-text-primary transition-colors hover:text-accent-soft"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>

        {/* Mobile drawer backdrop */}
        {mobileOpen && (
          <div
            className="md:hidden fixed inset-0 top-0 z-[-1] bg-bg/60 backdrop-blur-sm"
            onClick={closeMobile}
            aria-hidden
          />
        )}

        {/* Mobile drawer */}
        <div
          ref={drawerRef}
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-400 ease-in-out ${
            mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-4 mt-2 mb-4 rounded-2xl border border-border-strong/60 bg-bg/90 backdrop-blur-xl px-6 py-6 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.6)]">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className={`drawer-link flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-accent-soft bg-accent/8"
                          : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 pt-5 border-t border-[#262838]">
              <a
                href="#contact"
                onClick={closeMobile}
                className="drawer-link flex items-center justify-center w-full rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-soft transition-colors"
              >
                Work with me
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
