import { createServerFn } from "@tanstack/react-start";

export type LinkedInProfile = {
  sub: string;
  name: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  email_verified?: boolean;
  picture?: string;
  locale?: { country?: string; language?: string };
};

const GATEWAY = "https://connector-gateway.lovable.dev/linkedin";

export const getLinkedInProfile = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ profile: LinkedInProfile | null; error: string | null }> => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const linkedInKey = process.env.LINKEDIN_API_KEY;
    if (!lovableKey || !linkedInKey) {
      return { profile: null, error: "LinkedIn connection is not configured." };
    }
    try {
      const res = await fetch(`${GATEWAY}/v2/userinfo`, {
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": linkedInKey,
        },
      });
      if (!res.ok) {
        return {
          profile: null,
          error: `LinkedIn API returned ${res.status}.`,
        };
      }
      const profile = (await res.json()) as LinkedInProfile;
      return { profile, error: null };
    } catch (e) {
      return { profile: null, error: e instanceof Error ? e.message : "Unknown error" };
    }
  },
);
