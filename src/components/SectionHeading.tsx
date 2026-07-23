import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-4xl uppercase tracking-wide text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
