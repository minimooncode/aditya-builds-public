import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Award, Download, Target, GraduationCap, Sparkles, Shield, Terminal, Code2, Network, Brain, Cloud } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SITE } from "@/lib/site";

const SKILLS = [
  { icon: Shield, label: "Cybersecurity Fundamentals", level: 35 },
  { icon: Terminal, label: "Linux", level: 50 },
  { icon: Network, label: "Networking", level: 40 },
  { icon: Code2, label: "Python", level: 55 },
  { icon: Brain, label: "AI & Automation", level: 45 },
  { icon: Cloud, label: "Cloud Basics", level: 25 },
];

const EXPERIENCE = [
  {
    when: "2026 — Present",
    role: "Cybersecurity Student & Builder",
    org: "Self-directed",
    detail: "Building public projects, writing technical notes, and developing fundamentals across security, networking, and AI.",
  },
];

const CERTS = [
  { name: "CompTIA Security+", status: "In progress" },
  { name: "Google Cybersecurity Certificate", status: "Planned" },
  { name: "TryHackMe Pre-Security Path", status: "In progress" },
];

const INTERESTS = [
  "Cybersecurity internships",
  "SOC analyst opportunities",
  "AppSec & offensive security roles",
  "AI + security research",
  "Open-source security collaborations",
];

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Career — Aditya Cyber" },
      { name: "description", content: "Experience, skills, certifications, and the kind of opportunities I'm exploring." },
      { property: "og:title", content: "Career — Aditya Cyber" },
      { property: "og:description", content: "My career page — experience, skills, certifications, and internship interests." },
    ],
  }),
  component: CareerPage,
});

function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow="Career"
        title="Experience, Skills, and What I'm Looking For"
        description="A snapshot of where I am professionally — what I've done, what I'm learning, and the kind of opportunities I'd love to explore."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${SITE.email}?subject=Opportunity`}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-glow"
          >
            <Briefcase className="h-4 w-4" /> Get in touch
          </a>
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-surface/40 px-4 py-2 text-sm font-medium text-muted-foreground"
          >
            <Download className="h-4 w-4" /> Resume (coming soon)
          </button>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-primary-glow" />
              <h2 className="font-display text-2xl font-semibold tracking-tight">Experience</h2>
            </div>
            <div className="space-y-4">
              {EXPERIENCE.map((e) => (
                <div key={e.role} className="rounded-xl border border-border/60 bg-surface/40 p-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-primary-glow">{e.when}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold">{e.role}</h3>
                  <p className="text-sm text-muted-foreground">{e.org}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary-glow" />
              <h2 className="font-display text-2xl font-semibold tracking-tight">Skills</h2>
            </div>
            <div className="space-y-4">
              {SKILLS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded-lg border border-border/60 bg-surface/40 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary-glow" />
                        <span className="text-sm font-medium">{s.label}</span>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-border/40">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Award className="h-5 w-5 text-primary-glow" />
              <h2 className="font-display text-2xl font-semibold tracking-tight">Certifications</h2>
            </div>
            <ul className="space-y-3">
              {CERTS.map((c) => (
                <li key={c.name} className="flex items-center justify-between rounded-lg border border-border/60 bg-surface/40 p-4">
                  <span className="text-sm">{c.name}</span>
                  <span className="rounded-full border border-border/60 bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{c.status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <Target className="h-5 w-5 text-primary-glow" />
              <h2 className="font-display text-2xl font-semibold tracking-tight">Opportunities I'm interested in</h2>
            </div>
            <ul className="space-y-2">
              {INTERESTS.map((i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-border/40 bg-surface/30 p-3 text-sm">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
