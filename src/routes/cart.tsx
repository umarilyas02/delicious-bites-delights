import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { findItem, formatPrice } from "@/lib/menu-data";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Delicious Bites" },
      { name: "description", content: "Review your order before checkout." },
      { property: "og:title", content: "Your Cart — Delicious Bites" },
      { property: "og:description", content: "Review your order before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal, count } = useCart();

  if (count === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-primary">
          <ShoppingBag className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-4xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Browse the menu and add a few favorites to get started.
        </p>
        <Link
          to="/menu"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Browse Menu <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold">Your Order</h1>
      <p className="mt-2 text-muted-foreground">
        {count} {count === 1 ? "item" : "items"} in your cart
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <ul className="lg:col-span-2 divide-y divide-border rounded-2xl bg-card p-2 sm:p-6"
          style={{ boxShadow: "var(--shadow-card)" }}>
          {lines.map((line) => {
            const item = findItem(line.id);
            if (!item) return null;
            return (
              <li key={line.id} className="py-5 flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[180px]">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category} · {formatPrice(item.price)}</p>
                </div>

                <div className="inline-flex items-center rounded-full border border-border">
                  <button
                    type="button"
                    onClick={() => setQty(line.id, line.qty - 1)}
                    className="h-9 w-9 inline-flex items-center justify-center text-foreground hover:text-primary"
                    aria-label="Decrease"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{line.qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(line.id, line.qty + 1)}
                    className="h-9 w-9 inline-flex items-center justify-center text-foreground hover:text-primary"
                    aria-label="Increase"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="w-20 text-right font-bold text-primary">
                  {formatPrice(item.price * line.qty)}
                </div>

                <button
                  type="button"
                  onClick={() => remove(line.id)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>

        <aside className="rounded-2xl bg-card p-6 h-fit lg:sticky lg:top-28"
          style={{ boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-xl font-bold">Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Fees</dt>
              <dd className="font-semibold">Calculated at checkout</dd>
            </div>
          </dl>
          <div className="mt-4 pt-4 border-t border-border flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-primary text-lg">{formatPrice(subtotal)}</span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Continue to Checkout <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/menu"
            className="mt-3 inline-flex w-full items-center justify-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Add more items
          </Link>
        </aside>
      </div>
    </div>
  );
}