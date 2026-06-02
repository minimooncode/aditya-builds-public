import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Calendar, Clock, Linkedin, Twitter } from "lucide-react";
import { fetchBlogPost } from "@/lib/queries";
import { coverFor } from "@/lib/covers";
import { SITE } from "@/lib/site";
import "highlight.js/styles/github-dark.css";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await fetchBlogPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [{ title: "Post not found — Aditya Cyber" }],
      };
    }
    return {
      meta: [
        { title: `${post.title} — ${SITE.name}` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "article:published_time", content: post.published_at },
        { property: "article:section", content: post.category },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.published_at,
            articleSection: post.category,
            author: { "@type": "Person", name: "Aditya", url: "/about" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold">Post not found</h1>
      <p className="mt-2 text-muted-foreground">That article doesn't exist or was moved.</p>
      <Link to="/blog" className="mt-6 inline-flex items-center gap-1 text-primary-glow hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const fmt = new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const shareText = encodeURIComponent(`${post.title} by Aditya`);

  return (
    <article className="mx-auto max-w-3xl px-5 pt-16 pb-24">
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-glow">{post.category}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {fmt}</span>
        <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> {post.read_minutes} min read</span>
        <span>By Aditya</span>
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
        <img
          src={coverFor(post.slug, "blog")}
          alt={post.title}
          width={1280}
          height={720}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      <div className="prose-blog mt-12">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content_md}
        </ReactMarkdown>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5">
        <p className="text-sm font-medium">Found this useful? Share it.</p>
        <div className="flex items-center gap-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Share on Twitter"
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE.url}/blog/${post.slug}`)}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Share on LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
