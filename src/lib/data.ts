export const profile = {
  name: "Iqra Waheed",
  role: "Front-End Developer",
  location: "Lahore, Pakistan",
  email: "iqrawaheed213823bs@gmail.com",
  phone: "+92 308 4863379",
  linkedin: "https://www.linkedin.com/in/iqra-waheed-ahmad-4aa050280/",
  github: "https://github.com/iQraWaheedAhmad",
  portfolio: "#",
};

export type TechItem = {
  name: string;
  role: string;
  icon?: string; // path relative to /public
};

export const techStack: TechItem[] = [
  { name: "React.js",     role: "Library",    icon: "/techs/react.svg" },
  { name: "Next.js",      role: "Framework",  icon: "/techs/nextjs.svg" },
  { name: "TypeScript",   role: "Language",   icon: "/techs/ts.svg" },
  { name: "JavaScript",   role: "ES6+",       icon: "/techs/js.svg" },
  { name: "Tailwind CSS", role: "Styling",    icon: "/techs/tailwind.svg" },
  { name: "Shadcn UI",    role: "Components", icon: "/techs/shadcn.svg" },
  { name: "GSAP",         role: "Animation",  icon: "/techs/gsap.svg" },
  { name: "Node.js",      role: "Runtime",    icon: "/techs/node.svg" },
  { name: "Vercel",       role: "Deploy",     icon: "/techs/vercel.svg" },
  { name: "Vite",         role: "Build Tool", icon: "/techs/vite.svg" },
  { name: "WordPress",    role: "CMS",       icon: "/techs/wordpress.svg" },
];


export type Project = {
  id: string;
  index: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;      // path relative to /public
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "ayesha-organic",
    index: "01",
    year: "2025",
    title: "Ayesha Organic Hair Growth",
    description:
      "A clean, conversion-focused e-commerce landing page for a natural hair-growth brand — built with Next.js and Tailwind CSS. Features a product showcase, smooth scroll sections, and a mobile-first responsive layout.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    image: "/projects/ayesha-organic-web.PNG",
    liveUrl: "https://ayesha-organic-hair-growth.vercel.app/",
    githubUrl: "https://github.com/iQraWaheedAhmad/ayesha-organic-hair-growth",
  },
  {
    id: "ecommerce-platform",
    index: "02",
    year: "2023",
    title: "E-Commerce Platform",
    description:
      "A full-featured storefront built with Next.js and Shadcn UI — dynamic and nested routing, protected routes with authentication, a product catalogue, cart, and a secure checkout flow.",
    tags: ["Next.js", "Shadcn UI", "Auth", "Routing"],
    image: "/projects/ayesha-organic-web.PNG",
  },
  {
    id: "photo-gallery",
    index: "03",
    year: "2024",
    title: "Photo Gallery Website",
    description:
      "A dynamic photo gallery powered by Cloudinary for cloud-based upload and storage, with optimised CDN delivery and a clean, icon-driven interface for fast browsing.",
    tags: ["React.js", "Cloudinary", "CDN", "React Icons"],
    image: "/projects/ayesha-organic-web.PNG",
  },
  {
    id: "housing-society",
    index: "04",
    year: "2024",
    title: "Housing Society Management System",
    description:
      "A comprehensive management system built as a BS IT final-year project — covering resident records, billing, and admin workflows with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind CSS", "Final Year Project"],
    image: "/projects/ayesha-organic-web.PNG",
  },
  {
    id: "personal-portfolio-v1",
    index: "05",
    year: "2023",
    title: "Personal Portfolio (v1)",
    description:
      "An earlier fully responsive portfolio built with React.js and Tailwind CSS to showcase background, skills, and project work with mobile-first layouts.",
    tags: ["React.js", "Tailwind CSS", "React Icons"],
    image: "/projects/ayesha-organic-web.PNG",
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Front-End Developer",
    org: "Al Akhizr Tech (Pvt) Ltd — Lahore, Pakistan",
    period: "2022 — Present",
    points: [
      "Developed and maintained responsive web pages using React.js and Tailwind CSS.",
      "Collaborated closely with the design team to translate UI/UX wireframes into pixel-perfect components.",
      "Improved page-load performance by optimising assets and refactoring legacy code.",
    ],
  },
  {
    role: "Freelance Web Developer",
    org: "Self-Employed — Remote, Lahore",
    period: "2021 — Present",
    points: [
      "Designed and delivered custom websites using React.js, Bootstrap, and WordPress.",
      "Managed full project lifecycle, from requirement gathering to deployment and handover.",
      "Maintained ongoing client relationships with regular updates and post-launch support.",
    ],
  },
  {
    role: "Web Development Intern",
    org: "Al Akhizr Tech (Pvt) Ltd — Lahore, Pakistan",
    period: "2021 — 2022",
    points: [
      "Assisted in building and updating client websites using HTML, CSS, and JavaScript.",
      "Worked with Next.js to implement server-side rendering for improved SEO performance.",
      "Participated in code reviews and daily stand-ups in an Agile environment.",
    ],
  },
];

export const process = [
  {
    index: "01",
    title: "Understand",
    description:
      "Reviewing designs, content, and goals up front — mapping every screen and state before a single component gets built.",
  },
  {
    index: "02",
    title: "Build",
    description:
      "Turning wireframes into clean, reusable components with React and Tailwind — typed, responsive, and accessible from the start.",
  },
  {
    index: "03",
    title: "Polish & Ship",
    description:
      "Optimising assets and load performance, testing across devices, then deploying and staying on for post-launch support.",
  },
];

export type TestimonialItem = {
  name: string;
  role: string;
  company: string;
  content: string;
  initials: string;
};

export const testimonials: TestimonialItem[] = [
  {
    name: "Sarah Jenkins",
    role: "Product Manager",
    company: "TechSphere",
    content: "Iqra is an exceptionally talented frontend developer. She converted our complex Figma designs into high-performance, pixel-perfect React components ahead of schedule. A pleasure to work with!",
    initials: "SJ",
  },
  {
    name: "Alex Mercer",
    role: "Founder",
    company: "ByteStart",
    content: "Working with Iqra on our SaaS portal was seamless. Her expertise in Next.js and Tailwind CSS helped us achieve a 40% speed improvement. Highly recommend her freelance services!",
    initials: "AM",
  },
  {
    name: "Haris Munir",
    role: "Lead Architect",
    company: "Al Akhizr Tech",
    content: "During her time with us, Iqra proved to be a highly competent and proactive developer. She writes clean, maintainable TypeScript and has a great eye for UI polish.",
    initials: "HM",
  },
];
