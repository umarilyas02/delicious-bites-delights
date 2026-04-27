export const DEFAULT_TEMPLATE = `*New Order — Delicious Bites*
Order ID: {orderId}

*Customer*
Name: {name}
Phone: {phone}
{emailLine}

*{methodBlock}*
{notesLine}

*Items*
{items}

Subtotal: {subtotal}
{feeLine}
*Total: {total}*

Sent from deliciousbites.com`;

const STORAGE_KEY = "db_wa_template_v1";

export function loadTemplate(): string {
  if (typeof window === "undefined") return DEFAULT_TEMPLATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw && raw.trim().length > 0 ? raw : DEFAULT_TEMPLATE;
  } catch {
    return DEFAULT_TEMPLATE;
  }
}

export function saveTemplate(value: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore
  }
}

export function resetTemplate() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export type TemplateVars = {
  orderId: string;
  name: string;
  phone: string;
  email: string;
  emailLine: string;
  method: string; // "Pickup" | "Delivery"
  pickupTime: string;
  address: string;
  city: string;
  methodBlock: string;
  notes: string;
  notesLine: string;
  items: string;
  subtotal: string;
  fee: string;
  feeLine: string;
  total: string;
};

export const PLACEHOLDERS: { key: keyof TemplateVars; desc: string }[] = [
  { key: "orderId", desc: "Auto-generated order ID" },
  { key: "name", desc: "Customer name" },
  { key: "phone", desc: "Customer phone" },
  { key: "email", desc: "Customer email (raw, may be empty)" },
  { key: "emailLine", desc: 'Pretty: "Email: …" or empty' },
  { key: "method", desc: "Pickup or Delivery" },
  { key: "pickupTime", desc: "Pickup time (empty for delivery)" },
  { key: "address", desc: "Delivery street address" },
  { key: "city", desc: "Delivery city" },
  { key: "methodBlock", desc: "Pre-formatted pickup or delivery block" },
  { key: "notes", desc: "Order notes (raw)" },
  { key: "notesLine", desc: 'Pretty: "Notes: …" or empty' },
  { key: "items", desc: "Itemized list with quantities + prices" },
  { key: "subtotal", desc: "Subtotal with currency" },
  { key: "fee", desc: "Delivery fee with currency" },
  { key: "feeLine", desc: 'Pretty: "Delivery Fee: …" or "Pickup: Free"' },
  { key: "total", desc: "Grand total with currency" },
];

export function renderTemplate(template: string, vars: TemplateVars): string {
  let out = template;
  for (const k of Object.keys(vars) as (keyof TemplateVars)[]) {
    const re = new RegExp(`\\{${k}\\}`, "g");
    out = out.replace(re, vars[k] ?? "");
  }
  // Collapse 3+ blank lines into max 2
  out = out.replace(/\n{3,}/g, "\n\n");
  // Strip leading/trailing whitespace lines
  return out.trim();
}

export function buildSampleVars(formatPrice: (n: number) => string): TemplateVars {
  const subtotal = 2400;
  const fee = 100;
  const total = subtotal + fee;
  return {
    orderId: "DB-SAMPLE123",
    name: "Ali Khan",
    phone: "0300 1234567",
    email: "ali@example.com",
    emailLine: "Email: ali@example.com",
    method: "Delivery",
    pickupTime: "",
    address: "House 12, Street 5",
    city: "Faisalabad",
    methodBlock: "Order Type: Delivery\nAddress: House 12, Street 5\nCity: Faisalabad",
    notes: "Less spicy please",
    notesLine: "Notes: Less spicy please",
    items: `• 1× Delicious Bites Special Offer — ${formatPrice(2400)}`,
    subtotal: formatPrice(subtotal),
    fee: formatPrice(fee),
    feeLine: `Delivery Fee: ${formatPrice(fee)}`,
    total: formatPrice(total),
  };
}
