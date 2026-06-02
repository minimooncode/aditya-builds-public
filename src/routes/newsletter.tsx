import { createFileRoute } from "@tanstack/react-router";
import { Mail, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { NewsletterForm } from "@/components/newsletter-form";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "Newsletter — Aditya Cyber" },
      { name: "description", content: "Follow my cybersecurity journey. Notes, projects, and lessons from building in public." },
      { property: "og:title", content: "Newsletter — Aditya Cyber" },
      { property: "og:description", content: "Follow my cybersecurity journey. Notes, projects, and lessons — straight to your inbox." },
      { property: "og:url", content: "https://adityacyber.in/newsletter" },
    ],
    links: [{ rel: "canonical", href: "https://adityacyber.in/newsletter" }],
  }),
  component: NewsletterPage,
});

function NewsletterPage() {
  return (
    <>
      <PageHero
        eyebrow="Inbox"
        title="Follow My Cybersecurity Journey"
        description="Notes, projects, lessons learned, and the resources I'd recommend to anyone walking the same path. Newsletter launching soon."
      />

      <section className="mx-auto max-w-2xl px-5 py-16">
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/40 p-8 backdrop-blur-sm">
          <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-glow">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Get on the early list</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The newsletter is being prepared. Drop your email and you'll be among the first to receive it when it launches.
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>

          <ul className="mt-8 space-y-3 border-t border-border/40 pt-6 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
              Monthly recap of what I learned, built, and broke.
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
              Curated cybersecurity resources worth your time.
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
              No spam, no fluff. Easy unsubscribe whenever.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
