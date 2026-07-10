import Image from "next/image";
import { techStack } from "@/lib/data";

export default function TechMarquee() {
  // Double the array so the seamless loop works
  const doubled = [...techStack, ...techStack];

  return (
    <section id="stack" className="relative py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-6 md:px-10 mb-10">
        <p className="eyebrow">Built with</p>
        <h2 className="font-display text-2xl md:text-3xl font-semibold mt-3">
          The stack behind the interface.
        </h2>
      </div>

      {/* Fade edges */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track">
          {doubled.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="group flex items-center gap-3 shrink-0 mx-3 rounded-xl border border-border-soft bg-bg-elevated px-5 py-4 cursor-default select-none"
            >
              {/* Icon — grayscale by default, full color on group hover */}
              {tech.icon && (
                <div className="relative h-[22px] w-[22px] shrink-0">
                  <Image
                    src={tech.icon}
                    alt={`${tech.name} logo`}
                    fill
                    sizes="22px"
                    className="object-contain grayscale brightness-[0.65] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
              )}

              {/* Name */}
              <span className="font-display text-sm md:text-base text-text-primary">
                {tech.name}
              </span>

              {/* Role label */}
              <span className="eyebrow !text-text-tertiary">{tech.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
