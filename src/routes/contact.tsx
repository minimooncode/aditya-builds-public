import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Linkedin, Github, Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SectionHeading } from "@/components/section-heading";
import { submitContactMessage } from "@/lib/contact.functions";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aditya Cyber" },
      { name: "description", content: "Get in touch with Aditya — open to internships, collaborations, and conversations about cybersecurity and AI." },
      { property: "og:title", content: "Contact — Aditya Cyber" },
      { property: "og:description", content: "Open to internships, collaborations and conversations." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const submit = useServerFn(submitContactMessage);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submit({ data: form });
      toast.success("Message sent. I'll get back to you soon!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't send — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const channels = [
    { icon: Linkedin, label: "LinkedIn", value: "Connect & message", href: SITE.linkedin },
    { icon: Github, label: "GitHub", value: "See my code", href: SITE.github },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 pt-20 pb-24">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Let's connect"
        description="Recruiters, founders, students, fellow learners — happy to chat about cybersecurity, AI, or just say hi."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-glow"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-background text-primary-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.label}</p>
                  <p className="font-display text-sm font-semibold">{c.value}</p>
                </div>
                <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            );
          })}
        </div>

        <form onSubmit={onSubmit} className="rounded-xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <h3 className="font-display text-xl font-semibold">Send a message</h3>
          <p className="mt-1 text-sm text-muted-foreground">Goes straight to my inbox.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Name</label>
              <input
                required maxLength={100}
                value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
              <input
                required type="email" maxLength={255}
                value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Message</label>
            <textarea
              required maxLength={2000} rows={6}
              value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Hi Aditya, I'd love to talk about…"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-glow disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
