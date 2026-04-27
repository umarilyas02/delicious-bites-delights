import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Order — Delicious Bites" },
      { name: "description", content: "Visit, call, or order from Delicious Bites. Open daily 11am – 11pm." },
      { property: "og:title", content: "Contact Delicious Bites" },
      { property: "og:description", content: "Visit, call, or order. Open daily 11am – 11pm." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="bg-secondary/40 py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Get in touch</span>
          <h1 className="mt-3 text-5xl md:text-6xl font-bold">Come hungry. Leave happy.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Drop by, call ahead, or send us a message — we'd love to feed you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          {[
            { icon: MapPin, title: "Visit Us", lines: ["Chenab Rangers Road", "Near Cash & Carry"] },
            { icon: Phone, title: "Call to Order", lines: ["0303 083 83 89", "0524 581 919"] },
            { icon: MessageCircle, title: "WhatsApp Order", lines: ["0303 083 83 89"] },
            { icon: Clock, title: "Opening Hours", lines: ["Monday – Sunday", "11:00 AM – 11:00 PM"] },
          ].map((c) => (
            <div key={c.title} className="flex gap-5 p-6 rounded-2xl bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-muted-foreground">{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form
          className="bg-card rounded-2xl p-8 space-y-5"
          style={{ boxShadow: "var(--shadow-card)" }}
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks! We'll be in touch shortly.");
          }}
        >
          <h2 className="text-2xl font-bold">Send us a message</h2>
          <div className="space-y-4">
            <input
              type="text"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            />
            <input
              type="email"
              required
              placeholder="Your email"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            />
            <textarea
              required
              placeholder="Your message or order"
              rows={5}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
            style={{ boxShadow: "var(--shadow-warm)" }}
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}