import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "add_follow_up_note",
  title: "Add follow-up note",
  description: "Append a follow-up note to a lead's record.",
  inputSchema: {
    id: z.string().describe("The lead UUID."),
    note: z.string().describe("Note text to append."),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ id, note }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    if (!note.trim()) {
      return { content: [{ type: "text", text: "Note cannot be empty" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data: lead, error: fetchError } = await supabase
      .from("leads")
      .select("follow_up_notes")
      .eq("id", id)
      .maybeSingle();
    if (fetchError) return { content: [{ type: "text", text: fetchError.message }], isError: true };
    const existing = lead?.follow_up_notes ?? "";
    const timestamp = new Date().toISOString();
    const updated = existing ? `${existing}\n\n[${timestamp}] ${note.trim()}` : `[${timestamp}] ${note.trim()}`;
    const { error } = await supabase.from("leads").update({ follow_up_notes: updated }).eq("id", id);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return { content: [{ type: "text", text: "Note added" }] };
  },
});
