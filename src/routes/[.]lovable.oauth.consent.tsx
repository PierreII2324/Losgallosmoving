import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    const next = location.pathname + location.searchStr;
    if (!data.session) throw redirect({ to: "/auth", search: { next } });
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const raw = (data ?? {}) as Record<string, unknown>;
    const immediate = (raw.redirect_url ?? raw.redirect_to) as string | undefined;
    const client = raw.client as { name?: string } | undefined;
    if (immediate && !client) throw redirect({ href: immediate });
    return { clientName: client?.name ?? null };
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <p>Could not load this authorization request: {String((error as Error)?.message ?? error)}</p>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error: oauthError } = approve
      ? await supabase.auth.oauth.approveAuthorization(authorization_id)
      : await supabase.auth.oauth.denyAuthorization(authorization_id);
    if (oauthError) {
      setBusy(false);
      setError(oauthError.message);
      return;
    }
    const raw = (data ?? {}) as Record<string, unknown>;
    const target = (raw.redirect_url ?? raw.redirect_to) as string | undefined;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
        <h1 className="font-display text-2xl text-foreground">
          Connect {details?.clientName ?? "an app"} to your account
        </h1>
        <p className="mt-2 text-muted-foreground">
          This lets {details?.clientName ?? "the client"} use this app as you.
        </p>
        {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
        <div className="mt-6 flex gap-3">
          <Button onClick={() => decide(true)} disabled={busy} className="flex-1">
            Approve
          </Button>
          <Button variant="outline" onClick={() => decide(false)} disabled={busy} className="flex-1">
            Deny
          </Button>
        </div>
      </div>
    </main>
  );
}
