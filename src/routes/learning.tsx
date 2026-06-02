import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { fetchLearningTracks } from "@/lib/queries";
import { SectionHeading } from "@/components/section-heading";

const tracksQuery = queryOptions({ queryKey: ["tracks"], queryFn: fetchLearningTracks });

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Learning Journey — Aditya Cyber" },
      { name: "description", content: "A public roadmap of what I'm learning in cybersecurity, networking, Linux, Python, AI and cloud." },
      { property: "og:title", content: "Learning Journey — Aditya Cyber" },
      { property: "og:description", content: "Public learning roadmap — what's done, what's next, and where I am right now." },
      { property: "og:url", content: "/learning" },
    ],
    links: [{ rel: "canonical", href: "/learning" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(tracksQuery),
  component: LearningPage,
});

function LearningPage() {
  const { data: tracks } = useSuspenseQuery(tracksQuery);

  return (
    <section className="mx-auto max-w-6xl px-5 pt-20 pb-24">
      <SectionHeading
        eyebrow="Learning roadmap"
        title="What I'm studying — in public"
        description="A living roadmap I update as I make progress. Built so I stay accountable and so other students can follow along."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {tracks.map((t, i) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[t.icon] ?? Icons.BookOpen;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-surface p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background text-primary-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{t.name}</h3>
                </div>
                <span className="font-mono text-sm font-medium text-primary-glow">{t.progress}%</span>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{t.description}</p>

              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-background">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${t.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
                />
              </div>

              {t.current_topic && (
                <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-glow" />
                  Now: <span className="text-foreground normal-case tracking-normal">{t.current_topic}</span>
                </p>
              )}

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Completed</p>
                  <ul className="space-y-1 text-sm">
                    {t.completed.map((c) => (
                      <li key={c} className="flex items-start gap-1.5 text-muted-foreground">
                        <Icons.Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-glow" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Next up</p>
                  <ul className="space-y-1 text-sm">
                    {t.next_up.map((n) => (
                      <li key={n} className="flex items-start gap-1.5 text-muted-foreground">
                        <Icons.ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">This month</p>
          <h3 className="mt-2 font-display text-lg font-semibold">What I'm learning right now</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Icons.Circle className="mt-1 h-2 w-2 fill-primary-glow text-primary-glow" /> Networking fundamentals — OSI, TCP/IP, subnetting</li>
            <li className="flex items-start gap-2"><Icons.Circle className="mt-1 h-2 w-2 fill-primary-glow text-primary-glow" /> Python scripting for security automation</li>
            <li className="flex items-start gap-2"><Icons.Circle className="mt-1 h-2 w-2 fill-primary-glow text-primary-glow" /> Linux command-line mastery</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-surface p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow">Exploring next</p>
          <h3 className="mt-2 font-display text-lg font-semibold">On my radar</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Icons.ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Web application security (OWASP Top 10)</li>
            <li className="flex items-start gap-2"><Icons.ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Cloud security on AWS</li>
            <li className="flex items-start gap-2"><Icons.ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Threat modeling & detection engineering</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <Icons.NotebookPen className="h-5 w-5 text-primary-glow" />
          <h3 className="font-display text-lg font-semibold">Learning notes</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Raw notes, takeaways, and "aha" moments will live here. Building a personal knowledge base in public.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse" /> Coming soon
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="flex items-center gap-3">
            <Icons.BookOpen className="h-5 w-5 text-primary-glow" />
            <h3 className="font-display text-lg font-semibold">Reading list</h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3"><Icons.Book className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><div><p className="font-medium">The Web Application Hacker's Handbook</p><p className="text-xs text-muted-foreground">Stuttard & Pinto · Reading</p></div></li>
            <li className="flex items-start gap-3"><Icons.Book className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><div><p className="font-medium">Linux Basics for Hackers</p><p className="text-xs text-muted-foreground">OccupyTheWeb · Reading</p></div></li>
            <li className="flex items-start gap-3"><Icons.Book className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><div><p className="font-medium">Black Hat Python</p><p className="text-xs text-muted-foreground">Justin Seitz · Up next</p></div></li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="flex items-center gap-3">
            <Icons.Award className="h-5 w-5 text-primary-glow" />
            <h3 className="font-display text-lg font-semibold">Certificates</h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center justify-between"><span>CompTIA Security+</span><span className="rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">In progress</span></li>
            <li className="flex items-center justify-between"><span>Google Cybersecurity</span><span className="rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Planned</span></li>
            <li className="flex items-center justify-between"><span>TryHackMe Pre-Security</span><span className="rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">In progress</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
