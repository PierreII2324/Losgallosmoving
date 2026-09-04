import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({
    meta: [
      { title: "Signing in — Los Gallos Movers" },
      { name: "description", content: "Completing sign in." },
    ],
  }),
  component: Callback,
});

function Callback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function complete() {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !data.session) {
        setError("Could not complete sign in. Please try again.");
        return;
      }

      const userId = data.session.user.id;
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (role) {
        router.navigate({ to: "/admin/leads" });
      } else {
        router.navigate({ to: "/auth" });
      }
    }
    complete();
  }, [router]);

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <p className="text-muted-foreground">Completing sign in…</p>
    </div>
  );
}
