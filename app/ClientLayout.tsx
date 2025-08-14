
"use client";

import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="p-8">{children}</main>
    </CartProvider>
  );
}
