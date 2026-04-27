import menuPizza from "@/assets/menu-pizza.jpg";
import menuBurger from "@/assets/menu-burger.jpg";
import menuWrap from "@/assets/menu-wrap.jpg";
import menuPlatter from "@/assets/menu-platter.jpg";

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  tag?: string;
  category: string;
};

export type MenuSection = {
  title: string;
  subtitle: string;
  img: string;
  items: MenuItem[];
};

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const make = (
  category: string,
  items: Omit<MenuItem, "id" | "category">[],
): MenuItem[] => items.map((it) => ({ ...it, id: slug(it.name), category }));

export const menuSections: MenuSection[] = [
  {
    title: "Wood-Fired Pizzas",
    subtitle: "Hand-stretched dough, blistered crusts",
    img: menuPizza,
    items: make("Pizza", [
      { name: "Margherita Classica", desc: "San Marzano tomato, fior di latte, fresh basil", price: 14, tag: "Signature" },
      { name: "Pepperoni Storm", desc: "Spicy pepperoni, mozzarella, oregano", price: 16 },
      { name: "Truffle Funghi", desc: "Wild mushrooms, truffle oil, parmesan", price: 19 },
      { name: "BBQ Chicken", desc: "Grilled chicken, smoky BBQ, red onion", price: 17 },
      { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, parmesan, ricotta", price: 18 },
      { name: "Veggie Garden", desc: "Bell peppers, olives, mushrooms, onion", price: 15 },
    ]),
  },
  {
    title: "Gourmet Burgers",
    subtitle: "Smashed patties, brioche buns",
    img: menuBurger,
    items: make("Burger", [
      { name: "Classic Smash", desc: "Double beef, American cheese, house sauce", price: 12 },
      { name: "Spicy Jalapeño", desc: "Beef, jalapeños, pepper jack, chipotle mayo", price: 13 },
      { name: "Crispy Chicken", desc: "Buttermilk chicken, slaw, pickles", price: 11 },
      { name: "Mushroom Swiss", desc: "Beef, sautéed mushrooms, swiss cheese", price: 13, tag: "Popular" },
      { name: "Veggie Stack", desc: "Black bean patty, avocado, sprouts", price: 11 },
    ]),
  },
  {
    title: "Fresh Wraps",
    subtitle: "Soft tortillas, vibrant fillings",
    img: menuWrap,
    items: make("Wrap", [
      { name: "Chicken Shawarma Wrap", desc: "Marinated chicken, garlic sauce, pickles", price: 9, tag: "Bestseller" },
      { name: "Falafel Crunch", desc: "Crispy falafel, tahini, fresh veg", price: 8 },
      { name: "Beef Kofta Roll", desc: "Spiced beef, hummus, parsley", price: 10 },
      { name: "Mediterranean Veg", desc: "Grilled veg, feta, tzatziki", price: 8 },
    ]),
  },
  {
    title: "Arabic Platters",
    subtitle: "Generous feasts to share",
    img: menuPlatter,
    items: make("Platter", [
      { name: "Mixed Grill Platter", desc: "Shish tawook, kofta, lamb chops, rice, salad", price: 28, tag: "For 2" },
      { name: "Shawarma Platter", desc: "Chicken or beef, hummus, pickles, pita", price: 18 },
      { name: "Mezze Feast", desc: "Hummus, baba ghanoush, tabbouleh, falafel, pita", price: 22 },
      { name: "Lamb Mandi", desc: "Slow-cooked lamb, fragrant rice, raita", price: 24 },
    ]),
  },
];

export const allItems: MenuItem[] = menuSections.flatMap((s) => s.items);

export const findItem = (id: string) => allItems.find((i) => i.id === id);

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;