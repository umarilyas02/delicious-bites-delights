import { createFileRoute } from "@tanstack/react-router";
import menuPizza from "@/assets/menu-pizza.jpg";
import { Plus, Check, MessageCircle, ShoppingBag } from "lucide-react";
import { menuSections, findItem, formatPrice } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

const WHATSAPP_NUMBER = "923030838389";

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
      className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors min-h-10 active:scale-95 ${
        added
          ? "bg-emerald-600 text-white"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      }`}
      aria-label="Add to cart"
    >
      {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      {added ? "Added" : "Add to cart"}
    </button>
  );
}

function QuickOrderBar() {
  const { lines, subtotal, count } = useCart();

  if (count === 0) return null;

  const sendQuickOrder = () => {
    const itemLines = lines
      .map((l) => {
        const it = findItem(l.id);
        if (!it) return null;
        return `• ${l.qty}× ${it.name} — ${formatPrice(it.price * l.qty)}`;
      })
      .filter(Boolean)
      .join("\n");

    const message =
      `*Quick Order — Delicious Bites*\n\n` +
      `*Items*\n${itemLines}\n\n` +
      `*Total: ${formatPrice(subtotal)}*\n\n` +
      `Hi! I'd like to place this order. Please confirm availability and delivery/pickup details.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-6 pointer-events-none">
      <div
        className="pointer-events-auto mx-auto flex max-w-xl items-center gap-3 rounded-2xl bg-card p-3 sm:p-4"
        style={{ boxShadow: "var(--shadow-elegant, 0 10px 40px -10px rgba(0,0,0,0.35))" }}
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">{count} items</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground leading-tight">
            {count} {count === 1 ? "item" : "items"} · {formatPrice(subtotal)}
          </p>
          <p className="text-sm font-semibold leading-tight">Quick Order</p>
        </div>
        <button
          type="button"
          onClick={sendQuickOrder}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition-opacity active:scale-95 min-h-11"
          aria-label="Send order on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
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
      <QuickOrderBar />
      {/* spacer so last item isn't hidden behind the floating bar */}
      <div aria-hidden className="h-24" />
    </>
  );
}