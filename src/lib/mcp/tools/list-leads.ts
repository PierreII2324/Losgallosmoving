import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

const validStatuses = ["new", "contacted", "quoted", "booked", "closed", "lost"];

export default defineTool({
  name: "list_leads",
  title: "List leads",
  description: "List recent customer leads. Optionally filter by status or limit the number of results.",
  inputSchema: {
    status: z.string().optional().describe("Optional status filter: new, contacted, quoted, booked, closed, or lost."),
    limit: z.number().int().optional().describe("Optional maximum number of leads to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    if (status && !validStatuses.includes(status)) {
      return {
        content: [{ type: "text", text: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }],
        isError: true,
      };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return { content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }] };
  },
});
