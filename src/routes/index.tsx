import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, ShieldCheck, Truck, Clock } from "lucide-react";
import heroImg from "@/assets/hero-skyline.jpg";
import rooster from "@/assets/rooster-logo.png";
import job1 from "@/assets/job-1.jpg";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Los Gallos Movers — Colorado Moving Company | 720-469-6078" },
      { name: "description", content: "Denver's family-run moving crew. Local & long-distance moves, packing, and heavy lifting. Get a free quote today." },
      { property: "og:title", content: "Los Gallos Movers — Colorado" },
      { property: "og:description", content: "Denver's family-run moving crew. Free quotes, honest pricing." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Denver Colorado skyline at sunset"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
        <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
          <img src={rooster} alt="" className="mb-6 h-24 w-24 drop-shadow-lg" width={96} height={96} />
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/90">
            <span className="border-b-2 border-primary pb-1">Colorado</span>
          </div>
          <h1 className="font-display text-5xl uppercase tracking-wide text-white drop-shadow-md sm:text-7xl lg:text-8xl">
            Los Gallos Movers
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            Careful hands, honest pricing, and a crew that shows up on time. Denver's family-run moving company.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:7204696078"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              <Phone className="h-4 w-4" /> 720-469-6078
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Local & Long Distance", body: "In-town moves to full cross-Colorado relocations." },
            { icon: ShieldCheck, title: "Careful & Insured", body: "Padded, wrapped, and handled like it's our own." },
            { icon: Clock, title: "On Time, Every Time", body: "We show up when we say we will. Simple as that." },
          ].map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-md bg-primary/10 text-primary">
                <f.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg uppercase tracking-wide text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About Us"
              title={<>Movers who <span className="text-primary">actually care</span></>}
              description="Los Gallos Movers is a family-owned Colorado moving company built on the idea that moving day shouldn't be a nightmare. We treat your things like ours, and we treat you like a neighbor."
            />
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg shadow-[var(--shadow-warm)]">
            <img src={job1} alt="Los Gallos crew loading a couch" className="h-full w-full object-cover" loading="lazy" width={1200} height={900} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-sunset)" }} />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <h2 className="font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
            Ready to move? We're ready to help.
          </h2>
          <p className="mt-4 text-white/90">Free, no-obligation quotes. Straight talk, fair prices.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/quote" className="rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/90">
              Get My Free Quote
            </Link>
            <Link to="/contact" className="rounded-md border border-white/60 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
