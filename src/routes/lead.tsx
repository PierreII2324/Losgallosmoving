import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/lead")({
  head: () => ({
    meta: [
      { title: "Customer Intake — Los Gallos Movers" },
      { name: "description", content: "Submit your moving details to Los Gallos Movers for a fast, no-obligation quote." },
      { property: "og:title", content: "Customer Intake — Los Gallos Movers" },
      { property: "og:description", content: "Tell us about your move and we'll get right back to you." },
    ],
  }),
  component: LeadIntake,
});

function LeadIntake() {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);

    const { error } = await supabase.from("leads").insert({
      name: String(form.get("name")),
      phone: String(form.get("phone")),
      email: String(form.get("email")),
      business: String(form.get("business") || ""),
      from_address: String(form.get("from_address")),
      to_address: String(form.get("to_address")),
      move_date: String(form.get("move_date")),
      home_size: String(form.get("home_size")),
      notes: String(form.get("notes") || ""),
    });

    if (error) {
      toast.error("Could not save your info. Please try again.");
      setSaving(false);
      return;
    }

    setSubmitted(true);
    toast.success("Info received! We'll be in touch soon.");
    (e.target as HTMLFormElement).reset();
    setSaving(false);
  }

  return (
    <div>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading
            eyebrow="Customer Intake"
            title="Tell us about your move."
            description="Share a few details and our crew will reach out with a personalized quote — usually within one business day."
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        {submitted && (
          <div className="mb-6 flex items-start gap-3 rounded-md border border-primary/30 bg-primary/5 p-4 text-sm">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
            <div>
              <div className="font-semibold text-foreground">Thanks — we got it!</div>
              <div className="text-muted-foreground">A crew member will reach out shortly.</div>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="grid gap-5 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" id="name"><Input id="name" name="name" required /></Field>
            <Field label="Phone number" id="phone"><Input id="phone" name="phone" type="tel" required /></Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" id="email"><Input id="email" name="email" type="email" required /></Field>
            <Field label="Business name (optional)" id="business"><Input id="business" name="business" /></Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Moving from" id="from_address"><Input id="from_address" name="from_address" placeholder="Street address or ZIP" required /></Field>
            <Field label="Moving to" id="to_address"><Input id="to_address" name="to_address" placeholder="Street address or ZIP" required /></Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Move date" id="move_date"><Input id="move_date" name="move_date" type="date" /></Field>
            <Field label="Home size" id="home_size">
              <Select name="home_size">
                <SelectTrigger id="home_size"><SelectValue placeholder="Select size" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="1br">1 Bedroom</SelectItem>
                  <SelectItem value="2br">2 Bedroom</SelectItem>
                  <SelectItem value="3br">3 Bedroom</SelectItem>
                  <SelectItem value="4br+">4+ Bedroom</SelectItem>
                  <SelectItem value="office">Office / Commercial</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Anything else we should know?" id="notes">
            <Textarea id="notes" name="notes" rows={4} placeholder="Stairs, piano, storage, packing help..." />
          </Field>

          <Button type="submit" size="lg" className="w-full sm:w-auto sm:self-start" disabled={saving}>
            Submit my moving info
          </Button>
          <p className="text-xs text-muted-foreground">
            By submitting you agree we may contact you about your move. We never share your info.
          </p>
        </form>
      </section>
    </div>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}
