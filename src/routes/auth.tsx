import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Los Gallos Movers" },
      { name: "description", content: "Sign in to the Los Gallos Movers admin dashboard." },
      { property: "og:title", content: "Admin Sign In — Los Gallos Movers" },
      { property: "og:description", content: "Sign in to the Los Gallos Movers admin dashboard." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notAdmin, setNotAdmin] = useState(false);
  const [isFirstAdmin, setIsFirstAdmin] = useState(false);

  async function checkAdminAndRedirect() {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) return;

    const userId = sessionData.session.user.id;
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (role) {
      navigate({ to: "/admin/leads" });
    } else {
      const { count } = await supabase
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("role", "admin");
      setNotAdmin(true);
      setIsFirstAdmin(!count || count === 0);
    }
  }

  async function onSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    await checkAdminAndRedirect();
    setLoading(false);
  }

  async function onSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    toast.success("Account created. Check your email if confirmation is required, then sign in.");
    setLoading(false);
  }

  async function signInWithGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/auth/callback`,
    });
    if (result.error) {
      toast.error(result.error.message);
      setLoading(false);
      return;
    }
    if (!result.redirected) {
      await checkAdminAndRedirect();
    }
    setLoading(false);
  }

  async function becomeFirstAdmin() {
    setLoading(true);
    const { becomeFirstAdmin: makeAdmin } = await import("@/lib/auth.functions");
    try {
      await makeAdmin();
      navigate({ to: "/admin/leads" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not become admin");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl">Admin access</CardTitle>
          <CardDescription>Sign in to manage leads and customer intake.</CardDescription>
        </CardHeader>
        <CardContent>
          {notAdmin ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                This account is not an admin. Leadership access is required.
              </p>
              {isFirstAdmin && (
                <Button onClick={becomeFirstAdmin} disabled={loading} className="w-full">
                  Become first admin
                </Button>
              )}
              <Button variant="outline" onClick={() => supabase.auth.signOut()} className="w-full">
                Sign out
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Create account</TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="space-y-4 pt-2">
                <form onSubmit={onSignIn} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input id="signin-email" name="email" type="email" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input id="signin-password" name="password" type="password" minLength={6} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    Sign in
                  </Button>
                </form>
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                <Button variant="outline" onClick={signInWithGoogle} disabled={loading} className="w-full">
                  Continue with Google
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="space-y-4 pt-2">
                <form onSubmit={onSignUp} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" name="email" type="email" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" name="password" type="password" minLength={6} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    Create account
                  </Button>
                </form>
                <p className="text-center text-xs text-muted-foreground">
                  After creating an account, an existing admin must grant you leadership access.
                </p>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
      <div className="mt-6 text-center text-sm">
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
