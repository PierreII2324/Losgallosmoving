import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import rooster from "@/assets/rooster-logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={rooster} alt="" className="h-10 w-10" width={40} height={40} />
            <div>
              <div className="font-display text-xl">LOS GALLOS</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Movers · Colorado</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-background/70">
            Family-run Colorado movers proudly serving Denver and the Front Range.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide">Company</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/team" className="hover:text-primary">Our Team</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">On The Job</Link></li>
            <li><Link to="/reviews" className="hover:text-primary">Reviews</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide">Get Started</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/quote" className="hover:text-primary">Free Quote</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide">Reach Us</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 720-469-6078</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@losgallosmovers.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Denver, Colorado</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 py-5 text-center text-xs text-background/50">
        © {new Date().getFullYear()} Los Gallos Movers. All rights reserved.
      </div>
    </footer>
  );
}
