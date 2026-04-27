import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/menu-data";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Received — Delicious Bites" },
      { name: "description", content: "Thanks for your order. We'll be in touch shortly to confirm." },
      { property: "og:title", content: "Order Received — Delicious Bites" },
      { property: "og:description", content: "Thanks for your order. We'll be in touch shortly to confirm." },
    ],
  }),
  component: ConfirmationPage,
});

type StoredOrder = {
  id: string;
  placedAt: string;
  details: {
    method: "pickup" | "delivery";
    name: string;
    phone: string;
    email?: string;
    notes?: string;
    pickupTime?: string;
    address?: string;
    city?: string;
  };
  items: { id: string; name: string; price: number; qty: number }[];
  subtotal: number;
  fee: number;
  total: number;
};

function ConfirmationPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("db_last_order");
      if (raw) setOrder(JSON.parse(raw) as StoredOrder);
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  if (loaded && !order) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">No recent order found</h1>
        <p className="mt-3 text-muted-foreground">Place an order from our menu to get started.</p>
        <Link to="/menu" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Browse Menu
        </Link>
      </div>
    );
  }

  if (!order) return <div className="mx-auto max-w-2xl px-6 py-24" />;

  const d = order.details;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-4xl md:text-5xl font-bold">Order received!</h1>
        <p className="mt-3 text-muted-foreground">
          Thanks {d.name.split(" ")[0]}. We'll call <span className="font-semibold text-foreground">{d.phone}</span> to confirm your order shortly.
        </p>
      </div>

      <div className="mt-10 rounded-2xl bg-card p-6 sm:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex flex-wrap justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Order ID</p>
            <p className="font-bold">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Method</p>
            <p className="font-bold capitalize">{d.method}</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-secondary/40 p-4 text-sm">
          {d.method === "pickup" ? (
            <p><span className="font-semibold">Pickup:</span> {d.pickupTime}</p>
          ) : (
            <p><span className="font-semibold">Delivering to:</span> {d.address}, {d.city}</p>
          )}
          {d.notes && (
            <p className="mt-2"><span className="font-semibold">Notes:</span> {d.notes}</p>
          )}
        </div>

        <ul className="mt-6 divide-y divide-border">
          {order.items.map((it) => (
            <li key={it.id} className="py-3 flex justify-between text-sm">
              <span>{it.qty}× {it.name}</span>
              <span className="font-semibold">{formatPrice(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-semibold">{formatPrice(order.subtotal)}</dd>
          </div>
          {order.fee > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery fee</dt>
              <dd className="font-semibold">{formatPrice(order.fee)}</dd>
            </div>
          )}
          <div className="flex justify-between text-base pt-2 border-t border-border">
            <dt className="font-bold">Total</dt>
            <dd className="font-bold text-primary">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Order something else <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}