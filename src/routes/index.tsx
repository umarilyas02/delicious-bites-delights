import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Clock, Award } from "lucide-react";
import heroPizza from "@/assets/hero-pizza.jpg";
import menuPizza from "@/assets/menu-pizza.jpg";
import menuBurger from "@/assets/menu-burger.jpg";
import menuWrap from "@/assets/menu-wrap.jpg";
import menuPlatter from "@/assets/menu-platter.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Delicious Bites — Wood-Fired Pizza, Burgers, Wraps & Arabic Platters" },
      { name: "description", content: "Welcome to Delicious Bites. Wood-fired pizzas, gourmet burgers, fresh wraps and Arabic platters made fresh to order." },
      { property: "og:image", content: heroPizza },
      { name: "twitter:image", content: heroPizza },
    ],
  }),
  component: HomePage,
});

const categories = [
  { name: "Pizzas", desc: "Wood-fired & loaded with flavor", img: menuPizza },
  { name: "Burgers", desc: "Juicy, smoky and stacked high", img: menuBurger },
  { name: "Wraps", desc: "Fresh, hand-rolled & herby", img: menuWrap },
  { name: "Arabic Platters", desc: "Grilled feasts to share", img: menuPlatter },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img
          src={heroPizza}
          alt="Wood-fired Margherita pizza"
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal">
              <Flame className="h-3.5 w-3.5" /> Fresh from the oven
            </span>
            <h1 className="mt-6 text-5xl md:text-7xl font-bold text-cream leading-[1.05]">
              Crafted with fire,<br />served with love.
            </h1>
            <p className="mt-6 text-lg text-cream/85 max-w-lg leading-relaxed">
              From wood-fired pizzas to lavish Arabic platters — Delicious Bites brings the world's most loved flavors under one roof.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
                style={{ boxShadow: "var(--shadow-warm)" }}
              >
                Explore Menu <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-cream/40 backdrop-blur-sm px-7 py-3.5 text-base font-semibold text-cream hover:bg-cream/10 transition-all"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-20 grid gap-8 md:grid-cols-3">
        {[
          { icon: Flame, title: "Wood-Fired", desc: "Authentic stone oven, blistered crusts" },
          { icon: Clock, title: "Fresh Daily", desc: "Dough made every morning, never frozen" },
          { icon: Award, title: "Loved by Locals", desc: "5-star rated across the city" },
        ].map((f) => (
          <div key={f.title} className="text-center p-6">
            <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold">{f.title}</h3>
            <p className="mt-2 text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Our Menu</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Something for every craving</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Four categories. Endless flavor combinations.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.name}
                to="/menu"
                className="group relative overflow-hidden rounded-2xl bg-card aspect-[3/4] block"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <img
                  src={c.img}
                  alt={c.name}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute bottom-0 p-6 text-cream">
                  <h3 className="text-2xl font-bold">{c.name}</h3>
                  <p className="mt-1 text-sm text-cream/80">{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div
          className="rounded-3xl p-12 md:p-16 text-center text-cream relative overflow-hidden"
          style={{ background: "var(--gradient-warm)" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight">
            Hungry? We deliver in 30 minutes.
          </h2>
          <p className="mt-4 text-cream/90 max-w-lg mx-auto">
            Call us, walk in, or order online — your perfect meal is moments away.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-3.5 text-base font-semibold text-primary hover:bg-cream/90 transition-all hover:scale-105"
          >
            Order Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}