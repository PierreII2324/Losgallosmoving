import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

const validStatuses = ["new", "contacted", "quoted", "booked", "closed", "lost"];

export default defineTool({
  name: "update_lead_status",
  title: "Update lead status",
  description: "Change the status of a lead, for example from new to contacted or booked.",
  inputSchema: {
    id: z.string().describe("The lead UUID."),
    status: z.string().describe("New status: new, contacted, quoted, booked, closed, or lost."),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ id, status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    if (!validStatuses.includes(status)) {
      return {
        content: [{ type: "text", text: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }],
        isError: true,
      };
    }
    const supabase = supabaseForUser(ctx);
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return { content: [{ type: "text", text: "Status updated" }] };
  },
});
