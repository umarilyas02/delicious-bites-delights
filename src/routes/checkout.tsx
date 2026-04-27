import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { ArrowLeft, Store, Bike, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { findItem, formatPrice } from "@/lib/menu-data";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Delicious Bites" },
      { name: "description", content: "Choose pickup or delivery and place your order request." },
      { property: "og:title", content: "Checkout — Delicious Bites" },
      { property: "og:description", content: "Choose pickup or delivery and place your order request." },
    ],
  }),
  component: CheckoutPage,
});

const DELIVERY_FEE = 100; // Rs.
const WHATSAPP_NUMBER = "923030838389"; // 0303 083 83 89 in international format

const baseSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(25),
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

const pickupSchema = baseSchema.extend({
  method: z.literal("pickup"),
  pickupTime: z.string().trim().min(1, "Choose a pickup time").max(50),
});

const deliverySchema = baseSchema.extend({
  method: z.literal("delivery"),
  address: z.string().trim().min(5, "Address is required").max(250),
  city: z.string().trim().min(2, "City is required").max(80),
});

const orderSchema = z.discriminatedUnion("method", [pickupSchema, deliverySchema]);

function CheckoutPage() {
  const { lines, subtotal, count, clear } = useCart();
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const fee = method === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + fee;

  if (count === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">Nothing to checkout</h1>
        <p className="mt-3 text-muted-foreground">Add items to your cart first.</p>
        <Link to="/menu" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Browse Menu
        </Link>
      </div>
    );
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = orderSchema.safeParse({ ...data, method });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const orderId = `DB-${Date.now().toString(36).toUpperCase()}`;
    const d = parsed.data;
    const itemLines = lines
      .map((l) => {
        const it = findItem(l.id);
        if (!it) return null;
        return `• ${l.qty}× ${it.name} — ${formatPrice(it.price * l.qty)}`;
      })
      .filter(Boolean)
      .join("\n");

    const methodBlock =
      d.method === "pickup"
        ? `Order Type: Pickup\nPickup Time: ${d.pickupTime}`
        : `Order Type: Delivery\nAddress: ${d.address}\nCity: ${d.city}`;

    const message = [
      `*New Order — Delicious Bites*`,
      `Order ID: ${orderId}`,
      ``,
      `*Customer*`,
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      d.email ? `Email: ${d.email}` : null,
      ``,
      `*${methodBlock}*`,
      d.notes ? `Notes: ${d.notes}` : null,
      ``,
      `*Items*`,
      itemLines,
      ``,
      `Subtotal: ${formatPrice(subtotal)}`,
      d.method === "delivery" ? `Delivery Fee: ${formatPrice(fee)}` : `Pickup: Free`,
      `*Total: ${formatPrice(total)}*`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    clear();
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitting(false);
  };

  const inputCls =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">Checkout</h1>

      <form onSubmit={onSubmit} className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Method */}
          <section>
            <h2 className="text-xl font-bold">How would you like your order?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {([
                { key: "pickup", icon: Store, title: "Pickup", desc: "Ready in 20–30 min at our shop" },
                { key: "delivery", icon: Bike, title: "Delivery", desc: `Delivered to your door · ${formatPrice(DELIVERY_FEE)} fee` },
              ] as const).map((opt) => {
                const active = method === opt.key;
                return (
                  <button
                    type="button"
                    key={opt.key}
                    onClick={() => setMethod(opt.key)}
                    className={`text-left rounded-xl border-2 p-4 transition-colors ${
                      active
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <opt.icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="font-semibold">{opt.title}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold">Your details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium" htmlFor="name">Full name</label>
                <input id="name" name="name" className={inputCls} maxLength={100} required />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" className={inputCls} maxLength={25} required />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium" htmlFor="email">Email <span className="text-muted-foreground">(optional)</span></label>
                <input id="email" name="email" type="email" className={inputCls} maxLength={255} />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>
          </section>

          {/* Method-specific */}
          {method === "pickup" ? (
            <section>
              <h2 className="text-xl font-bold">Pickup time</h2>
              <div className="mt-4">
                <label className="text-sm font-medium" htmlFor="pickupTime">When should we have it ready?</label>
                <select id="pickupTime" name="pickupTime" className={inputCls} defaultValue="">
                  <option value="" disabled>Select a time</option>
                  <option value="ASAP">As soon as possible (~25 min)</option>
                  <option value="In 30 minutes">In 30 minutes</option>
                  <option value="In 1 hour">In 1 hour</option>
                  <option value="In 2 hours">In 2 hours</option>
                </select>
                {errors.pickupTime && <p className="mt-1 text-xs text-destructive">{errors.pickupTime}</p>}
              </div>
            </section>
          ) : (
            <section>
              <h2 className="text-xl font-bold">Delivery address</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium" htmlFor="address">Street address</label>
                  <input id="address" name="address" className={inputCls} maxLength={250} required />
                  {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium" htmlFor="city">City</label>
                  <input id="city" name="city" className={inputCls} maxLength={80} required />
                  {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
                </div>
              </div>
            </section>
          )}

          <section>
            <label className="text-sm font-medium" htmlFor="notes">Order notes <span className="text-muted-foreground">(optional)</span></label>
            <textarea id="notes" name="notes" rows={3} maxLength={500} className={inputCls} placeholder="Allergies, special requests…" />
          </section>
        </div>

        {/* Summary */}
        <aside className="rounded-2xl bg-card p-6 h-fit lg:sticky lg:top-28"
          style={{ boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-xl font-bold">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {lines.map((l) => {
              const it = findItem(l.id);
              if (!it) return null;
              return (
                <li key={l.id} className="flex justify-between gap-3">
                  <span className="text-foreground">
                    {l.qty}× {it.name}
                  </span>
                  <span className="font-medium">{formatPrice(it.price * l.qty)}</span>
                </li>
              );
            })}
          </ul>
          <dl className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">{method === "delivery" ? "Delivery fee" : "Pickup"}</dt>
              <dd className="font-semibold">{method === "delivery" ? formatPrice(fee) : "Free"}</dd>
            </div>
          </dl>
          <div className="mt-4 pt-4 border-t border-border flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-primary text-lg">{formatPrice(total)}</span>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:opacity-95 transition-opacity disabled:opacity-60"
          >
            <MessageCircle className="h-4 w-4" />
            {submitting ? "Opening WhatsApp…" : "Send Order on WhatsApp"}
          </button>
          <p className="mt-3 text-xs text-muted-foreground text-center">
            Your order will be sent to <span className="font-semibold">0303 083 83 89</span> on WhatsApp for confirmation.
          </p>
        </aside>
      </form>
    </div>
  );
}