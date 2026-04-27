import { createFileRoute } from "@tanstack/react-router";
import { Heart, Users, Leaf } from "lucide-react";
import heroPizza from "@/assets/hero-pizza.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Delicious Bites" },
      { name: "description", content: "Our story: a family kitchen turned neighborhood favorite, serving authentic flavors with love." },
      { property: "og:title", content: "About Delicious Bites" },
      { property: "og:description", content: "A family kitchen turned neighborhood favorite." },
      { property: "og:image", content: heroPizza },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative py-28 overflow-hidden">
        <img src={heroPizza} alt="" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center text-cream">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Our Story</span>
          <h1 className="mt-3 text-5xl md:text-6xl font-bold">Born in a kitchen.<br />Raised by the neighborhood.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 space-y-6 text-lg text-foreground/80 leading-relaxed">
        <p>
          Delicious Bites started with a simple idea: bring together the world's most loved comfort foods under one welcoming roof. From the smoky char of a wood-fired pizza to the fragrant spices of an Arabic platter — every dish tells a story.
        </p>
        <p>
          Our chefs blend tradition with creativity. We knead our own dough every morning, marinate our meats overnight, and never compromise on the small things — because the small things are everything.
        </p>
        <p>
          Whether you're swinging by for a quick wrap on your lunch break or gathering the family around a generous platter, we promise one thing: a meal made with care.
        </p>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-3">
          {[
            { icon: Heart, title: "Made with love", desc: "Every dish is hand-prepared by chefs who care." },
            { icon: Leaf, title: "Fresh ingredients", desc: "Locally sourced, never frozen, always seasonal." },
            { icon: Users, title: "Community first", desc: "We're proud to feed our neighborhood every day." },
          ].map((v) => (
            <div key={v.title} className="bg-card rounded-2xl p-8 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}