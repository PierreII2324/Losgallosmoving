import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";
import t4 from "@/assets/team-4.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Los Gallos Movers" },
      { name: "description", content: "Meet the Los Gallos Movers crew — the family behind Colorado's friendliest moving company." },
      { property: "og:title", content: "Meet the Los Gallos Movers Team" },
      { property: "og:description", content: "The people who show up when it's time to move." },
    ],
  }),
  component: Team,
});

const team = [
  { name: "Miguel Reyes", role: "Founder & Owner", photo: t1, bio: "Started the company with one truck and a lot of coffee. Still on the job most days." },
  { name: "Sofia Alvarez", role: "Operations Manager", photo: t2, bio: "Runs the schedule, the crews, and probably your day-of logistics too." },
  { name: "Diego Marín", role: "Lead Driver", photo: t3, bio: "Knows every shortcut from Fort Collins to Pueblo. Backs a 26-footer like it's a hatchback." },
  { name: "Carlos Núñez", role: "Crew Chief", photo: t4, bio: "The guy you want carrying your grandma's china cabinet. Careful, calm, always positive." },
];

function Team() {
  return (
    <div>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading
            eyebrow="Our Team"
            title="The crew behind the rooster."
            description="Same faces, every job. When you book us, this is who shows up at your door."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <article key={m.name} className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl uppercase tracking-wide text-foreground">{m.name}</h3>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">{m.role}</div>
                <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
