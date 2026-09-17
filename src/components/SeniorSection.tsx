import { HeartHandshake, PackageCheck, CalendarClock, Building2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import seniorImg from "@/assets/senior-move.jpg";

const points = [
  {
    icon: HeartHandshake,
    title: "Calm, patient crews",
    body: "We move at your pace — no rushing, no pressure, and plenty of care with every item.",
  },
  {
    icon: PackageCheck,
    title: "Downsizing & packing help",
    body: "From sorting a lifetime of belongings to packing the last box, we handle it gently.",
  },
  {
    icon: Building2,
    title: "Senior community moves",
    body: "We coordinate directly with senior living communities so move-in day goes smoothly.",
  },
  {
    icon: CalendarClock,
    title: "Urgent moves welcome",
    body: "Need to get settled fast? We prioritize quick, careful moves for seniors.",
  },
];

export function SeniorSection() {
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-lg shadow-[var(--shadow-warm)]">
              <img
                src={seniorImg}
                alt="Movers carefully helping a senior with a moving box"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1200}
                height={900}
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Senior Moving Specialists"
              title={<>Moving seniors with <span className="text-primary">extra care</span></>}
              description="For the past 4 years, a big part of our work has been helping seniors and senior communities across Colorado. Our focus is simple: calm, careful, and quick moves that get you comfortable in your new home as fast as possible."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {points.map((p) => (
                <div key={p.title} className="flex gap-3">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-primary/10 text-primary">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
