import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";

const PROJECT_COVERS: Record<string, string> = {
  "security-toolkit": project2,
  "phish-lens": project1,
  "study-buddy-ai": project3,
};
const BLOG_COVERS: Record<string, string> = {
  "starting-my-cybersecurity-journey": blog1,
  "linux-fundamentals-i-actually-use": blog2,
};
const FALLBACKS = [project1, project2, project3];

export function coverFor(slug: string, kind: "project" | "blog"): string {
  const map = kind === "project" ? PROJECT_COVERS : BLOG_COVERS;
  if (map[slug]) return map[slug];
  // deterministic fallback by slug hash
  const idx = Math.abs(Array.from(slug).reduce((a, c) => a + c.charCodeAt(0), 0)) % FALLBACKS.length;
  return FALLBACKS[idx];
}
