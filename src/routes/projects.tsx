import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Github, ExternalLink, Wrench } from "lucide-react";
import { fetchProjects } from "@/lib/queries";
import { SectionHeading } from "@/components/section-heading";
import { coverFor } from "@/lib/covers";
import { useState } from "react";

const projectsQuery = queryOptions({ queryKey: ["projects"], queryFn: fetchProjects });

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Aditya Cyber" },
      { name: "description", content: "Cybersecurity tools, AI experiments and learning projects I'm building in public." },
      { property: "og:title", content: "Projects — Aditya Cyber" },
      { property: "og:description", content: "Tools and experiments I'm building while learning cybersecurity and AI." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: ProjectsPage,
});

const CATEGORIES = [
  { id: "all", label: "All", match: () => true },
  { id: "cyber", label: "Cybersecurity", match: (tech: readonly string[]) => tech.some((t) => /security|cyber|recon|osint|nmap|burp|wireshark/i.test(t)) },
  { id: "ai", label: "AI", match: (tech: readonly string[]) => tech.some((t) => /ai|ml|llm|openai|gpt|gemini/i.test(t)) },
  { id: "python", label: "Python", match: (tech: readonly string[]) => tech.some((t) => /python/i.test(t)) },
  { id: "web", label: "Web Development", match: (tech: readonly string[]) => tech.some((t) => /react|next|typescript|tailwind|node|web/i.test(t)) },
  { id: "automation", label: "Automation", match: (tech: readonly string[]) => tech.some((t) => /automation|bash|script|cron/i.test(t)) },
] as const;

function ProjectsPage() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const allTech = Array.from(new Set(projects.flatMap((p) => p.tech))).sort();
  const [filter, setFilter] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("all");
  const activeCat = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[0];
  const filtered = projects
    .filter((p) => activeCat.match(p.tech))
    .filter((p) => (filter ? p.tech.includes(filter) : true));

  return (
    <section className="mx-auto max-w-6xl px-5 pt-20 pb-24">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        description="A growing collection of tools, scripts and experiments. More on the way."
      />

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              category === c.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Tech:</span>
        <button
          onClick={() => setFilter(null)}
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
            filter === null
              ? "border-primary/60 bg-primary/10 text-foreground"
              : "border-border/60 bg-surface/40 text-muted-foreground hover:text-foreground"
          }`}
        >
          Any
        </button>
        {allTech.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
              filter === t
                ? "border-primary/60 bg-primary/10 text-foreground"
                : "border-border/60 bg-surface/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>


      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-colors hover:border-glow"
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
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 pt-2">
                {p.github_url && (
                  <a href={p.github_url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
                    <Github className="h-3.5 w-3.5" /> Code
                  </a>
                )}
                {p.demo_url && (
                  <a href={p.demo_url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-glow">
                    <ExternalLink className="h-3.5 w-3.5" /> Demo
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}

        {/* Coming soon placeholders */}
        {[1, 2].map((i) => (
          <div
            key={`soon-${i}`}
            className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/30 p-8 text-center"
          >
            <Wrench className="h-6 w-6 text-muted-foreground" />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">In the workshop</p>
            <p className="mt-1 font-display text-sm font-semibold text-foreground">More projects coming soon</p>
          </div>
        ))}
      </div>
    </section>
  );
}
