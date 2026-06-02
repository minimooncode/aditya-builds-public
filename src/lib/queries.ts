import { supabase } from "@/integrations/supabase/client";

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover_url: string | null;
  tech: string[];
  github_url: string | null;
  demo_url: string | null;
  featured: boolean;
  sort_order: number;
};

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_url: string | null;
  category: string;
  content_md: string;
  read_minutes: number;
  featured: boolean;
  published_at: string;
};

export type LearningTrackRow = {
  id: string;
  name: string;
  icon: string;
  description: string;
  progress: number;
  current_topic: string | null;
  completed: string[];
  next_up: string[];
  sort_order: number;
  updated_at: string;
};

export type DashboardItemRow = {
  id: string;
  kind: "focus" | "book" | "skill" | "goal";
  title: string;
  detail: string | null;
  status: string | null;
  sort_order: number;
};

export async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as ProjectRow[];
}

export async function fetchBlogPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPostRow[];
}

export async function fetchBlogPost(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as BlogPostRow | null;
}

export async function fetchLearningTracks() {
  const { data, error } = await supabase
    .from("learning_tracks")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as LearningTrackRow[];
}

export async function fetchDashboardItems() {
  const { data, error } = await supabase
    .from("dashboard_items")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as DashboardItemRow[];
}
