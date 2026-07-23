import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Free Quote — Los Gallos Movers" },
      { name: "description", content: "Get a free, no-obligation moving quote from Los Gallos Movers. Fast response, honest pricing." },
      { property: "og:title", content: "Get a Free Moving Quote" },
      { property: "og:description", content: "Tell us about your move — we'll get right back with an honest price." },
    ],
  }),
  component: Quote,
});

function Quote() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Quote request received!", { description: "We'll be in touch within one business day." });
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading
            eyebrow="Free Quote"
            title="Tell us about your move."
            description="Fill out the form and we'll get back to you with an honest, no-obligation estimate — usually within a business day."
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        {submitted && (
          <div className="mb-6 flex items-start gap-3 rounded-md border border-primary/30 bg-primary/5 p-4 text-sm">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
            <div>
              <div className="font-semibold text-foreground">Thanks — we got it!</div>
              <div className="text-muted-foreground">A crew member will reach out shortly at the number or email you provided.</div>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="grid gap-5 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" id="name"><Input id="name" name="name" required /></Field>
            <Field label="Phone number" id="phone"><Input id="phone" name="phone" type="tel" required /></Field>
          </div>
          <Field label="Email" id="email"><Input id="email" name="email" type="email" required /></Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Move date" id="date"><Input id="date" name="date" type="date" /></Field>
            <Field label="Home size" id="size">
              <Select name="size">
                <SelectTrigger id="size"><SelectValue placeholder="Select size" /></SelectTrigger>
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

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Moving from (ZIP)" id="from"><Input id="from" name="from" placeholder="80202" /></Field>
            <Field label="Moving to (ZIP)" id="to"><Input id="to" name="to" placeholder="80014" /></Field>
          </div>

          <Field label="Anything else we should know?" id="notes">
            <Textarea id="notes" name="notes" rows={4} placeholder="Stairs, piano, storage, packing help..." />
          </Field>

          <Button type="submit" size="lg" className="w-full sm:w-auto sm:self-start">
            Request my free quote
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
