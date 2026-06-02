import { createFileRoute } from "@tanstack/react-router";
import { Compass, FolderGit2, BookOpen, FlaskConical, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/page-hero";

const SECTIONS = [
  {
    icon: Compass,
    title: "Current focus",
    items: [
      "Cybersecurity fundamentals — networking, Linux, scripting",
      "Building a public, daily learning habit",
      "Sharing notes and breakdowns on the blog",
    ],
  },
  {
    icon: FolderGit2,
    title: "Current projects",
    items: [
      "Personal brand site (this one) — built in public",
      "Python-based recon helper",
      "Home lab with virtualized targets",
    ],
  },
  {
    icon: GraduationCap,
    title: "Learning goals",
    items: [
      "Finish a structured Python for security course",
      "Complete an entry-level certification",
      "Comfort with TCP/IP, packet analysis, and threat modeling",
    ],
  },
  {
    icon: BookOpen,
    title: "Currently reading",
    items: [
      "The Web Application Hacker's Handbook",
      "Linux Basics for Hackers",
      "Atomic Habits (re-reading)",
    ],
  },
  {
    icon: FlaskConical,
    title: "Experiments",
    items: [
      "Using AI to accelerate learning workflows",
      "Writing weekly retrospectives",
      "Tracking metrics on what actually helps me learn",
    ],
  },
];

export const Route = createFileRoute("/now")({
  head: () => ({
    meta: [
      { title: "Now — Aditya Cyber" },
      { name: "description", content: "What I'm focused on right now — projects, learning, books, and experiments." },
      { property: "og:title", content: "Now — Aditya Cyber" },
      { property: "og:description", content: "A real-time snapshot of what I'm working on, learning, and exploring." },
      { property: "og:url", content: "https://adityacyber.in/now" },
    ],
    links: [{ rel: "canonical", href: "https://adityacyber.in/now" }],
  }),
  component: NowPage,
});

function NowPage() {
  const updated = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return (
    <>
      <PageHero
        eyebrow="/ now"
        title="What I'm doing now"
        description={`A real-time snapshot of where my time and attention are going. Updated ${updated}.`}
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="rounded-xl border border-border/60 bg-surface/40 p-6 backdrop-blur-sm transition-all hover:border-primary/40">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-display text-lg font-semibold">{s.title}</h2>
                </div>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-glow" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-12 max-w-2xl text-sm text-muted-foreground">
          Inspired by the <a href="https://nownownow.com/about" target="_blank" rel="noreferrer" className="text-primary-glow hover:underline">/now page movement</a> — a chance to share what's actually happening in my world, beyond a static bio.
        </p>
      </section>
    </>
  );
}
