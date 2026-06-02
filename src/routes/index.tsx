import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useQuery, queryOptions } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Linkedin,
  Github,
  Mail,
  ExternalLink,
  BookOpen,
  Sparkles,
  Shield,
  Terminal,
  Network,
  Code2,
  Brain,
  Cloud,
  User,
  Target,
  Rocket,
  Trophy,
  Lightbulb,
  Wrench,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { fetchProjects, fetchBlogPosts, fetchLearningTracks } from "@/lib/queries";
import { SITE } from "@/lib/site";
import { coverFor } from "@/lib/covers";
import { getLinkedInProfile } from "@/lib/linkedin.functions";
import { LinkedInCard } from "@/components/linkedin-card";
import heroBg from "@/assets/hero-bg.jpg";
import profileAsset from "@/assets/profile.png.asset.json";

const projectsQuery = queryOptions({ queryKey: ["projects"], queryFn: fetchProjects });
const postsQuery = queryOptions({ queryKey: ["posts"], queryFn: fetchBlogPosts });
const tracksQuery = queryOptions({ queryKey: ["tracks"], queryFn: fetchLearningTracks });
const linkedInQuery = queryOptions({
  queryKey: ["linkedin", "profile"],
  queryFn: () => getLinkedInProfile(),
  staleTime: 5 * 60 * 1000,
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { property: "og:title", content: `${SITE.name} — ${SITE.tagline}` },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroBg, fetchpriority: "high" },
      { rel: "preload", as: "image", href: profileAsset.url, fetchpriority: "high" },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(projectsQuery),
      context.queryClient.ensureQueryData(postsQuery),
      context.queryClient.ensureQueryData(tracksQuery),
    ]);
    context.queryClient.prefetchQuery(linkedInQuery);
  },
  component: Home,
});

/* ---------- Animated counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{n}{suffix}</span>;
}

/* ---------- Section heading ---------- */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-glow">
      {children}
    </p>
  );
}

