import { createFileRoute } from "@tanstack/react-router";
import { Target, Calendar, Sparkles, TrendingUp, Award } from "lucide-react";
import { PageHero } from "@/components/page-hero";

const GOALS_2026 = [
  { title: "Build a strong cybersecurity foundation", detail: "Complete fundamentals across networking, Linux, and security concepts." },
  { title: "Ship 6 public projects", detail: "From recon tools to AI-assisted security automation." },
  { title: "Earn first industry certification", detail: "Targeting an entry-level cybersecurity certification." },
  { title: "Land first internship", detail: "Apply for SOC analyst, security engineering, or AppSec internships." },
];

const SHORT_TERM = [
  "Finish Python for security course",
  "Complete TryHackMe pre-security path",
  "Set up personal home lab",
  "Publish weekly learning notes",
];

const LONG_TERM = [
  "Become a well-rounded offensive security engineer",
  "Contribute to open-source security tools",
  "Speak at a local security meetup",
  "Mentor other students breaking into the field",
];

const TIMELINE = [
  { year: "2025", title: "Beginning the journey", status: "done", description: "Started learning fundamentals — Python, Linux, networking basics." },
  { year: "2026", title: "Foundations & first projects", status: "now", description: "Building public projects, deep-diving into cybersecurity, first certification." },
  { year: "2027", title: "Internships & specialization", status: "upcoming", description: "First professional experience, choosing a specialization track." },
  { year: "2028", title: "Industry experience", status: "upcoming", description: "Working full-time in security, contributing to the community." },
  { year: "2030", title: "Senior engineer", status: "upcoming", description: "Building deep expertise, mentoring, and giving back." },
];

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — Aditya Cyber" },
      { name: "description", content: "Goals, milestones, and a long-term career roadmap for a cybersecurity journey." },
      { property: "og:title", content: "Roadmap — Aditya Cyber" },
      { property: "og:description", content: "An interactive roadmap from student to cybersecurity professional." },
      { property: "og:url", content: "https://adityacyber.in/roadmap" },
    ],
    links: [{ rel: "canonical", href: "https://adityacyber.in/roadmap" }],
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Direction"
        title="The Roadmap"
        description="Where I am, where I'm going, and how I plan to get there. A long-term map of the next 5 years in cybersecurity."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 flex items-center gap-3">
          <Target className="h-5 w-5 text-primary-glow" />
          <h2 className="font-display text-2xl font-semibold tracking-tight">2026 Goals</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {GOALS_2026.map((g, i) => (
            <div key={i} className="group rounded-xl border border-border/60 bg-surface/40 p-6 transition-all hover:border-primary/40">
              <div className="mb-2 font-mono text-xs uppercase tracking-wider text-primary-glow">Goal {i + 1}</div>
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{g.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary-glow" />
              <h2 className="font-display text-2xl font-semibold tracking-tight">Short Term</h2>
            </div>
            <ul className="space-y-3">
              {SHORT_TERM.map((g) => (
                <li key={g} className="flex items-start gap-3 rounded-lg border border-border/40 bg-surface/30 p-4">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-glow" />
                  <span className="text-sm">{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-6 flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary-glow" />
              <h2 className="font-display text-2xl font-semibold tracking-tight">Long Term</h2>
            </div>
            <ul className="space-y-3">
              {LONG_TERM.map((g) => (
                <li key={g} className="flex items-start gap-3 rounded-lg border border-border/40 bg-surface/30 p-4">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-glow" />
                  <span className="text-sm">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 flex items-center gap-3">
          <Award className="h-5 w-5 text-primary-glow" />
          <h2 className="font-display text-2xl font-semibold tracking-tight">Skills Timeline & Career Milestones</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:left-1/2" />
          <div className="space-y-8">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className={`relative grid gap-4 md:grid-cols-2 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
                <div className="md:pr-10 md:text-right">
                  <div className="ml-12 rounded-xl border border-border/60 bg-surface/40 p-5 backdrop-blur-sm md:ml-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2 md:justify-end">
                      <span className="font-mono text-xs uppercase tracking-wider text-primary-glow">{t.year}</span>
                      {t.status === "now" && (
                        <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-glow">Now</span>
                      )}
                      {t.status === "done" && (
                        <span className="rounded-full border border-border/60 bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Done</span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-semibold">{t.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
                  </div>
                </div>
                <div className="absolute left-[10px] top-6 grid h-3.5 w-3.5 place-items-center rounded-full border border-primary/60 bg-background md:left-1/2 md:h-5 md:w-5 md:-translate-x-1/2">
                  <span className={`h-1.5 w-1.5 rounded-full md:h-2 md:w-2 ${t.status === "now" ? "bg-primary-glow animate-pulse" : "bg-primary/60"}`} />
                </div>
                <div className="hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
