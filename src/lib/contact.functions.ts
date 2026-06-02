import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((d) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("contact_messages").insert(data);
    if (error) throw new Error("Couldn't send your message — please try again.");
    return { ok: true };
  });

const newsletterSchema = z.object({
  email: z.string().trim().email().max(255),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d) => newsletterSchema.parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email: data.email });
    if (error) {
      // Duplicate? Silently succeed.
      if (error.code === "23505") return { ok: true };
      throw new Error("Couldn't subscribe — try again.");
    }
    return { ok: true };
  });
