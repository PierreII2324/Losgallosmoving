import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { leads: data ?? [] };
  });

export const getLead = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    const { data: lead, error } = await context.supabase
      .from("leads")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();

    if (error) throw error;
    return { lead };
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: string }) => input)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("leads")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) throw error;
    return { ok: true };
  });

export const addFollowUpNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; note: string }) => input)
  .handler(async ({ data, context }) => {
    const { data: lead, error: fetchError } = await context.supabase
      .from("leads")
      .select("follow_up_notes")
      .eq("id", data.id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    const existing = lead?.follow_up_notes ?? "";
    const timestamp = new Date().toLocaleString();
    const updated = existing
      ? `${existing}\n\n[${timestamp}] ${data.note}`
      : `[${timestamp}] ${data.note}`;

    const { error } = await context.supabase
      .from("leads")
      .update({ follow_up_notes: updated })
      .eq("id", data.id);

    if (error) throw error;
    return { ok: true };
  });
