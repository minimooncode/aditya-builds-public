import { Linkedin, BadgeCheck, Mail, Globe, ExternalLink, Info } from "lucide-react";
import { SITE } from "@/lib/site";
import type { LinkedInProfile } from "@/lib/linkedin.functions";

type Props = {
  profile: LinkedInProfile | null;
  error: string | null;
  variant?: "compact" | "full";
};

export function LinkedInCard({ profile, error, variant = "compact" }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/70 shadow-card backdrop-blur">
      {/* Banner */}
      <div className="relative h-28 bg-gradient-to-br from-primary/40 via-primary-glow/25 to-transparent sm:h-32">
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="px-5 pb-6 sm:px-7">
        {/* Avatar */}
        <div className="-mt-12 flex items-end justify-between sm:-mt-14">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-background bg-background shadow-card sm:h-28 sm:w-28">
              {profile?.picture ? (
                <img
                  src={profile.picture}
                  alt={profile.name ?? "LinkedIn profile photo"}
                  width={112}
                  height={112}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-secondary">
                  <Linkedin className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-[#0A66C2] px-4 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
          >
            <Linkedin className="h-4 w-4" />
            Follow
          </a>
        </div>

        {/* Identity */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {profile?.name ?? SITE.name}
            </h3>
            {profile?.email_verified && (
              <span
                title="Verified LinkedIn account"
                className="inline-flex items-center gap-1 rounded-full border border-border bg-background/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-glow"
              >
                <BadgeCheck className="h-3 w-3" /> Verified
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {SITE.tagline} · Cybersecurity Student &amp; Builder
          </p>

          {/* Details */}
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {profile?.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary-glow" />
                <span className="text-muted-foreground">{profile.email}</span>
              </div>
            )}
            {profile?.locale && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-primary-glow" />
                <span className="text-muted-foreground">
                  {profile.locale.language?.toUpperCase()}
                  {profile.locale.country ? ` · ${profile.locale.country}` : ""}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm sm:col-span-2">
              <Linkedin className="h-4 w-4 text-primary-glow" />
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-foreground hover:text-primary-glow"
              >
                {SITE.linkedin.replace("https://", "")}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </dl>

          {variant === "full" && (
            <div className="mt-6 rounded-xl border border-border/80 bg-background/40 p-4">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
                <div className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  <p className="font-medium text-foreground">About LinkedIn data limits</p>
                  <p className="mt-1">
                    LinkedIn's public API (OpenID Connect with{" "}
                    <span className="font-mono">openid · profile · email</span>{" "}
                    scopes) only exposes basic identity — name, photo, email, and locale.
                    Headline, About, follower &amp; connection counts, posts, articles, and activity
                    are restricted to LinkedIn Marketing / Partner Program members and
                    cannot be fetched here. Visit the profile on LinkedIn for the full view.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && variant === "full" && (
            <p className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
