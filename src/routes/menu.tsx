import { createFileRoute } from "@tanstack/react-router";
import menuPizza from "@/assets/menu-pizza.jpg";
import { Plus, Check, MessageCircle, ShoppingBag, X } from "lucide-react";
import {
  menuSections,
  findItem,
  formatPrice,
  groupItems,
  SIZE_LABEL,
  type SizedGroup,
} from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { useState, type FormEvent } from "react";
import { z } from "zod";

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

function SizedRow({ group }: { group: SizedGroup }) {
  const [size, setSize] = useState(group.variants[0].size);
  const active = group.variants.find((v) => v.size === size) ?? group.variants[0];
  return (
    <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 w-full">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-lg font-semibold">{group.baseName}</h3>
          {group.tag && (
            <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/30 text-charcoal">
              {group.tag}
            </span>
          )}
        </div>
        {group.desc && <p className="mt-1 text-sm text-muted-foreground">{group.desc}</p>}
        <div role="radiogroup" aria-label={`Size for ${group.baseName}`} className="mt-3 inline-flex flex-wrap gap-1.5 rounded-full border border-border p-1">
          {group.variants.map((v) => {
            const selected = v.size === size;
            return (
              <button
                key={v.size}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setSize(v.size)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title={v.size}
              >
                {SIZE_LABEL[v.size] ?? v.size}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
        <span className="text-lg font-bold text-primary whitespace-nowrap">{formatPrice(active.item.price)}</span>
        <AddButton id={active.item.id} />
      </div>
    </div>
  );
}

const quickOrderSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(25),
  method: z.enum(["pickup", "delivery"]),
  address: z.string().trim().max(250).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
}).refine((d) => d.method === "pickup" || (d.address && d.address.trim().length >= 5), {
  path: ["address"],
  message: "Address is required for delivery",
});

function QuickOrderModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lines, subtotal } = useCart();
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = quickOrderSchema.safeParse({ ...data, method });
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
        ? `Order Type: Pickup`
        : `Order Type: Delivery\nAddress: ${d.address}`;
    const notesLine = d.notes ? `\nNotes: ${d.notes}` : "";

    const message =
      `*Quick Order — Delicious Bites*\n\n` +
      `*Customer*\nName: ${d.name}\nPhone: ${d.phone}\n\n` +
      `*${methodBlock}*${notesLine}\n\n` +
      `*Items*\n${itemLines}\n\n` +
      `*Total: ${formatPrice(subtotal)}*`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  const inputCls =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-order-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md max-h-[92vh] overflow-y-auto bg-card rounded-t-2xl sm:rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-card px-5 py-4 border-b border-border">
          <h2 id="quick-order-title" className="text-lg font-bold">Your details</h2>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 inline-flex items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="qo-name">Full name</label>
            <input id="qo-name" name="name" className={inputCls} maxLength={100} required autoComplete="name" />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="qo-phone">Phone</label>
            <input id="qo-phone" name="phone" type="tel" className={inputCls} maxLength={25} required autoComplete="tel" placeholder="0300 1234567" />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>

          <div>
            <span className="text-sm font-medium">Order type</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["pickup", "delivery"] as const).map((opt) => {
                const active = method === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setMethod(opt)}
                    className={`rounded-lg border-2 px-3 py-2 text-sm font-semibold capitalize transition-colors ${
                      active ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/40"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {method === "delivery" && (
            <div>
              <label className="text-sm font-medium" htmlFor="qo-address">Delivery address</label>
              <textarea id="qo-address" name="address" rows={2} maxLength={250} className={inputCls} required autoComplete="street-address" placeholder="House, street, area, city" />
              {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
            </div>
          )}

          <div>
            <label className="text-sm font-medium" htmlFor="qo-notes">Notes <span className="text-muted-foreground">(optional)</span></label>
            <textarea id="qo-notes" name="notes" rows={2} maxLength={500} className={inputCls} placeholder="Allergies, special requests…" />
          </div>

          <div className="rounded-lg bg-secondary/40 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items total</span>
              <span className="font-bold text-primary">{formatPrice(subtotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:opacity-95 transition-opacity active:scale-95 min-h-12"
          >
            <MessageCircle className="h-4 w-4" />
            Send Order on WhatsApp
          </button>
          <p className="text-[11px] text-muted-foreground text-center">
            Sent to 0303 083 83 89 for confirmation.
          </p>
        </form>
      </div>
    </div>
  );
}

function QuickOrderBar() {
  const { subtotal, count } = useCart();
  const [open, setOpen] = useState(false);

  if (count === 0) return null;

  return (
    <>
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
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition-opacity active:scale-95 min-h-11"
          aria-label="Send order on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
    <QuickOrderModal open={open} onClose={() => setOpen(false)} />
    </>
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
              {groupItems(s.items).map((row) =>
                row.kind === "single" ? (
                  <li key={row.item.id} className="py-5 flex justify-between gap-6 items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-semibold">{row.item.name}</h3>
                        {row.item.tag && (
                          <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/30 text-charcoal">
                            {row.item.tag}
                          </span>
                        )}
                      </div>
                      {row.item.desc && <p className="mt-1 text-sm text-muted-foreground">{row.item.desc}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-lg font-bold text-primary whitespace-nowrap">{formatPrice(row.item.price)}</span>
                      <AddButton id={row.item.id} />
                    </div>
                  </li>
                ) : (
                  <li key={row.group.baseName} className="py-5">
                    <SizedRow group={row.group} />
                  </li>
                ),
              )}
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