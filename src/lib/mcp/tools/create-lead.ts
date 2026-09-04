import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_lead",
  title: "Create lead",
  description: "Add a new customer lead to the database.",
  inputSchema: {
    name: z.string().describe("Customer full name."),
    phone: z.string().optional().describe("Phone number."),
    email: z.string().optional().describe("Email address."),
    business: z.string().optional().describe("Business name, if commercial."),
    from_address: z.string().optional().describe("Origin address."),
    to_address: z.string().optional().describe("Destination address."),
    move_date: z.string().optional().describe("Move date as an ISO 8601 date string."),
    home_size: z.string().optional().describe("Home or office size."),
    notes: z.string().optional().describe("Additional notes about the move."),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    if (!input.name.trim()) {
      return { content: [{ type: "text", text: "Name is required" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("leads").insert({ ...input, name: input.name.trim() }).select();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return { content: [{ type: "text", text: `Created lead ${data?.[0]?.id ?? ""}` }] };
  },
});
