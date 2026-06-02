import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Linkedin } from "lucide-react";
import { getLinkedInProfile } from "@/lib/linkedin.functions";
import { LinkedInCard } from "@/components/linkedin-card";
import { SITE } from "@/lib/site";

const linkedInQuery = queryOptions({
  queryKey: ["linkedin", "profile"],
  queryFn: () => getLinkedInProfile(),
  staleTime: 5 * 60 * 1000,
});

export const Route = createFileRoute("/linkedin")({
  head: () => ({
    meta: [
      { title: `LinkedIn — ${SITE.name}` },
      {
        name: "description",
        content: `Live LinkedIn profile data for ${SITE.name}, pulled directly from LinkedIn.`,
      },
      { property: "og:title", content: `LinkedIn — ${SITE.name}` },
      {
        property: "og:description",
        content: `Live LinkedIn profile data for ${SITE.name}.`,
      },
      { property: "og:url", content: `${SITE.url}/linkedin` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/linkedin` }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(linkedInQuery);
  },
  component: LinkedInPage,
});

function LinkedInPage() {
  const { data } = useSuspenseQuery(linkedInQuery);

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Back home
      </Link>

      <header className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-glow">
          Live · LinkedIn
        </p>
        <h1 className="h-display-lg mt-3 font-display font-semibold tracking-tight">
          LinkedIn <span className="text-primary-glow">Profile</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Pulled directly from LinkedIn using the connected account. Only data that
          LinkedIn exposes through its public API is shown — see the note on the
          card for details.
        </p>
      </header>

      <div className="mt-10">
        <LinkedInCard profile={data.profile} error={data.error} variant="full" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-11 items-center gap-2 rounded-md bg-[#0A66C2] px-5 text-sm font-medium text-white shadow-glow transition-opacity hover:opacity-90"
        >
          <Linkedin className="h-4 w-4" />
          Open LinkedIn profile
        </a>
        <Link
          to="/contact"
          className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface/70 px-5 text-sm font-medium hover:bg-secondary"
        >
          Get in touch
        </Link>
      </div>
    </main>
  );
}
