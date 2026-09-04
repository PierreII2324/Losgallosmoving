# Los Gallos Movers — Backend + Claude/External AI Access Plan

Add a secure backend database that collects lead/customer information, plus an app-hosted MCP server so Claude and other external AI clients can query and manage those leads on behalf of signed-in administrators.

## What we're building

1. **Lovable Cloud backend** — persistent PostgreSQL database + auth.
2. **Authentication** — email/password + Google sign-in so we can distinguish admins from the public.
3. **User roles** — separate `user_roles` table with an `admin` role; all lead access is scoped to admins.
4. **Leads table** — stores name, phone, email, business, from/to addresses, move date, home size, notes, and status.
5. **Customer intake form** — public route `/lead` where prospects submit their info; writes directly to the database.
6. **Admin dashboard** — protected route under `/_authenticated/admin/leads` where leadership can view, search, and update lead status.
7. **App-hosted MCP server** — exposes tools to external AI clients (Claude, ChatGPT, etc.):
   - `list_leads` — list recent leads (admin only)
   - `get_lead` — read a single lead (admin only)
   - `create_lead` — add a new lead (admin only)
   - `update_lead_status` — change status (e.g. new, contacted, booked, closed) (admin only)
   - `add_follow_up_note` — record a follow-up message/note on a lead (admin only)
8. **OAuth 2.1** — secures the MCP server; only users who sign in as admins can invoke the tools.

## Out of scope

- Actual email/SMS sending from the MCP tools (we'll record the follow-up note; wiring a live email provider is a separate integration).
- Public, unauthenticated access to the leads data.
- Replacing the existing Free Quote form — the leads form is a separate, dedicated intake path.

## Technical notes

- All database access uses Supabase RLS scoped to the `admin` role.
- MCP tools use `supabaseForUser` from the verified OAuth token, so RLS applies to the signed-in admin.
- The MCP server mounts at `/mcp`.
- OAuth consent route at `/.lovable/oauth/consent`.
