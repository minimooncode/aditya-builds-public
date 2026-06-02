import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Compass, Rocket, BookOpen, Code2, Target } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aditya Cyber" },
      { name: "description", content: "Aditya is a student from India learning cybersecurity, AI and technology — and documenting the journey publicly." },
      { property: "og:title", content: "About — Aditya Cyber" },
      { property: "og:description", content: "A student from India, building a long-term journey in cybersecurity and tech." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const TIMELINE = [
  {
    icon: Compass,
    year: "Early days",
    title: "Started exploring technology",
    body: "First curiosity about how computers, networks and the internet actually work under the hood.",
  },
  {
    icon: BookOpen,
    year: "Year 1",
    title: "Began learning cybersecurity",
    body: "Started studying the fundamentals — CIA triad, attack types, Linux, networking basics. TryHackMe rooms.",
  },
  {
    icon: Rocket,
    year: "Now",
    title: "Building online presence",
    body: "Launched this site, started writing, posting on LinkedIn — sharing what I learn instead of waiting.",
  },
  {
    icon: Code2,
    year: "Now",
    title: "Developing projects",
    body: "Small tools and experiments to put theory into practice — security scripts, AI experiments, automations.",
  },
  {
    icon: Target,
    year: "Future",
    title: "Internships, certs & deeper specialization",
    body: "Earn CompTIA Security+, land my first cybersecurity internship, and start contributing to open-source security tools.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-5 pt-20 pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-glow">About</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Hi, I'm <span className="text-primary-glow">Aditya</span>.
        </h1>
        <div className="mt-6 space-y-4 text-lg text-muted-foreground">
          <p>
            I'm a student from <span className="text-foreground">India</span>, currently learning my way into cybersecurity, AI and the wider world of technology.
          </p>
          <p>
            This site is my long-term notebook. I'm not pretending to be an expert — I'm a student building in public.
            Every project, post and learning track here is part of an honest, ongoing journey.
          </p>
          <p className="text-foreground">
            My mission: keep learning, keep shipping, and help others who are walking the same path.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {["Cybersecurity", "AI", "Technology", "Personal Branding", "Building in Public"].map((t) => (
            <span key={t} className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <SectionHeading eyebrow="Timeline" title="The journey so far" />
        <ol className="relative mt-10 border-l border-border pl-8">
          {TIMELINE.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative mb-10 last:mb-0"
              >
                <span className="absolute -left-[42px] grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-primary-glow">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{step.year}</p>
                <h3 className="mt-1 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-muted-foreground">{step.body}</p>
              </motion.li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
