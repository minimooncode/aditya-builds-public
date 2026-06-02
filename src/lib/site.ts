export const SITE = {
  name: "Aditya Cyber",
  shortName: "Aditya",
  domain: "adityacyber.in",
  url: "", // relative — set once a project URL/custom domain is wired
  tagline: "Building My Future in Cybersecurity",
  description:
    "Student, builder, and learner. Aditya is documenting a long-term journey in cybersecurity, AI, and technology — projects, notes, and progress, all in public.",
  email: "hello@adityacyber.in",
  linkedin: "https://www.linkedin.com/in/adityacyber",
  github: "https://github.com/adityacyber",
  twitter: "https://twitter.com/adityacyber",
} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/learning", label: "Learning" },
  { to: "/blog", label: "Blog" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/contact", label: "Contact" },
] as const;