function Home() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const { data: posts } = useSuspenseQuery(postsQuery);
  const { data: tracks } = useSuspenseQuery(tracksQuery);
  const { data: linkedIn } = useQuery(linkedInQuery);

  const recent = posts.slice(0, 1);
  const latestProject = projects[0];

  const trustItems = [
    "Student at RIMT University",
    "Cybersecurity Enthusiast",
    "AI Explorer",
    "Python Learner",
    "Linux Enthusiast",
    "Building in Public",
    "Technology Creator",
    "Future Security Professional",
  ];

  const focusAreas = [
    { icon: Shield, label: "Cybersecurity", progress: 35, hue: "from-blue-500/30 to-cyan-500/10" },
    { icon: Terminal, label: "Linux", progress: 50, hue: "from-emerald-500/30 to-teal-500/10" },
    { icon: Network, label: "Networking", progress: 40, hue: "from-indigo-500/30 to-blue-500/10" },
    { icon: Code2, label: "Python", progress: 55, hue: "from-yellow-500/30 to-amber-500/10" },
    { icon: Brain, label: "Artificial Intelligence", progress: 45, hue: "from-fuchsia-500/30 to-purple-500/10" },
    { icon: Cloud, label: "Cloud Computing", progress: 25, hue: "from-sky-500/30 to-blue-500/10" },
    { icon: Sparkles, label: "Personal Branding", progress: 60, hue: "from-rose-500/30 to-pink-500/10" },
  ];

  const timeline = [
    { year: "2025", title: "Started building my online presence", status: "done", body: "Launched this site, joined LinkedIn seriously, and began writing about what I'm learning." },
    { year: "2026", title: "Learning cybersecurity and AI", status: "now", body: "Fundamentals across networking, Linux, security tooling, and AI experiments." },
    { year: "Future", title: "Building meaningful technology projects", status: "next", body: "Public tools and small products that solve real problems while I grow as an engineer." },
    { year: "Future", title: "Cybersecurity career growth", status: "next", body: "Internships, certifications, and contributing to open-source security projects." },
  ];

  const dashboardCards = [
    { icon: Target, label: "Current focus", value: "Network security & Linux", desc: "Deep-diving Nmap, Wireshark, and SSH hardening." },
    { icon: BookOpen, label: "Current books", value: "Linux Basics for Hackers", desc: "Plus 'The Web Application Hacker's Handbook' on deck." },
    { icon: Rocket, label: "Current projects", value: `${projects.length} in the workshop`, desc: "Mini security tools, automations, and notes." },
    { icon: Lightbulb, label: "Current experiments", value: "AI + recon", desc: "Using LLMs to summarize scan results." },
    { icon: Wrench, label: "Skills developing", value: `${tracks.length} tracks`, desc: "Python, networking, cloud, and AI fundamentals." },
    { icon: TrendingUp, label: "Learning goal", value: "Ship weekly", desc: "One small thing public every week — note, project, or post." },
  ];

  const stats = [
    { label: "Projects built", value: Math.max(projects.length, 0) },
    { label: "Resources shared", value: 12 },
    { label: "Articles written", value: posts.length },
    { label: "Skills learned", value: tracks.length },
    { label: "Connections", value: 150, suffix: "+" },
    { label: "Years learning", value: 2 },
  ];

  const bipItems = [
    { icon: Trophy, tag: "Recent win", title: "Launched adityacyber.in publicly", body: "First version of my personal brand site is live — built in public, end-to-end." },
    { icon: Lightbulb, tag: "Lesson learned", title: "Shipping > polishing", body: "Done and shared beats perfect and hidden. Iteration teaches faster than planning." },
    { icon: Wrench, tag: "Challenge", title: "Balancing breadth vs depth", body: "Curious about everything in security — learning to go deeper on fewer things." },
    { icon: Sparkles, tag: "Experiment", title: "AI-assisted recon notes", body: "Using LLMs to summarize and prioritize findings from CTF labs." },
    { icon: CalendarDays, tag: "Monthly update", title: "What I shipped this month", body: "Site launch, first blog posts, started the public roadmap." },
  ];

  return (
    <>
      {/* ===================== HERO (split-screen) ===================== */}
      <section className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1280}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-12 sm:pt-16 lg:min-h-[88vh] lg:pb-24 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            {/* Profile (above content on mobile, RIGHT on desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-first mx-auto w-full max-w-[240px] sm:max-w-[300px] lg:order-last lg:mx-0 lg:max-w-none lg:justify-self-end"
            >
              <div className="relative">
                {/* Animated glow */}
                <motion.div
                  aria-hidden
                  className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/40 via-primary-glow/20 to-transparent blur-3xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-card">
                  <img
                    src={profileAsset.url}
                    alt="Aditya — cybersecurity student and builder"
                    width={760}
                    height={1000}
                    loading="eager"
                    fetchPriority="high"
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                </div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1.5 shadow-card backdrop-blur"
                >
                  <span className="relative grid h-2 w-2 place-items-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary-glow opacity-60" />
                    <span className="relative h-2 w-2 rounded-full bg-primary-glow" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Open to internships
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Text */}
            <div className="flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 backdrop-blur"
              >
                <Sparkles className="h-3 w-3 text-primary-glow" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px]">
                  Personal digital headquarters
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="h-display-xl mt-5 font-display font-semibold tracking-tight"
              >
                <span className="text-gradient">Aditya</span>{" "}
                <span className="text-primary-glow">Cyber</span>
                <span className="mt-2 block font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl md:text-3xl">
                  Cybersecurity Student &amp; Builder
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-4 font-display text-base font-medium text-foreground sm:text-lg"
              >
                Cybersecurity Student · Builder · Lifelong Learner
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-5 max-w-xl space-y-3 text-sm text-muted-foreground sm:text-base"
              >
                <p>
                  I'm a student at <span className="text-foreground">RIMT University</span> documenting my journey in cybersecurity, AI, technology, and personal growth.
                </p>
                <p>
                  This site is my digital headquarters — projects, resources, learning notes, and lessons as I build my future in tech.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26 }}
                className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
              >
                <Link
                  to="/about"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:bg-primary-glow sm:w-auto"
                >
                  Explore My Journey
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-border bg-surface/70 px-5 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary sm:w-auto"
                >
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
                <Link
                  to="/projects"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-border bg-surface/70 px-5 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary sm:w-auto"
                >
                  <Code2 className="h-4 w-4" />
                  View Projects
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TRUST BAR ===================== */}
      <section aria-label="Highlights" className="border-y border-border/60 bg-surface/30 py-5">
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-3 whitespace-nowrap">
            {[...trustItems, ...trustItems].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHO I AM ===================== */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Who I am</Eyebrow>
            <h2 className="h-display-lg mt-3 font-display font-semibold tracking-tight">
              More than just a <span className="text-primary-glow">student</span>.
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 shadow-card backdrop-blur sm:p-8"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <p className="text-base text-muted-foreground sm:text-lg">
              I believe the best way to learn is by <span className="text-foreground">building, sharing, and documenting</span> the process.
            </p>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Instead of waiting until I become an expert, I'm sharing my journey publicly — building projects, exploring cybersecurity, and helping other students learn alongside me.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-glow hover:underline"
            >
              Read my story <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===================== CURRENT FOCUS ===================== */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Eyebrow>Current focus</Eyebrow>
        <h2 className="h-display-lg mt-3 font-display font-semibold tracking-tight">
          What I'm learning right now
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          A snapshot of the tracks I'm progressing through — updated as I grow.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface/60 p-5 shadow-card backdrop-blur transition-colors hover:border-glow"
              >
                <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${f.hue} blur-2xl opacity-60`} />
                <div className="relative flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background text-primary-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-semibold">{f.label}</h3>
                </div>
                <div className="relative mt-5">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Progress</span>
                    <span>{f.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border/60">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${f.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.1 + i * 0.04, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===================== FEATURED CONTENT HUB ===================== */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Featured</Eyebrow>
            <h2 className="h-display-lg mt-3 font-display font-semibold tracking-tight">
              Content hub
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Latest project */}
          {latestProject && (
            <Link
              to="/projects"
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-colors hover:border-glow"
            >
              <div className="aspect-[16/10] overflow-hidden bg-background">
                <img
                  src={coverFor(latestProject.slug, "project")}
                  alt={latestProject.title}
                  loading="lazy"
                  width={1280}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">Latest project</p>
                <h3 className="mt-2 font-display text-base font-semibold">{latestProject.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{latestProject.description}</p>
              </div>
            </Link>
          )}

          {/* Latest blog */}
          {recent[0] && (
            <Link
              to="/blog/$slug"
              params={{ slug: recent[0].slug }}
              className="group flex flex-col rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-glow"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">Latest blog post</p>
              <h3 className="mt-2 font-display text-base font-semibold leading-snug">{recent[0].title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{recent[0].excerpt}</p>
              <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-medium text-primary-glow">
                Read post <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          )}

          {/* Latest resource */}
          <Link to="/resources" className="group flex flex-col rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-glow">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">Latest resource</p>
            <h3 className="mt-2 font-display text-base font-semibold">Curating the best learning resources</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">A growing library across cybersecurity, Linux, networking, Python, AI, and cloud.</p>
            <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-medium text-primary-glow">
              Browse the library <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          {/* Latest learning note */}
          <Link to="/learning" className="group flex flex-col rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-glow">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">Latest learning note</p>
            <h3 className="mt-2 font-display text-base font-semibold">Networking fundamentals — packets, ports & protocols</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">Working through TCP/IP and capturing my own packets with Wireshark.</p>
            <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-medium text-primary-glow">
              Open notes <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          {/* LinkedIn activity */}
          <a href={SITE.linkedin} target="_blank" rel="noreferrer noopener" className="group flex flex-col rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-glow">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">
              <Linkedin className="h-3 w-3" /> Latest LinkedIn activity
            </p>
            <h3 className="mt-2 font-display text-base font-semibold">Sharing the journey</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">Weekly updates on what I'm learning, building, and reading.</p>
            <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-medium text-primary-glow">
              View profile <ExternalLink className="h-3 w-3" />
            </span>
          </a>

          {/* Achievement */}
          <Link to="/career" className="group flex flex-col rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-glow">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">
              <Trophy className="h-3 w-3" /> Latest achievement
            </p>
            <h3 className="mt-2 font-display text-base font-semibold">Launched my personal brand site</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">First public version of adityacyber.in — building in public, end-to-end.</p>
            <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-medium text-primary-glow">
              See career <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </section>

      {/* ===================== JOURNEY TIMELINE ===================== */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <Eyebrow>Journey</Eyebrow>
        <h2 className="h-display-lg mt-3 font-display font-semibold tracking-tight">
          The timeline
        </h2>

        <ol className="relative mt-10 border-l border-border pl-6 sm:pl-8">
          {timeline.map((t, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative mb-8 last:mb-0"
            >
              <span className={`absolute -left-[34px] grid h-6 w-6 place-items-center rounded-full border border-border bg-background sm:-left-[42px] sm:h-8 sm:w-8 ${t.status === "now" ? "shadow-glow" : ""}`}>
                <span className={`h-2 w-2 rounded-full ${t.status === "now" ? "bg-primary-glow animate-pulse" : t.status === "done" ? "bg-primary" : "bg-muted-foreground"}`} />
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">{t.year}</p>
                {t.status === "now" && (
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-glow">Now</span>
                )}
              </div>
              <h3 className="mt-1.5 font-display text-lg font-semibold sm:text-xl">{t.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">{t.body}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* ===================== PERSONAL DASHBOARD ===================== */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Eyebrow>Live dashboard</Eyebrow>
        <h2 className="h-display-lg mt-3 font-display font-semibold tracking-tight">
          What I'm up to right now
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface/60 p-5 shadow-card backdrop-blur"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-glow/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary-glow" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.label}</p>
                </div>
                <p className="mt-3 font-display text-lg font-semibold leading-snug">{c.value}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface/80 p-5 backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
              <p className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                <Counter to={Number(s.value)} suffix={s.suffix ?? ""} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== BUILDING IN PUBLIC ===================== */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Eyebrow>Building in public</Eyebrow>
        <h2 className="h-display-lg mt-3 font-display font-semibold tracking-tight">
          Wins, lessons & experiments
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          A live feed of what's working, what's not, and what I'm trying next.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bipItems.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-border bg-surface/60 p-5 shadow-card backdrop-blur"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <Icon className="h-3 w-3 text-primary-glow" />
                  {b.tag}
                </div>
                <h3 className="mt-3 font-display text-base font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
              </motion.div>
            );
          })}
          <Link
            to="/build-in-public"
            className="group flex items-center justify-center rounded-xl border border-dashed border-border bg-surface/30 p-5 text-center transition-colors hover:border-glow"
          >
            <span className="inline-flex items-center gap-2 font-display text-sm font-semibold">
              See the full feed <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* ===================== LINKEDIN ACTIVITY ===================== */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>LinkedIn activity</Eyebrow>
            <h2 className="h-display-lg mt-3 font-display font-semibold tracking-tight">
              Live from <span className="text-primary-glow">LinkedIn</span>
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
              My LinkedIn profile, pulled live through the connected account.
              For posts, articles, and follower stats, hop over to the full profile —
              LinkedIn's public API doesn't expose those numbers here.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-[#0A66C2] px-5 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
              >
                <Linkedin className="h-4 w-4" /> Follow on LinkedIn
              </a>
              <Link
                to="/linkedin"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface/70 px-5 text-sm font-medium hover:bg-secondary"
              >
                See full details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <LinkedInCard
              profile={linkedIn?.profile ?? null}
              error={linkedIn?.error ?? null}
            />
          </motion.div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-8">

        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-8 shadow-card sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur">
              <User className="h-3 w-3 text-primary-glow" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Let's connect</span>
            </div>
            <h3 className="h-display-lg mt-4 max-w-2xl font-display font-semibold tracking-tight">
              Follow the journey.
            </h3>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              I may not have all the answers yet, but I'm committed to learning, building, and sharing everything along the way. Join me as I document my journey through cybersecurity, AI, technology, and personal growth.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-glow sm:w-auto"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-border bg-surface/70 px-5 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary sm:w-auto"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <Link
                to="/contact"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-border bg-surface/70 px-5 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary sm:w-auto"
              >
                <Mail className="h-4 w-4" /> Contact me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
