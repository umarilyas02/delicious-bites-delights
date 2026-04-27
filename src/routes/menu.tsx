import { createFileRoute } from "@tanstack/react-router";
import menuPizza from "@/assets/menu-pizza.jpg";
import menuBurger from "@/assets/menu-burger.jpg";
import menuWrap from "@/assets/menu-wrap.jpg";
import menuPlatter from "@/assets/menu-platter.jpg";

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

type Item = { name: string; desc: string; price: string; tag?: string };
type Section = { title: string; subtitle: string; img: string; items: Item[] };

const sections: Section[] = [
  {
    title: "Wood-Fired Pizzas",
    subtitle: "Hand-stretched dough, blistered crusts",
    img: menuPizza,
    items: [
      { name: "Margherita Classica", desc: "San Marzano tomato, fior di latte, fresh basil", price: "$14", tag: "Signature" },
      { name: "Pepperoni Storm", desc: "Spicy pepperoni, mozzarella, oregano", price: "$16" },
      { name: "Truffle Funghi", desc: "Wild mushrooms, truffle oil, parmesan", price: "$19" },
      { name: "BBQ Chicken", desc: "Grilled chicken, smoky BBQ, red onion", price: "$17" },
      { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, parmesan, ricotta", price: "$18" },
      { name: "Veggie Garden", desc: "Bell peppers, olives, mushrooms, onion", price: "$15" },
    ],
  },
  {
    title: "Gourmet Burgers",
    subtitle: "Smashed patties, brioche buns",
    img: menuBurger,
    items: [
      { name: "Classic Smash", desc: "Double beef, American cheese, house sauce", price: "$12" },
      { name: "Spicy Jalapeño", desc: "Beef, jalapeños, pepper jack, chipotle mayo", price: "$13" },
      { name: "Crispy Chicken", desc: "Buttermilk chicken, slaw, pickles", price: "$11" },
      { name: "Mushroom Swiss", desc: "Beef, sautéed mushrooms, swiss cheese", price: "$13", tag: "Popular" },
      { name: "Veggie Stack", desc: "Black bean patty, avocado, sprouts", price: "$11" },
    ],
  },
  {
    title: "Fresh Wraps",
    subtitle: "Soft tortillas, vibrant fillings",
    img: menuWrap,
    items: [
      { name: "Chicken Shawarma Wrap", desc: "Marinated chicken, garlic sauce, pickles", price: "$9", tag: "Bestseller" },
      { name: "Falafel Crunch", desc: "Crispy falafel, tahini, fresh veg", price: "$8" },
      { name: "Beef Kofta Roll", desc: "Spiced beef, hummus, parsley", price: "$10" },
      { name: "Mediterranean Veg", desc: "Grilled veg, feta, tzatziki", price: "$8" },
    ],
  },
  {
    title: "Arabic Platters",
    subtitle: "Generous feasts to share",
    img: menuPlatter,
    items: [
      { name: "Mixed Grill Platter", desc: "Shish tawook, kofta, lamb chops, rice, salad", price: "$28", tag: "For 2" },
      { name: "Shawarma Platter", desc: "Chicken or beef, hummus, pickles, pita", price: "$18" },
      { name: "Mezze Feast", desc: "Hummus, baba ghanoush, tabbouleh, falafel, pita", price: "$22" },
      { name: "Lamb Mandi", desc: "Slow-cooked lamb, fragrant rice, raita", price: "$24" },
    ],
  },
];

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
        {sections.map((s, idx) => (
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
                <li key={it.name} className="py-5 flex justify-between gap-6">
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
                  <span className="text-lg font-bold text-primary whitespace-nowrap">{it.price}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}