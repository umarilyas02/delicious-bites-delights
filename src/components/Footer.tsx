import { Pizza, Instagram, Facebook, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <Pizza className="h-7 w-7 text-accent" />
            <span className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              Delicious Bites
            </span>
          </Link>
          <p className="mt-4 text-sm text-cream/70 max-w-sm leading-relaxed">
            Hand-crafted pizzas, juicy burgers, fresh wraps and lavish Arabic platters — made with love since day one.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="#" aria-label="Instagram" className="h-10 w-10 rounded-full bg-cream/10 hover:bg-primary transition-colors flex items-center justify-center">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="h-10 w-10 rounded-full bg-cream/10 hover:bg-primary transition-colors flex items-center justify-center">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Visit</h4>
          <p className="text-sm text-cream/70 leading-relaxed">
            Chenab Rangers Road<br />
            Near Cash & Carry<br />
            Open 11am – 11pm
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Order</h4>
          <a href="tel:+923030838389" className="flex items-center gap-2 text-sm text-cream/70 hover:text-cream transition-colors">
            <Phone className="h-4 w-4" /> 0303 083 83 89
          </a>
          <a href="tel:+925245819199" className="mt-2 flex items-center gap-2 text-sm text-cream/70 hover:text-cream transition-colors">
            <Phone className="h-4 w-4" /> 0524 581 919
          </a>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50 flex flex-col sm:flex-row gap-2 justify-center items-center">
        <span>© {new Date().getFullYear()} Delicious Bites. All rights reserved.</span>
        <span className="hidden sm:inline">·</span>
        <Link to="/settings/message-template" className="hover:text-cream transition-colors underline-offset-4 hover:underline">
          Edit WhatsApp message template
        </Link>
      </div>
    </footer>
  );
}