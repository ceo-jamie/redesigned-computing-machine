"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const { cartItems } = useCart();
  const [hover, setHover] = useState(false); // Hover state for logo

  // Calculate total quantity in cart (default quantity 1 if missing)
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="bg-black flex flex-col items-center">
      {/* Logo section */}
      <div className="h-40 flex justify-center items-center">
        <Link href="/">
          <Image
            src={hover ? "/logo2.png" : "/logo.png"}
            alt="Logo"
            width={120}
            height={120}
            className="animate-fade cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
        </Link>
      </div>

      {/* Navigation menu + cart icon */}
      <nav className="bg-gray-900 w-full flex justify-center space-x-8 py-4 items-center relative">
        <Link href="/store" className="text-white hover:text-yellow-300">
          Store
        </Link>
        <Link href="/b2b" className="text-white hover:text-yellow-300">
          B2B
        </Link>
        <Link href="/contact" className="text-white hover:text-yellow-300">
          Contact
        </Link>
        <Link href="/about" className="text-white hover:text-yellow-300">
          About
        </Link>

        <Link href="/cart" className="text-white hover:text-yellow-300 relative">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
