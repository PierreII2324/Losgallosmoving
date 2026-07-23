import { createFileRoute } from "@tanstack/react-router";
import { Heart, Users, Award, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import job3 from "@/assets/job-3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Los Gallos Movers" },
      { name: "description", content: "Family-owned Colorado movers serving Denver and the Front Range with honest pricing and careful handling." },
      { property: "og:title", content: "About Los Gallos Movers" },
      { property: "og:description", content: "The family-run story behind Colorado's friendliest moving crew." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Family First", body: "We treat every home like it belongs to our own family." },
  { icon: Users, title: "Community", body: "Proudly local. Proudly Colorado. Proudly here to stay." },
  { icon: Award, title: "Craftsmanship", body: "From packing to loading, we take pride in every detail." },
  { icon: Sparkles, title: "Honest Pricing", body: "No hidden fees, no surprises. Ever." },
];

function About() {
  return (
    <div>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading
            eyebrow="Our Story"
            title="Built by family, for families."
            description="Los Gallos Movers started with a truck, two brothers, and a promise: to give Coloradans the kind of moving day they'd actually recommend to a friend. Years later, that promise still runs the show."
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-lg">
          <img src={job3} alt="Neatly packed boxes ready for moving" className="h-full w-full object-cover" loading="lazy" width={1200} height={900} />
        </div>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            We're a small, tight-knit crew from Denver who believe moving doesn't have to feel like an ambush of surprise fees and half-hearted service. When you book Los Gallos, you get the same team from your first phone call to the last box off the truck.
          </p>
          <p>
            We handle local moves, long-distance relocations across Colorado, packing, unpacking, and the heavy stuff nobody else wants to touch — pianos included. Whatever you're moving, we'll show up prepared and treat it right.
          </p>
          <p>
            The rooster? Around here it stands for waking up early, working hard, and standing your ground. That's how we run every job.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading eyebrow="What we stand for" title="Our values" center />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg border border-border bg-background p-6 shadow-sm">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg uppercase tracking-wide text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
