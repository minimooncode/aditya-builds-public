import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-surface/30">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-display text-base font-semibold">{SITE.name}</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            A long-term, in-public journey through cybersecurity, AI, and technology.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <a href={SITE.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={SITE.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Github className="h-4 w-4" />
            </a>
            <a href={SITE.twitter} target="_blank" rel="noreferrer noopener" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Twitter className="h-4 w-4" />
            </a>
            <a href={`mailto:${SITE.email}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Sitemap</p>
          <ul className="grid grid-cols-2 gap-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Stay in the loop</p>
          <p className="mb-3 text-sm text-muted-foreground">New posts, projects, and lessons learned — once in a while, never spam.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Built in public.</p>
          <p className="font-mono">{SITE.domain}</p>
        </div>
      </div>
    </footer>
  );
}
