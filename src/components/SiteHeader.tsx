import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import rooster from "@/assets/rooster-logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/team", label: "Team" },
  { to: "/reviews", label: "Reviews" },
  { to: "/quote", label: "Free Quote" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={rooster} alt="Los Gallos Movers rooster logo" className="h-9 w-9" width={36} height={36} />
          <div className="leading-tight">
            <div className="font-display text-lg tracking-wide text-foreground">LOS GALLOS</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Movers</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:7204696078"
            className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            720-469-6078
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                    activeProps={{ className: "bg-muted text-primary" }}
                    activeOptions={{ exact: n.to === "/" }}
                  >
                    {n.label}
                  </Link>
                ))}
                <a
                  href="tel:7204696078"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                >
                  <Phone className="h-4 w-4" />
                  720-469-6078
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
