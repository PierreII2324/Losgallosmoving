import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — Los Gallos Movers" },
      { name: "description", content: "See what Colorado customers say about Los Gallos Movers. Real reviews from real moves." },
      { property: "og:title", content: "Customer Reviews — Los Gallos Movers" },
      { property: "og:description", content: "5-star reviews from Denver and beyond." },
    ],
  }),
  component: Reviews,
});

const reviews = [
  { name: "Amanda R.", city: "Denver, CO", text: "Los Gallos made our move painless. On time, super careful with our furniture, and just genuinely nice guys. Worth every penny." },
  { name: "Jason & Mel", city: "Aurora, CO", text: "We've moved five times in ten years and this was hands-down the best experience. No hidden fees, no drama. Just done." },
  { name: "Priya K.", city: "Boulder, CO", text: "They moved a heavy upright piano up two flights of stairs without a single scratch. Absolute pros." },
  { name: "Marcus T.", city: "Lakewood, CO", text: "Booked them last-minute after another company flaked. They saved my move. I'll never call anyone else." },
  { name: "Elena V.", city: "Fort Collins, CO", text: "Quoted honestly, showed up early, and hustled the whole day. My kids thought the rooster logo was the coolest thing ever." },
  { name: "Derek H.", city: "Colorado Springs, CO", text: "Cross-town move handled in half the time I expected. Careful with the fragile stuff, and no surprise charges at the end." },
];

function Reviews() {
  return (
    <div>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading
            eyebrow="Reviews"
            title="What Coloradans say."
            description="We're proud of the reputation we've built one move at a time."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <article key={i} className="relative rounded-lg border border-border bg-card p-6 shadow-sm">
              <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/15" />
              <div className="mb-3 flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">"{r.text}"</p>
              <div className="mt-5 border-t border-border pt-4">
                <div className="font-semibold text-foreground">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.city}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/quote" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Get your free quote
          </Link>
        </div>
      </section>
    </div>
  );
}
