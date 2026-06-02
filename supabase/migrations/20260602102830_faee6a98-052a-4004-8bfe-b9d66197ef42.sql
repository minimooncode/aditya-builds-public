
-- Projects table (public read)
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  cover_url text,
  tech text[] NOT NULL DEFAULT '{}',
  github_url text,
  demo_url text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published projects" ON public.projects FOR SELECT TO anon, authenticated USING (published = true);

-- Blog posts
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  cover_url text,
  category text NOT NULL,
  content_md text NOT NULL,
  read_minutes int NOT NULL DEFAULT 5,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  published_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published posts" ON public.blog_posts FOR SELECT TO anon, authenticated USING (published = true);

-- Learning tracks
CREATE TABLE public.learning_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL,
  description text NOT NULL,
  progress int NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  current_topic text,
  completed text[] NOT NULL DEFAULT '{}',
  next_up text[] NOT NULL DEFAULT '{}',
  sort_order int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.learning_tracks TO anon, authenticated;
GRANT ALL ON public.learning_tracks TO service_role;
ALTER TABLE public.learning_tracks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read learning tracks" ON public.learning_tracks FOR SELECT TO anon, authenticated USING (true);

-- Dashboard items
CREATE TYPE public.dashboard_kind AS ENUM ('focus', 'book', 'skill', 'goal');
CREATE TABLE public.dashboard_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind public.dashboard_kind NOT NULL,
  title text NOT NULL,
  detail text,
  status text,
  sort_order int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.dashboard_items TO anon, authenticated;
GRANT ALL ON public.dashboard_items TO service_role;
ALTER TABLE public.dashboard_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read dashboard items" ON public.dashboard_items FOR SELECT TO anon, authenticated USING (true);

-- Contact messages (insert-only for public)
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (
  length(name) BETWEEN 1 AND 100 AND
  length(email) BETWEEN 3 AND 255 AND
  length(message) BETWEEN 1 AND 2000
);

-- Newsletter subscribers
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (
  length(email) BETWEEN 3 AND 255
);
