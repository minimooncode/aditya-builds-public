import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { fetchBlogPosts } from "@/lib/queries";
import { SectionHeading } from "@/components/section-heading";
import { coverFor } from "@/lib/covers";

const postsQuery = queryOptions({ queryKey: ["posts"], queryFn: fetchBlogPosts });
const CATEGORIES = ["All", "Cybersecurity", "AI", "Career", "Learning", "Technology"] as const;

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Aditya Cyber" },
      { name: "description", content: "Notes, lessons and ideas from a student building a career in cybersecurity, AI and technology." },
      { property: "og:title", content: "Blog — Aditya Cyber" },
      { property: "og:description", content: "Cybersecurity, AI and career notes from a student building in public." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  component: BlogIndex,
});

function BlogIndex() {
  const { data: posts } = useSuspenseQuery(postsQuery);
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.id !== featured?.id);
  const filtered = cat === "All" ? rest : rest.filter((p) => p.category === cat);
  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <section className="mx-auto max-w-6xl px-5 pt-20 pb-24">
      <SectionHeading
        eyebrow="Blog"
        title="Notes from the journey"
        description="Honest writing on cybersecurity, AI, learning and building a career in tech."
      />

      {featured && (
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          className="group mt-12 grid overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-colors hover:border-glow md:grid-cols-2"
        >
          <div className="aspect-[16/10] overflow-hidden bg-background md:aspect-auto">
            <img
              src={coverFor(featured.slug, "blog")}
              alt={featured.title}
              loading="lazy"
              width={1280}
              height={720}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">Featured · {featured.category}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl">{featured.title}</h3>
            <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
            <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {fmt(featured.published_at)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> {featured.read_minutes} min read</span>
            </div>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary-glow">
              Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      )}

      <div className="mt-12 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              cat === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-colors hover:border-glow"
            >
              <div className="aspect-[16/10] overflow-hidden bg-background">
                <img
                  src={coverFor(p.slug, "blog")}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{p.category}</p>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-muted-foreground">
                  <span>{fmt(p.published_at)}</span>
                  <span>·</span>
                  <span>{p.read_minutes} min</span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground">No posts in this category yet — check back soon.</p>
        )}
      </div>
    </section>
  );
}
