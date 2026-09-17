<div align="center">

# 🍕 Delicious Bites

**A fast, modern restaurant website with WhatsApp ordering built in.**

Wood-fired pizzas, gourmet burgers, fresh wraps & Arabic platters — browsable, orderable, and 100% open source.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red)](#-open-source)
[![Built with TanStack Start](https://img.shields.io/badge/Built%20with-TanStack%20Start-orange)](https://tanstack.com/start)

[Live Site](https://delicious-bites-delights.vercel.app) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

</div>

---

## ✨ Features

- 🍕 **Full digital menu** — pizzas, burgers, wraps, shawarma, Arabic platters, sides & drinks, grouped and priced automatically from a single data file
- 🛒 **Persistent cart** — add items, pick sizes, adjust quantities; survives page reloads via `localStorage`
- 📲 **Orders go straight to WhatsApp** — no backend, no payment gateway, no order-management dashboard needed. Customers fill in their details, the app builds a formatted order message, and it opens WhatsApp ready to send
- 📏 **Smart size grouping** — items like "Chicken Tikka Pizza (Small/Medium/Large/XL)" automatically collapse into one row with a size picker, both on the menu page and in the homepage's featured items
- ⚡ **Quick Order modal** — customers can check out in a few taps without leaving the menu page
- 🎨 **Polished, responsive UI** — built with Tailwind CSS + Radix primitives, works great on mobile where most food orders happen
- 🔍 **SEO-ready out of the box** — Open Graph tags, `sitemap.xml`, `robots.txt`, and `llms.txt` for AI crawlers are all included

## 🖥️ Tech Stack

| Layer      | Choice                                              |
| ---------- | ---------------------------------------------------- |
| Framework  | [TanStack Start](https://tanstack.com/start) (React 19, file-based routing) |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) primitives |
| Forms      | [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation |
| Icons      | [lucide-react](https://lucide.dev/) |
| Build tool | [Vite 7](https://vite.dev/) |
| Deploy     | Cloudflare / Vercel-ready |

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/umarilyas02/delicious-bites-delights.git
cd delicious-bites-delights

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app runs at `http://localhost:8080` by default.

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint       # lint the codebase
```

## 📱 How WhatsApp Ordering Works

There's no order database and no admin panel — orders are sent as a pre-filled WhatsApp message straight to the restaurant's phone:

1. A customer adds items to their cart (with size selection where relevant).
2. They open **Quick Order** or **Checkout** and fill in their name, phone, and delivery/pickup details.
3. The app formats the cart into a readable order summary and opens `wa.me/<number>` with the message pre-filled.
4. The customer hits send in WhatsApp — the order lands directly in the restaurant's chat.

To point orders at **your own** WhatsApp number, update `WHATSAPP_NUMBER` in:

- [`src/routes/menu.tsx`](./src/routes/menu.tsx)
- [`src/routes/checkout.tsx`](./src/routes/checkout.tsx)

Use the international format with no `+` or spaces, e.g. `923001234567`.

## 🧩 Customizing the Menu

All menu items, sections, and prices live in one place: [`src/lib/menu-data.ts`](./src/lib/menu-data.ts). Add, remove, or reprice items there and the menu page, homepage featured items, cart, and WhatsApp order summary all update automatically — no need to touch UI code.

## 📂 Project Structure

```
src/
├── routes/           # File-based pages (home, menu, cart, checkout, about, contact...)
├── components/        # Header, Footer, shared UI (shadcn/Radix-based) components
├── lib/
│   ├── menu-data.ts   # Single source of truth for the entire menu
│   └── cart-context.tsx  # Cart state, persisted to localStorage
└── styles.css         # Design tokens (colors, fonts) & Tailwind config
public/
├── favicon.svg, og-image.jpg, sitemap.xml, robots.txt, llms.txt
```

## 🌍 Open Source

This project is **open source and free to use** under the [MIT License](./LICENSE). Fork it, rebrand it, swap in your own menu and WhatsApp number, and launch your own restaurant's ordering site — no licensing fees, no backend to host, no per-order charges.

Contributions, forks, and feature requests are welcome. If you build something with this, a link back is appreciated but never required.

## 👤 Credits

Design and developed by **[Umar Ilyas](https://umarilyas.dev)**.

## 📄 License

[MIT](./LICENSE) — do whatever you'd like with it.
