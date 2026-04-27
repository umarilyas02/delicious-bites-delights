import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { findItem } from "./menu-data";

export type CartLine = { id: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "db_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const add = (id: string, qty = 1) =>
      setLines((prev) => {
        const existing = prev.find((l) => l.id === id);
        if (existing) {
          return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
        }
        return [...prev, { id, qty }];
      });
    const remove = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));
    const setQty = (id: string, qty: number) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.id !== id)
          : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
      );
    const clear = () => setLines([]);
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => {
      const item = findItem(l.id);
      return n + (item ? item.price * l.qty : 0);
    }, 0);
    return { lines, add, remove, setQty, clear, count, subtotal };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}