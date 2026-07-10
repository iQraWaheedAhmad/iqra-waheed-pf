import { Layers, MapPin, Sparkles, type LucideIcon } from "lucide-react";

// ─── legacy cards (kept in content, not rendered in UI anymore) ───────────────

export type AboutCard = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const aboutCards: AboutCard[] = [
  {
    icon: Layers,
    title: "My Approach",
    body: "I break every design into components before I touch a single line of code — that's what keeps the final build consistent, reusable, and easy to hand off.",
  },
  {
    icon: MapPin,
    title: "Based in Lahore",
    body: "Working from Lahore, Pakistan, with agency and freelance clients — comfortable managing a project end-to-end, from the first wireframe to launch day.",
  },
  {
    icon: Sparkles,
    title: "Currently Sharpening",
    body: "Deepening my TypeScript and animation work with GSAP, so interfaces don't just function well — they feel considered, too.",
  },
];

// ─── split-layout bio content ─────────────────────────────────────────────────

export const aboutBio =
  "I'm a Front-End Developer from Lahore who genuinely loves the space between design and code. " +
  "I build component-driven interfaces with React and Next.js — clean, typed, and responsive from day one. " +
  "Whether it's a freelance project or a full product, I care about every pixel and every prop.";

export const aboutCurrentlyLearning =
  "Deepening GSAP animations & advanced TypeScript patterns.";

// ─── info list items ──────────────────────────────────────────────────────────

export type AboutInfoItem = {
  label: string;
  value: string;
};

export const aboutInfo: AboutInfoItem[] = [
  { label: "Location",     value: "Lahore, Pakistan" },
  { label: "Experience",   value: "4+ Years" },
  { label: "Education",    value: "BS Information Technology" },
  { label: "Availability", value: "Open to work ✓" },
  { label: "Languages",    value: "Urdu · English" },
];
