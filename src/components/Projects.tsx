"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink, X, Layers, Shield, Route, Image as ImageIcon, Radio, GraduationCap, Code } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const VISIBLE_COUNT = 3;

/* ─── Responsive Tag Icon Mapping ───────────────────────── */
const tagIconMap: Record<
  string,
  string | React.ComponentType<{ size?: number; className?: string }>
> = {
  "Next.js":      "/techs/nextjs.svg",
  "React.js":     "/techs/react.svg",
  "TypeScript":   "/techs/ts.svg",
  "Tailwind CSS": "/techs/tailwind.svg",
  "Vercel":       "/techs/vercel.svg",
  "Shadcn UI":    "/techs/shadcn.svg",
  "JavaScript":   "/techs/js.svg",
  "GSAP":         "/techs/gsap.svg",
  "Node.js":      "/techs/node.svg",
  "Vite":         "/techs/vite.svg",
  "WordPress":    "/techs/wordpress.svg",
  "Auth":         Shield,
  "Routing":      Route,
  "Cloudinary":   ImageIcon,
  "CDN":          Radio,
  "React Icons":  Code,
  "Final Year Project": GraduationCap,
};

function TagIcon({ tag }: { tag: string }) {
  const icon = tagIconMap[tag];
  if (!icon) {
    return <Code size={12} className="text-white/60" />;
  }
  if (typeof icon === "string") {
    return (
      <Image
        src={icon}
        alt=""
        width={12}
        height={12}
        className="w-3.5 h-3.5 object-contain opacity-80"
      />
    );
  }
  const IconComponent = icon;
  return <IconComponent size={12} className="text-white/80" />;
}

function ProjectTag({ tag }: { tag: string }) {
  return (
    <span
      title={tag}
      className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-mono font-medium p-1.5 md:px-2.5 md:py-1 rounded-full border border-white/10 bg-white/5 text-white/80 hover:border-white/20 transition-all duration-200"
    >
      <TagIcon tag={tag} />
      <span className="hidden md:inline">{tag}</span>
    </span>
  );
}

/* ─── Project row (used in main list) ───────────────────── */
function ProjectRow({
  project,
  showDivider,
}: {
  project: (typeof projects)[0];
  showDivider: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={rowRef}
      className={`project-row group relative grid md:grid-cols-12 gap-6 md:gap-8 py-10 items-start cursor-pointer${showDivider ? " border-b border-border-soft" : ""}`}
      onMouseMove={handleMouseMove}
    >
      {/* Hover image preview */}
      {project.image && hovered && (
        <div
          className="pointer-events-none absolute z-50 w-[220px] h-[140px] rounded-xl overflow-hidden border border-accent/30 shadow-[0_8px_32px_rgba(108,99,255,0.35)] transition-all duration-150"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 70,
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* Index */}
      <span className="md:col-span-1 font-mono text-sm text-text-tertiary pt-1">
        {project.index}
      </span>

      {/* Title + description + tags */}
      <div className="md:col-span-7">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="inline-block w-full"
        >
          <h3 className="font-display text-xl md:text-2xl font-medium group-hover:text-accent-soft transition-colors duration-200">
            {project.title}
          </h3>
          <p className="mt-2 text-text-secondary text-sm md:text-[15px] max-w-xl leading-relaxed">
            {project.description}
          </p>
        </div>
        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <ProjectTag key={tag} tag={tag} />
          ))}
        </div>
      </div>

      {/* Year */}
      <div className="md:col-span-2 flex items-center justify-start md:justify-end">
        <span className="eyebrow text-text-tertiary">{project.year}</span>
      </div>

      {/* Links */}
      <div className="md:col-span-2 flex items-center gap-3 justify-start md:justify-end">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            onClick={(e) => e.stopPropagation()}
            className="text-text-tertiary hover:text-white transition-colors duration-200"
          >
            <GithubIcon width={17} height={17} />
          </a>
        )}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View live site"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-text-tertiary group-hover:text-accent-soft transition-colors duration-200"
          >
            <ArrowUpRight
              size={20}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        ) : (
          <ArrowUpRight
            size={20}
            className="text-text-tertiary group-hover:text-accent-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          />
        )}
      </div>
    </div>
  );
}

/* ─── Modal card (used in popup) ────────────────────────── */
function ModalProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border-soft bg-bg-elevated overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.15)]">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-bg shrink-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Layers size={32} className="text-text-tertiary" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated/80 via-transparent to-transparent" />
        {/* Year badge */}
        <span className="absolute top-3 left-3 font-mono text-[11px] text-text-tertiary bg-bg/80 backdrop-blur-sm border border-border-soft rounded-full px-2.5 py-0.5">
          {project.year}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-lg font-medium text-text-primary mb-2 group-hover:text-accent-soft transition-colors">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <ProjectTag key={tag} tag={tag} />
          ))}
        </div>

        {/* Links */}
        <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border-soft">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft hover:text-white transition-colors"
            >
              <ExternalLink size={13} />
              Live site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-white transition-colors"
            >
              <GithubIcon width={13} height={13} />
              GitHub
            </a>
          )}
          {!project.liveUrl && !project.githubUrl && (
            <span className="text-xs text-text-tertiary">Links coming soon</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
        gsap.from(row, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Scroll-lock */
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const visibleProjects = projects.slice(0, VISIBLE_COUNT);

  return (
    <section id="work" ref={sectionRef} className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-4">Selected work</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold">
              Projects I&apos;ve shipped.
            </h2>
          </div>
        </div>

        {/* Project rows — first 3 */}
        <div className="flex flex-col">
          {visibleProjects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              showDivider={i < visibleProjects.length - 1}
            />
          ))}
        </div>

        {/* Show all button */}
        {projects.length > VISIBLE_COUNT && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex items-center gap-2.5 rounded-full border border-border-strong px-8 py-3.5 text-sm font-medium hover:border-accent-soft hover:text-accent-soft transition-all duration-300 hover:shadow-[0_0_20px_rgba(108,99,255,0.2)]"
            >
              <Layers size={15} />
              Show all projects
              <span className="ml-0.5 font-mono text-xs text-text-tertiary group-hover:text-accent-soft/70 transition-colors">
                ({projects.length})
              </span>
            </button>
          </div>
        )}
      </div>

      {/* ── All Projects Modal ─────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
          onClick={() => setModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" />

          {/* Modal panel */}
          <div
            className="relative z-10 w-full max-w-5xl mx-4 my-6 sm:my-12 rounded-3xl border border-border-strong bg-bg shadow-[0_32px_80px_rgba(0,0,0,0.7)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 md:py-6 border-b border-border-soft">
              <div>
                <p className="eyebrow mb-1">All work</p>
                <h3 className="font-display text-2xl font-semibold">
                  All Projects
                  <span className="ml-2 font-mono text-base text-text-tertiary font-normal">
                    ({projects.length})
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="flex items-center justify-center h-10 w-10 rounded-full border border-border-soft bg-bg-elevated hover:border-accent/40 hover:text-accent-soft transition-all duration-200"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Project grid */}
            <div className="p-6 md:p-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[75vh] overflow-y-auto">
              {projects.map((project) => (
                <ModalProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
