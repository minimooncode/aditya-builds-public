import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Github, ExternalLink, BookOpen, Zap, Sparkles } from "lucide-react";
import { fetchProjects, fetchBlogPosts, fetchLearningTracks } from "@/lib/queries";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/site";
import { coverFor } from "@/lib/covers";
import heroBg from "@/assets/hero-bg.jpg";

const projectsQuery = queryOptions({ queryKey: ["projects"], queryFn: fetchProjects });
const postsQuery = queryOptions({ queryKey: ["posts"], queryFn: fetchBlogPosts });
const tracksQuery = queryOptions({ queryKey: ["tracks"], queryFn: fetchLearningTracks });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { property: "og:title", content: `${SITE.name} — ${SITE.tagline}` },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(projectsQuery),
      context.queryClient.ensureQueryData(postsQuery),
      context.queryClient.ensureQueryData(tracksQuery),
    ]);
  },
  component: Home,
});

function Home() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const { data: posts } = useSuspenseQuery(postsQuery);
  const { data: tracks } = useSuspenseQuery(tracksQuery);

  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const recent = posts.slice(0, 3);
  const avgProgress = Math.round(tracks.reduce((s, t) => s + t.progress, 0) / Math.max(tracks.length, 1));

  const stats = [
    { label: "Projects shipped", value: projects.length },
    { label: "Posts written", value: posts.length },
    { label: "Tracks learning", value: tracks.length },
    { label: "Avg. progress", value: `${avgProgress}%` },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1280}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

        <div className="relative mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col items-start justify-center px-5 py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 backdrop-blur"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary-glow opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-primary-glow" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Currently learning · network security
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-gradient">Building My Future</span>
            <br />
            in <span className="text-primary-glow">Cybersecurity</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            Student. Builder. Learner. Documenting my journey in cybersecurity, AI, and technology — in public, one project at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:bg-primary-glow"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/70 px-5 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary"
            >
              <Linkedin className="h-4 w-4" />
              Connect on LinkedIn
            </a>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-surface/80 p-5 backdrop-blur">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</dt>
                <dd className="mt-2 font-display text-2xl font-semibold">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading
          eyebrow="Recent activity"
          title="What I've been up to"
          description="A live feed from the blog and the projects shelf."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {recent.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-glow"
              >
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <BookOpen className="h-3 w-3" />
                  Blog · {p.category}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary-glow">
                  Read post <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex items-end justify-between">
          <SectionHeading
            eyebrow="Featured projects"
            title="What I'm building"
            description="Small tools and experiments — built to learn, shared in case they help someone else."
          />
          <Link to="/projects" className="hidden text-sm font-medium text-primary-glow hover:underline md:inline-flex">
            All projects →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-colors hover:border-glow"
            >
              <div className="aspect-[16/10] overflow-hidden bg-background">
                <img
                  src={coverFor(p.slug, "project")}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-background p-10 shadow-card md:p-14">
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-glow">
                <Sparkles className="h-3 w-3" /> Let's connect
              </p>
              <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                Open to internships, collaborations & conversations.
              </h3>
              <p className="mt-2 text-muted-foreground">
                Recruiters, founders, fellow students — I'd love to hear what you're working on.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-glow"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
