import { createFileRoute } from "@tanstack/react-router";
import menuPizza from "@/assets/menu-pizza.jpg";
import { Plus, Check } from "lucide-react";
import { menuSections, formatPrice } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Delicious Bites" },
      { name: "description", content: "Browse our full menu: wood-fired pizzas, gourmet burgers, fresh wraps and Arabic platters." },
      { property: "og:title", content: "Menu — Delicious Bites" },
      { property: "og:description", content: "Browse our full menu: pizzas, burgers, wraps and Arabic platters." },
      { property: "og:image", content: menuPizza },
    ],
  }),
  component: MenuPage,
});

function AddButton({ id }: { id: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        add(id, 1);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1200);
      }}
      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      aria-label="Add to cart"
    >
      {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      {added ? "Added" : "Add"}
    </button>
  );
}

function MenuPage() {
  return (
    <>
      <section className="bg-secondary/40 py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Our Menu</span>
          <h1 className="mt-3 text-5xl md:text-6xl font-bold">A taste of everything you love</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Every dish is made fresh to order with locally-sourced ingredients.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20 space-y-24">
        {menuSections.map((s, idx) => (
          <section key={s.title} className="grid gap-12 lg:grid-cols-5 items-start">
            <div className={`lg:col-span-2 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="sticky top-28">
                <div
                  className="rounded-2xl overflow-hidden aspect-square"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="mt-6 text-3xl font-bold">{s.title}</h2>
                <p className="mt-2 text-muted-foreground">{s.subtitle}</p>
              </div>
            </div>

            <ul className="lg:col-span-3 divide-y divide-border">
              {s.items.map((it) => (
                <li key={it.id} className="py-5 flex justify-between gap-6 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold">{it.name}</h3>
                      {it.tag && (
                        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/30 text-charcoal">
                          {it.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-lg font-bold text-primary whitespace-nowrap">{formatPrice(it.price)}</span>
                    <AddButton id={it.id} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}