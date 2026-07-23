import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import job1 from "@/assets/job-1.jpg";
import job2 from "@/assets/job-2.jpg";
import job3 from "@/assets/job-3.jpg";
import job4 from "@/assets/job-4.jpg";
import job5 from "@/assets/job-5.jpg";
import job6 from "@/assets/job-6.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "On The Job — Los Gallos Movers Gallery" },
      { name: "description", content: "See Los Gallos Movers in action across Colorado — real crews, real moves, real work." },
      { property: "og:title", content: "On The Job — Los Gallos Movers" },
      { property: "og:description", content: "Photos from real Colorado moving jobs." },
    ],
  }),
  component: Gallery,
});

const shots = [
  { src: job1, caption: "Loading day in the suburbs" },
  { src: job2, caption: "Careful truck loading" },
  { src: job3, caption: "Every box labeled and stacked" },
  { src: job4, caption: "Third-floor walk-up? No problem" },
  { src: job5, caption: "Yes, we move pianos" },
  { src: job6, caption: "Strapped, secured, ready to roll" },
];

function Gallery() {
  return (
    <div>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading
            eyebrow="On The Job"
            title="Real moves. Real work."
            description="A look at what a Los Gallos moving day actually looks like — from packing to the final box unloaded."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((s, i) => (
            <figure key={i} className="group relative overflow-hidden rounded-lg bg-card shadow-sm">
              <img
                src={s.src}
                alt={s.caption}
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium text-white">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
