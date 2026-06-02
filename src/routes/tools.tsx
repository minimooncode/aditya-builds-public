import { createFileRoute } from "@tanstack/react-router";
import { Eye, Search, Network, Globe, Terminal, Brain, Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { PageHero, ComingSoonCard } from "@/components/page-hero";

const CATEGORIES = [
  { id: "recon", label: "Reconnaissance", icon: Eye, description: "Tools for footprinting, enumeration, and information gathering." },
  { id: "osint", label: "OSINT", icon: Search, description: "Open-source intelligence frameworks, lookups, and investigation toolkits." },
  { id: "network", label: "Network Analysis", icon: Network, description: "Packet capture, traffic analysis, and protocol-level inspection." },
  { id: "web", label: "Web Security", icon: Globe, description: "Scanners, proxies, and frameworks for web application security testing." },
  { id: "linux", label: "Linux Tools", icon: Terminal, description: "Command-line utilities every security professional should know." },
  { id: "ai", label: "AI Tools", icon: Brain, description: "AI-assisted security tooling, automation, and emerging workflows." },
];

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools — Aditya Cyber" },
      { name: "description", content: "A directory of cybersecurity tools for reconnaissance, OSINT, network analysis, web security, and more." },
      { property: "og:title", content: "Tools — Aditya Cyber" },
      { property: "og:description", content: "A directory of cybersecurity tools used by professionals and students." },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
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
        eyebrow="Directory"
        title="Cybersecurity Tools"
        description="Tool database coming soon. A handpicked catalog of professional tools across reconnaissance, OSINT, network, and web security."
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools…"
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
      </section>
    </>
  );
}
