import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Target, BookOpen, Zap, Trophy } from "lucide-react";
import { fetchDashboardItems, type DashboardItemRow } from "@/lib/queries";
import { SectionHeading } from "@/components/section-heading";

const dashboardQuery = queryOptions({ queryKey: ["dashboard"], queryFn: fetchDashboardItems });

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Personal Dashboard — Aditya Cyber" },
      { name: "description", content: "What I'm focused on right now — current focus, books I'm reading, skills I'm learning, and goals for the year." },
      { property: "og:title", content: "Personal Dashboard — Aditya Cyber" },
      { property: "og:description", content: "A live look at what I'm focused on this season." },
      { property: "og:url", content: "/dashboard" },
    ],
    links: [{ rel: "canonical", href: "/dashboard" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(dashboardQuery),
  component: DashboardPage,
});

const GROUPS = [
  { kind: "focus" as const, icon: Zap, title: "Current focus", desc: "What I'm actively working on right now." },
  { kind: "book" as const, icon: BookOpen, title: "Books I'm reading", desc: "On my desk this season." },
  { kind: "skill" as const, icon: Target, title: "Skills I'm learning", desc: "Practice over theory." },
  { kind: "goal" as const, icon: Trophy, title: "Goals for the year", desc: "Where I want to be by year's end." },
];

function DashboardPage() {
  const { data } = useSuspenseQuery(dashboardQuery);
  const by = (k: DashboardItemRow["kind"]) => data.filter((i) => i.kind === k);

  return (
    <section className="mx-auto max-w-6xl px-5 pt-20 pb-24">
      <SectionHeading
        eyebrow="Personal dashboard"
        title="What I'm focused on"
        description="A live snapshot of where my time and attention are going. Updated regularly."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {GROUPS.map((g, gi) => {
          const items = by(g.kind);
          const Icon = g.icon;
          return (
            <motion.div
              key={g.kind}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: gi * 0.05 }}
              className="rounded-xl border border-border bg-surface p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background text-primary-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                  <p className="text-xs text-muted-foreground">{g.desc}</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {items.length === 0 && (
                  <li className="text-sm text-muted-foreground">Nothing here yet.</li>
                )}
                {items.map((i) => (
                  <li key={i.id} className="rounded-lg border border-border-subtle bg-background/50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-foreground">{i.title}</p>
                      {i.status && (
                        <span className="shrink-0 rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-glow">
                          {i.status}
                        </span>
                      )}
                    </div>
                    {i.detail && <p className="mt-1 text-sm text-muted-foreground">{i.detail}</p>}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
