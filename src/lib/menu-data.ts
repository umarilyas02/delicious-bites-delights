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
    title: "Classic Pizza",
    subtitle: "Small · Medium · Large · XL",
    img: menuPizza,
    items: make("Classic Pizza", [
      { name: "Chicken Tikka Pizza (Small)", desc: "BBQ chicken, cheese, green peppers, black olives, tomatoes, onions, jalapeños", price: 750 },
      { name: "Chicken Tikka Pizza (Medium)", price: 1300 },
      { name: "Chicken Tikka Pizza (Large)", price: 1550 },
      { name: "Chicken Tikka Pizza (XL)", price: 1900 },
      { name: "Chicken Fajita Pizza (Medium)", desc: "Fajita chicken, cheese, green peppers, black olives, tomatoes, onions", price: 1300 },
      { name: "Chicken Tandori Pizza (Medium)", desc: "Tandoori chicken, cheese, tomatoes, onions, jalapeños", price: 1300 },
      { name: "Hot & Spicy Pizza (Medium)", desc: "Spicy BBQ chicken, cheese, green peppers, black olives, tomatoes, onions", price: 1300 },
      { name: "Achari Pizza (Medium)", desc: "Special achari chicken, cheese, green peppers, black olives, tomatoes, onions", price: 1300 },
      { name: "Cheese Lover Pizza (Medium)", desc: "Special white sauce + lots of cheese", price: 1300 },
      { name: "Mexican Pizza (Medium)", desc: "Mexican chicken, sweet corn, cheese, green peppers, black olives, jalapeños, mushrooms", price: 1300 },
      { name: "Veggie Pizza (Medium)", desc: "Sweet corn, cheese, green peppers, onions, black olives, jalapeños, mushrooms", price: 1300 },
    ]),
  },
  {
    title: "Royal Pizza",
    subtitle: "Small · Medium · Large · XL",
    img: menuPizza,
    items: make("Royal Pizza", [
      { name: "Crown Pizza (Small)", desc: "BBQ chicken, cheese, green peppers, black olives, tomatoes, onions, jalapeños", price: 950 },
      { name: "Crown Pizza (Medium)", price: 1450 },
      { name: "Crown Pizza (Large)", price: 1750 },
      { name: "Crown Pizza (XL)", price: 2100 },
      { name: "Kabab Slice Pizza (Medium)", desc: "Chicken, cheese, green peppers, black olives, beef kabab", price: 1450 },
      { name: "Malai Boti Pizza (Medium)", desc: "Malai chicken, cheese, tomatoes, onions, special malai sauce", price: 1450 },
      { name: "Multi Flavoured Pizza (Medium)", desc: "Choose your own flavour", price: 1450 },
      { name: "Donner Pizza (Medium)", desc: "Chicken, extra cheese, green peppers, black olives, tomatoes, onions, jalapeños, mushrooms", price: 1450 },
    ]),
  },
  {
    title: "Signature Pizza",
    subtitle: "Medium · Large · XL",
    img: menuPizza,
    items: make("Signature Pizza", [
      { name: "Behari Kabab Pizza (Medium)", desc: "Chicken, cheese, green peppers, black olives, tomatoes, onions, beef kabab on each slice", price: 1500 },
      { name: "Behari Kabab Pizza (Large)", price: 2000 },
      { name: "Behari Kabab Pizza (XL)", price: 2400 },
      { name: "Kabab Crust Stuffed Pizza (Medium)", desc: "Chicken, cheese, green peppers, black olives, tomatoes, onions, beef kabab crust filled", price: 1500 },
      { name: "Shahi Malai Donner Pizza (Medium)", desc: "Malai chicken, cheese, special malai sauce", price: 1500 },
      { name: "Double Donner Pizza (Medium)", desc: "Double topping", price: 1500 },
      { name: "Malai Crown Pizza (Medium)", price: 1500 },
      { name: "Kabab Crown Pizza (Medium)", desc: "Special chicken, cheese, green peppers, black olives, tomatoes, onions, jalapeños, mushrooms, beef kabab", price: 1500 },
    ]),
  },
  {
    title: "Cheese Topping",
    subtitle: "Add extra cheese to any pizza",
    img: menuPizza,
    items: make("Cheese Topping", [
      { name: "Chicken Topping (Small)", price: 100 },
      { name: "Chicken Topping (Medium)", price: 150 },
      { name: "Chicken Topping (Large)", price: 200 },
      { name: "Chicken Topping (XL)", price: 250 },
      { name: "Cheese Topping (Small)", price: 150 },
      { name: "Cheese Topping (Medium)", price: 200 },
      { name: "Cheese Topping (Large)", price: 250 },
      { name: "Cheese Topping (XL)", price: 300 },
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
    subtitle: "Zinger burger combos & kids deal",
    img: menuBurger,
    items: make("Burger Deal", [
      { name: "Burger D-1", desc: "1 Zinger Burger, 1 Small Fries, 1 Regular Drink", price: 650, tag: "Deal" },
      { name: "Burger D-2", desc: "2 Zinger Burgers, 2 Regular Drinks", price: 850, tag: "Deal" },
      { name: "Burger D-3", desc: "3 Zinger Burgers, 1 Ltr Drink", price: 1150, tag: "Deal" },
      { name: "Burger D-4", desc: "4 Zinger Burgers, 1 Ltr Drink", price: 1500, tag: "Deal" },
      { name: "Burger D-5", desc: "5 Zinger Burgers, 1.5 Ltr Drink, 1 Small Fries", price: 2000, tag: "Deal" },
      { name: "Kids Deal", desc: "Small Fries, 4 Nuggets", price: 480, tag: "Kids" },
    ]),
  },
  {
    title: "Paratha Rolls & Wraps",
    subtitle: "Soft tortillas & flaky paratha rolls",
    img: menuWrap,
    items: make("Wrap", [
      { name: "Chicken Paratha Roll", price: 300 },
      { name: "Zinger Paratha Roll", price: 350 },
      { name: "Chicken Cheese Paratha Roll", price: 380 },
      { name: "Zinger Cheese Paratha Roll", price: 400 },
      { name: "Kabab Paratha Roll", price: 350 },
      { name: "Paratha Sandwich", price: 300 },
      { name: "Chicken Wrap", price: 320 },
      { name: "Zinger Wrap", price: 380 },
      { name: "Grill Chicken Wrap", price: 420 },
      { name: "Arabic Wrap", price: 450 },
    ]),
  },
  {
    title: "Shawarma & Arabic Platter",
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
    title: "Wings, Nuggets, Hot Shot & Fried Chicken",
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

// Order policy from menu card
export const MIN_ORDER = 1000;
export const MIN_ORDER_MEMBERS = 1200;
export const FREE_DELIVERY_KM = 3;
