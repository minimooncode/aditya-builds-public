import { createFileRoute } from "@tanstack/react-router";
import { Shield, Terminal, Network, Code2, Brain, Cloud, Briefcase, Search } from "lucide-react";
import { useState } from "react";
import { PageHero, ComingSoonCard } from "@/components/page-hero";

const CATEGORIES = [
  { id: "cybersecurity", label: "Cybersecurity", icon: Shield, description: "Curated guides, courses, labs, and reading for cybersecurity students and practitioners." },
  { id: "linux", label: "Linux", icon: Terminal, description: "From shell basics to system internals — the resources that shaped my Linux journey." },
  { id: "networking", label: "Networking", icon: Network, description: "TCP/IP, packet analysis, routing, and the protocols that hold the internet together." },
  { id: "python", label: "Python", icon: Code2, description: "Scripts, automation, security tooling, and the books worth reading twice." },
  { id: "ai", label: "AI", icon: Brain, description: "Practical AI resources for builders — from prompt engineering to model deployment." },
  { id: "cloud", label: "Cloud", icon: Cloud, description: "AWS, Azure, GCP — cloud security and infrastructure fundamentals." },
  { id: "career", label: "Career Development", icon: Briefcase, description: "Resume reviews, interview prep, internships, and breaking into the industry." },
];

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Aditya Cyber" },
      { name: "description", content: "A growing library of curated cybersecurity, Linux, networking, Python, AI, and cloud learning resources." },
      { property: "og:title", content: "Resources — Aditya Cyber" },
      { property: "og:description", content: "A growing library of curated cybersecurity and technology learning resources." },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("all");

  const filtered = CATEGORIES.filter((c) => {
    const matchCat = active === "all" || c.id === active;
    const matchQuery = c.label.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <>
      <PageHero
        eyebrow="Library"
        title="Resources"
        description="Curating the best resources for students and aspiring cybersecurity professionals. A living library that grows as I learn."
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources…"
              className="w-full rounded-md border border-border/60 bg-surface/40 py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[{ id: "all", label: "All" }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label }))].map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  active === c.id
                    ? "border-primary/60 bg-primary/10 text-foreground"
                    : "border-border/60 bg-surface/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const Icon = c.icon;
            return (
              <ComingSoonCard
                key={c.id}
                icon={<Icon className="h-5 w-5" />}
                title={c.label}
                description={c.description}
              />
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">No matches. Try a different filter.</p>
        )}
      </section>
    </>
  );
}
