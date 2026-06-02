export const SITE = {
  name: "Aditya Cyber",
  shortName: "Aditya",
  domain: "adityacyber.in",
  url: "https://adityacyber.in",
  tagline: "Building My Future in Cybersecurity",
  description:
    "Student, builder, and learner. Aditya is documenting a long-term journey in cybersecurity, AI, and technology — projects, notes, and progress, all in public.",
  email: "adityacybersecurity@gmail.com",
  linkedin: "https://www.linkedin.com/in/adityacyber",
  github: "https://github.com/minimooncode",
  twitter: "https://twitter.com/0adity4",
} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/learning", label: "Learning" },
  { to: "/blog", label: "Blog" },
  { to: "/tools", label: "Tools" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/contact", label: "Contact" },
] as const;

export const SECONDARY_NAV = [
  { to: "/now", label: "Now" },
  { to: "/build-in-public", label: "Build in Public" },
  { to: "/career", label: "Career" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/dashboard", label: "Dashboard" },
] as const;
