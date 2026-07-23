import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Truck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Los Gallos Movers | 720-469-6078" },
      { name: "description", content: "Reach Los Gallos Movers by phone or email. Serving Denver and the Colorado Front Range." },
      { property: "og:title", content: "Contact Los Gallos Movers" },
      { property: "og:description", content: "Call 720-469-6078 or email us to schedule your move." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk about your move."
            description="Call, text, or email — whichever you prefer. Someone from the crew will get right back to you."
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <ContactCard icon={Phone} label="Main line" value="720-469-6078" href="tel:7204696078" />
          <ContactCard icon={Truck} label="Dispatch (add your number)" value="Add secondary dispatch #" muted />
          <ContactCard icon={Mail} label="Business email" value="info@losgallosmovers.com" href="mailto:info@losgallosmovers.com" muted />
          <ContactCard icon={MapPin} label="Service area" value="Denver & Colorado Front Range" />
          <ContactCard icon={Clock} label="Hours" value="Mon–Sat · 7am – 7pm · Sun by appointment" />
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Email and secondary phone are placeholders — swap them in when you're ready.
        </p>
      </section>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  muted = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  muted?: boolean;
}) {
  const inner = (
    <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
        <div className={`mt-1 text-lg font-semibold ${muted ? "text-muted-foreground" : "text-foreground"}`}>
          {value}
        </div>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
