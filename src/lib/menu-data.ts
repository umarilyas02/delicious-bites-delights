import menuPizza from "@/assets/menu-pizza.jpg";
import menuBurger from "@/assets/menu-burger.jpg";
import menuWrap from "@/assets/menu-wrap.jpg";
import menuPlatter from "@/assets/arabic-platter-real.jpg";

export type MenuItem = {
  id: string;
  name: string;
  desc?: string;
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
): MenuItem[] => {
  const seen = new Set<string>();
  return items.map((it) => {
    let id = slug(it.name);
    let i = 2;
    while (seen.has(id)) {
      id = `${slug(it.name)}-${i++}`;
    }
    seen.add(id);
    return { ...it, id, category };
  });
};

export const menuSections: MenuSection[] = [
  {
    title: "Pizzas",
    subtitle: "Classic, Royal & Signature — small to XL",
    img: menuPizza,
    items: make("Pizza", [
      // Classic
      { name: "Chicken Tikka Pizza (Small)", desc: "BBQ chicken, cheese, peppers, olives, tomatoes, onions, jalapeños", price: 750, tag: "Classic" },
      { name: "Chicken Tikka Pizza (Medium)", price: 1300, tag: "Classic" },
      { name: "Chicken Tikka Pizza (Large)", price: 1550, tag: "Classic" },
      { name: "Chicken Tikka Pizza (XL)", price: 1900, tag: "Classic" },
      { name: "Chicken Fajita Pizza (Medium)", desc: "Fajita chicken, cheese, peppers, olives, tomatoes, onions", price: 1300, tag: "Classic" },
      { name: "Chicken Tandori Pizza (Medium)", desc: "Tandoori chicken, cheese, tomatoes, onions", price: 1300, tag: "Classic" },
      { name: "Hot & Spicy Pizza (Medium)", desc: "BBQ chicken, cheese, peppers, olives, tomatoes, onions", price: 1300, tag: "Classic" },
      { name: "Achari Pizza (Medium)", desc: "Special achari chicken, cheese, peppers, olives, tomatoes, onions", price: 1300, tag: "Classic" },
      { name: "Cheese Lover Pizza (Medium)", desc: "Special white sauce + lots of cheese", price: 1300, tag: "Classic" },
      { name: "Mexican Pizza (Medium)", desc: "Mexican chicken, sweet corn, peppers, olives, jalapeños, mushrooms", price: 1300, tag: "Classic" },
      { name: "Veggie Pizza (Medium)", desc: "Sweet corn, cheese, sweet peppers, onions, olives, jalapeños, mushrooms", price: 1300, tag: "Classic" },
      // Royal
      { name: "Crown Pizza (Medium)", desc: "BBQ chicken, cheese, peppers, olives, tomatoes, onions, jalapeños", price: 1450, tag: "Royal" },
      { name: "Kabab Slice Pizza (Medium)", desc: "Chicken, cheese, peppers, olives, beef kabab", price: 1450, tag: "Royal" },
      { name: "Malai Boti Pizza (Medium)", desc: "Malai chicken, cheese, tomatoes, onions, special malai sauce", price: 1450, tag: "Royal" },
      { name: "Multi Flavoured Pizza (Medium)", desc: "Choose your own flavour", price: 1450, tag: "Royal" },
      { name: "Donner Pizza (Medium)", desc: "Chicken, extra cheese, peppers, olives, tomatoes, onions, jalapeños, mushrooms", price: 1450, tag: "Royal" },
      // Signature
      { name: "Behari Kabab Pizza (Medium)", desc: "Chicken, cheese, peppers, olives, tomatoes, onions, beef kabab on each slice", price: 1500, tag: "Signature" },
      { name: "Kabab Crust Stuffed Pizza (Medium)", desc: "Chicken, cheese, peppers, olives, tomatoes, onions, beef kabab crust filled", price: 1500, tag: "Signature" },
      { name: "Shahi Malai Donner Pizza (Medium)", desc: "Malai chicken, cheese, special malai sauce", price: 1500, tag: "Signature" },
      { name: "Double Donner Pizza (Medium)", desc: "Double topping", price: 1500, tag: "Signature" },
      { name: "Malai Crown Pizza (Medium)", price: 1500, tag: "Signature" },
      { name: "Kabab Crown Pizza (Medium)", desc: "Special chicken, cheese, peppers, olives, tomatoes, onions, jalapeños, mushrooms, beef kabab", price: 1500, tag: "Signature" },
    ]),
  },
  {
    title: "Pizza Deals",
    subtitle: "Combo deals with sides & drinks",
    img: menuPizza,
    items: make("Pizza Deal", [
      { name: "Pizza Deal D-1", desc: "1 Small Pizza (classic flavours), 1 Small Fries, 1 NR drink", price: 1000, tag: "Deal" },
      { name: "Pizza Deal D-2", desc: "1 Medium Pizza, 1 Small Fries, 2 NR drinks", price: 1600, tag: "Deal" },
      { name: "Pizza Deal D-3", desc: "1 Large Pizza, 1 Small Fries, 1.5 Ltr drink", price: 1800, tag: "Deal" },
      { name: "Pizza Deal D-4", desc: "1 XL Pizza, 1 Large Fries, 1.5 Ltr drink", price: 2200, tag: "Deal" },
      { name: "Pizza Deal D-5", desc: "3 Small Pizzas, 4 Nuggets, 1.5 Ltr drink", price: 2600, tag: "Deal" },
      { name: "Pizza Deal D-6", desc: "1 Small + 1 Medium + 1 Large Pizza, 1.5 Ltr drink", price: 3500, tag: "Deal" },
      { name: "Delicious Bites Special Offer", desc: "1 Large Pizza, 1 Shawarma, 1.5 Ltr Drink, 5 Pcs Hot Wings", price: 2400, tag: "Bestseller" },
    ]),
  },
  {
    title: "Burgers",
    subtitle: "Classic patties to tower stacks",
    img: menuBurger,
    items: make("Burger", [
      { name: "Zinger Burger", price: 380 },
      { name: "Chicken Petty Burger", price: 320 },
      { name: "Mighty Petty Burger", price: 600 },
      { name: "Zinger Cheese Burger", price: 450 },
      { name: "Chicken Cheese Burger", price: 400 },
      { name: "Grill Burger", price: 500, tag: "Popular" },
      { name: "Tower Burger", price: 550 },
      { name: "Chicken Botti Burger", price: 300 },
      { name: "Chicken Botti Cheese Burger", price: 350 },
    ]),
  },
  {
    title: "Burger Deals",
    subtitle: "Zinger & Petty burger combos",
    img: menuBurger,
    items: make("Burger Deal", [
      { name: "Burger D-1", desc: "1 Zinger Burger, 1 Small Fries, 1 Regular Drink", price: 650, tag: "Deal" },
      { name: "Burger D-2", desc: "2 Zinger Burgers, 2 Regular Drinks", price: 850, tag: "Deal" },
      { name: "Burger D-3", desc: "3 Zinger Burgers, 1 Ltr Drink", price: 1150, tag: "Deal" },
      { name: "Burger D-4", desc: "4 Zinger Burgers, 1 Ltr Drink", price: 1500, tag: "Deal" },
      { name: "Burger D-5", desc: "5 Zinger Burgers, 1.5 Ltr Drink, 1 Small Fries", price: 2000, tag: "Deal" },
      { name: "Petty Deal 1", desc: "1 Petty Burger, 2 Nuggets, 1 Regular Drink", price: 499, tag: "Deal" },
      { name: "Petty Deal 2", desc: "2 Petty Burgers, 2 Regular Drinks", price: 750, tag: "Deal" },
      { name: "Petty Deal 3", desc: "3 Petty Burgers, 1 Litre Drink", price: 1000, tag: "Deal" },
      { name: "Petty Deal 4", desc: "4 Petty Burgers, 1 Litre Drink", price: 1300, tag: "Deal" },
      { name: "Petty Deal 5", desc: "5 Petty Burgers, 1.5 Litre Drink", price: 1530, tag: "Deal" },
      { name: "Kids Deal", desc: "Small Fries, 4 Nuggets", price: 480, tag: "Kids" },
    ]),
  },
  {
    title: "Wraps & Paratha Rolls",
    subtitle: "Soft tortillas & flaky paratha rolls",
    img: menuWrap,
    items: make("Wrap", [
      { name: "Chicken Wrap", price: 320 },
      { name: "Zinger Wrap", price: 380 },
      { name: "Grill Chicken Wrap", price: 420 },
      { name: "Arabic Wrap", price: 450 },
      { name: "Chicken Paratha Roll", price: 300 },
      { name: "Zinger Paratha Roll", price: 350 },
      { name: "Chicken Cheese Paratha Roll", price: 380 },
      { name: "Zinger Cheese Paratha Roll", price: 400 },
      { name: "Kabab Paratha Roll", price: 350 },
      { name: "Paratha Sandwich", price: 300 },
    ]),
  },
  {
    title: "Wrap Deals",
    subtitle: "Chicken wrap combos with nuggets & drinks",
    img: menuWrap,
    items: make("Wrap Deal", [
      { name: "Wrap Deal 1", desc: "1 Chicken Wrap, 2 Nuggets, 1 Regular Drink", price: 480, tag: "Deal" },
      { name: "Wrap Deal 2", desc: "2 Chicken Wraps, 4 Nuggets, 2 Regular Drinks", price: 950, tag: "Deal" },
      { name: "Wrap Deal 3", desc: "3 Chicken Wraps, 6 Nuggets, 1 Litre Drink", price: 1300, tag: "Deal" },
      { name: "Wrap Deal 4", desc: "4 Chicken Wraps, 8 Nuggets, 1.5 Litre Drink", price: 1700, tag: "Deal" },
      { name: "Wrap Deal 5", desc: "5 Chicken Wraps, 10 Nuggets, 1.5 Litre Drink", price: 2250, tag: "Deal" },
    ]),
  },
  {
    title: "Shawarma & Arabic Platters",
    subtitle: "Shawarmas, Arabic platter & shawarma deals",
    img: menuPlatter,
    items: make("Shawarma", [
      { name: "Chicken Shawarma", price: 250 },
      { name: "Chicken Cheese Shawarma", price: 300 },
      { name: "Zinger Shawarma", price: 300 },
      { name: "Zinger Cheese Shawarma", price: 350 },
      { name: "Malai Shawarma", price: 300 },
      { name: "Pizza Shawarma", price: 350 },
      { name: "Arabic Platter", desc: "Pizza-style flatbread, fries, grilled chicken, hot wings & dips", price: 1100, tag: "Signature" },
      { name: "2 Spin Roll", price: 500 },
      { name: "Shawarma Deal 1", desc: "3 Chicken Shawarmas, 1 Ltr Drink", price: 800, tag: "Deal" },
      { name: "Shawarma Deal 2", desc: "5 Chicken Shawarmas, Small Fries, 1.5 Ltr Drink", price: 1500, tag: "Deal" },
    ]),
  },
  {
    title: "Sides — Wings, Nuggets, Hot Shot & Fried Chicken",
    subtitle: "Crispy, saucy, share-worthy bites",
    img: menuBurger,
    items: make("Sides", [
      { name: "Wings 5 Pcs", price: 400 },
      { name: "Wings 10 Pcs", price: 750 },
      { name: "Wings 15 Pcs", price: 1150 },
      { name: "Wings Family Platter (20 Pcs)", price: 1500, tag: "Family" },
      { name: "Oven Baked Wings 5 Pcs", price: 400 },
      { name: "Peri Peri Wings 5 Pcs", price: 450 },
      { name: "BBQ Wings 5 Pcs", price: 450 },
      { name: "Nuggets 5 Pcs", price: 400 },
      { name: "Nuggets 10 Pcs", price: 750 },
      { name: "Nuggets 15 Pcs", price: 1150 },
      { name: "Nuggets 20 Pcs", price: 1500 },
      { name: "Hot Shot 5 Pcs", price: 400 },
      { name: "Hot Shot 10 Pcs", price: 750 },
      { name: "Hot Shot 15 Pcs", price: 1150 },
      { name: "Hotshot Family Platter (20 Pcs)", price: 1500, tag: "Family" },
      { name: "Fried Chicken 1 Pc", price: 280 },
      { name: "Fried Chicken 5 Pcs", price: 1350 },
      { name: "Fried Chicken 10 Pcs", price: 2700 },
    ]),
  },
  {
    title: "Fries, Pasta & Cheese Stick",
    subtitle: "Loaded sides and creamy pasta",
    img: menuBurger,
    items: make("Sides", [
      { name: "Small Fries", price: 200 },
      { name: "Medium Fries", price: 300 },
      { name: "Large Fries", price: 350 },
      { name: "Mayo Garlic Fries", price: 400 },
      { name: "Masalah Fries", price: 360 },
      { name: "Small Loaded Fries", price: 350 },
      { name: "Large Loaded Fries", price: 550 },
      { name: "Creamy Pasta (Small)", price: 450 },
      { name: "Creamy Pasta (Large)", price: 650 },
      { name: "Crunchy Pasta (Small)", price: 500 },
      { name: "Crunchy Pasta (Large)", price: 700 },
      { name: "Special Pasta (Small)", price: 550 },
      { name: "Special Pasta (Large)", price: 750 },
      { name: "Chicken Cheese Stick", price: 650 },
      { name: "Malai Chicken Cheese Stick", price: 750 },
    ]),
  },
  {
    title: "Drinks, Tea & Sauces",
    subtitle: "Cool it down and dip it good",
    img: menuWrap,
    items: make("Drinks", [
      { name: "Mineral Water (Small)", price: 90 },
      { name: "Mineral Water (Large)", price: 130 },
      { name: "Regular Drink", price: 100 },
      { name: "1 Ltr Drink", price: 180 },
      { name: "1.5 Ltr Drink", price: 230 },
      { name: "Can", price: 150 },
      { name: "Mint Margarita", price: 250 },
      { name: "Kashmiri Chai", price: 180 },
      { name: "Green Tea", price: 60 },
      { name: "Chai", price: 80 },
      { name: "Garlic Sauce", price: 100 },
      { name: "BBQ Sauce", price: 100 },
      { name: "Chipotle Sauce", price: 100 },
      { name: "Special White Sauce", price: 100 },
    ]),
  },
];

export const allItems: MenuItem[] = menuSections.flatMap((s) => s.items);

export const findItem = (id: string) => allItems.find((i) => i.id === id);

export const formatPrice = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;
