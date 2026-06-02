import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Lightbulb, AlertTriangle, Rocket, Calendar } from "lucide-react";
import { PageHero } from "@/components/page-hero";

const ENTRIES = [
  {
    month: "June 2026",
    type: "win",
    title: "Launched the personal brand site",
    description: "Shipped this site as a long-term home for my cybersecurity journey — projects, notes, and progress, all in public.",
  },
  {
    month: "May 2026",
    type: "lesson",
    title: "Learning in public > learning in private",
    description: "The act of writing forces clarity. The act of publishing forces honesty.",
  },
  {
    month: "May 2026",
    type: "challenge",
    title: "Balancing depth and breadth",
    description: "Cybersecurity is enormous. Resisting the urge to chase every shiny topic and instead going deep on fundamentals.",
  },
  {
    month: "April 2026",
    type: "project",
    title: "First Python automation script",
    description: "A small reconnaissance helper. Small wins compound.",
  },
];

const TYPE_META = {
  win: { icon: Trophy, label: "Win", color: "text-amber-400" },
  lesson: { icon: Lightbulb, label: "Lesson", color: "text-primary-glow" },
  challenge: { icon: AlertTriangle, label: "Challenge", color: "text-orange-400" },
  project: { icon: Rocket, label: "Project", color: "text-emerald-400" },
} as const;

export const Route = createFileRoute("/build-in-public")({
  head: () => ({
    meta: [
      { title: "Build in Public — Aditya Cyber" },
      { name: "description", content: "Wins, lessons, challenges, and monthly updates from a journey documented in real time." },
      { property: "og:title", content: "Build in Public — Aditya Cyber" },
      { property: "og:description", content: "Documenting the cybersecurity journey — the wins, the lessons, and everything in between." },
    ],
  }),
  component: BuildInPublicPage,
});

function BuildInPublicPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Build in Public"
        description="Documenting the journey — wins, lessons learned, challenges, and monthly updates. No filter, no pretending to have it all figured out."
      />

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="mb-10 flex items-center gap-3">
          <Calendar className="h-5 w-5 text-primary-glow" />
          <h2 className="font-display text-2xl font-semibold tracking-tight">Timeline feed</h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />
          <div className="space-y-6">
            {ENTRIES.map((entry, i) => {
              const meta = TYPE_META[entry.type as keyof typeof TYPE_META];
              const Icon = meta.icon;
              return (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-1.5 top-3 grid h-5 w-5 place-items-center rounded-full border border-primary/60 bg-background">
                    <span className="h-2 w-2 rounded-full bg-primary-glow" />
                  </div>
                  <div className="rounded-xl border border-border/60 bg-surface/40 p-5 backdrop-blur-sm transition-all hover:border-primary/40">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{entry.month}</span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${meta.color}`}>
                        <Icon className="h-3 w-3" />
                        {meta.label}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold">{entry.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{entry.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          More entries coming each month. Subscribe to the newsletter to follow along.
        </p>
      </section>
    </>
  );
}
