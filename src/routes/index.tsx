import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Clock, Award, Plus, Check, X } from "lucide-react";
import { useState } from "react";
import heroPizza from "@/assets/hero-pizza.jpg";
import menuPizza from "@/assets/menu-pizza.jpg";
import menuBurger from "@/assets/menu-burger.jpg";
import menuWrap from "@/assets/menu-wrap.jpg";
import menuPlatter from "@/assets/menu-platter.jpg";
import {
  menuSections,
  formatPrice,
  groupItems,
  SIZE_LABEL,
  SIZE_RE,
  type MenuRow,
} from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Delicious Bites — Wood-Fired Pizza, Burgers, Wraps & Arabic Platters" },
      { name: "description", content: "Welcome to Delicious Bites. Wood-fired pizzas, gourmet burgers, fresh wraps and Arabic platters made fresh to order." },
      { property: "og:url", content: "https://delicious-bites-delights.vercel.app/" },
    ],
    links: [{ rel: "canonical", href: "https://delicious-bites-delights.vercel.app/" }],
  }),
  component: HomePage,
});

const categories = [
  { name: "Pizzas", desc: "Wood-fired & loaded with flavor", img: menuPizza },
  { name: "Burgers", desc: "Juicy, smoky and stacked high", img: menuBurger },
  { name: "Wraps", desc: "Fresh, hand-rolled & herby", img: menuWrap },
  { name: "Arabic Platters", desc: "Grilled feasts to share", img: menuPlatter },
];

// Pick 2 items from each of the 4 core categories so the featured grid shows
// real variety (and real photos) instead of repeating the first few pizza sections.
const FEATURED_SECTION_TITLES = ["Classic Pizza", "Burgers", "Paratha Rolls & Wraps", "Shawarma & Arabic Platter"];

const featuredRows: { row: MenuRow; img: string }[] = FEATURED_SECTION_TITLES.flatMap((title) => {
  const section = menuSections.find((s) => s.title === title);
  if (!section) return [];
  return groupItems(section.items)
    .slice(0, 1)
    .map((row) => ({ row, img: section.img }));
});

function SizePickerModal({
  group,
  img,
  onClose,
}: {
  group: Extract<MenuRow, { kind: "sized" }>["group"];
  img: string;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [size, setSize] = useState(group.variants[0].size);
  const [added, setAdded] = useState(false);
  const active = group.variants.find((v) => v.size === size) ?? group.variants[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-picker-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-sm bg-card rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-40">
          <img src={img} alt={group.baseName} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">
          <h2 id="size-picker-title" className="text-lg font-bold">{group.baseName}</h2>
          {group.desc && <p className="mt-1 text-sm text-muted-foreground">{group.desc}</p>}
          <p className="mt-4 text-sm font-medium text-foreground">Choose a size</p>
          <div role="radiogroup" aria-label={`Size for ${group.baseName}`} className="mt-3 grid grid-cols-2 gap-2">
            {group.variants.map((v) => {
              const selected = v.size === size;
              return (
                <button
                  key={v.size}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSize(v.size)}
                  className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-sm font-semibold">{SIZE_LABEL[v.size] ?? v.size}</span>
                  <span className="block text-sm font-bold text-primary">{formatPrice(v.item.price)}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => {
              add(active.item.id, 1);
              setAdded(true);
              window.setTimeout(onClose, 700);
            }}
            className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added to cart
              </>
            ) : (
              <>Add to Cart — {formatPrice(active.item.price)}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ row, img }: { row: MenuRow; img: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  if (row.kind === "single") {
    const item = row.item;
    const displayName = item.name.replace(SIZE_RE, "").trim();
    return (
      <div className="rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img src={img} alt={displayName} className="h-full w-full object-cover hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm text-foreground line-clamp-1">{displayName}</h3>
          {item.desc && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.desc}</p>}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-bold text-primary">{formatPrice(item.price)}</span>
            <button
              type="button"
              onClick={() => {
                add(item.id, 1);
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1200);
              }}
              aria-label="Add to cart"
              className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                added ? "bg-emerald-600 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { group } = row;
  const lowestPrice = group.variants[0].item.price;
  return (
    <>
      <div className="rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img src={img} alt={group.baseName} className="h-full w-full object-cover hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm text-foreground line-clamp-1">{group.baseName}</h3>
          {group.desc && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{group.desc}</p>}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-bold text-primary">From {formatPrice(lowestPrice)}</span>
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              aria-label={`Choose size for ${group.baseName}`}
              className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      {pickerOpen && <SizePickerModal group={group} img={img} onClose={() => setPickerOpen(false)} />}
    </>
  );
}

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

      {/* FEATURED ITEMS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Featured Items</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Our crowd favorites</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Handpicked dishes that keep customers coming back for more.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {featuredRows.map(({ row, img }) => (
            <FeaturedCard key={row.kind === "single" ? row.item.id : row.group.baseName} row={row} img={img} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-3 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            View Full Menu <ArrowRight className="h-4 w-4" />
          </Link>
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