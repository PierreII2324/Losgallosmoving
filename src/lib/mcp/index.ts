import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listLeadsTool from "./tools/list-leads";
import getLeadTool from "./tools/get-lead";
import createLeadTool from "./tools/create-lead";
import updateLeadStatusTool from "./tools/update-lead-status";
import addFollowUpNoteTool from "./tools/add-follow-up-note";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "gallos-moving-showcase",
  title: "Gallos Moving Showcase",
  version: "0.1.0",
  instructions:
    "Administrative tools for Los Gallos Movers. Use these to read and manage customer leads, update move status, and record follow-up notes. All tools require admin access.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listLeadsTool, getLeadTool, createLeadTool, updateLeadStatusTool, addFollowUpNoteTool],
});
