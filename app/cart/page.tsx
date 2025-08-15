// app/cart/page.tsx
'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const total = useMemo(
    () => cartItems.reduce((sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0),
    [cartItems]
  );

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Link href="/b2b" className="underline text-sm">← Continue shopping</Link>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item, index) => {
              const qty = Number(item.quantity) || 1;
              const price = Number(item.price) || 0;
              const subtotal = qty * price;

              return (
                <li key={index} className="py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{item.name}</div>
                    <div className="text-sm opacity-70">
                      Qty: {qty} · Price: ${price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-28 text-right font-medium">${subtotal.toFixed(2)}</div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-center justify-end gap-6">
            <div className="text-xl font-semibold">Total: ${total.toFixed(2)}</div>

            {/* Submit the cart to /api/checkout.
               NOTE: payload includes name/price/qty; if you also track slug in your cart items,
               it will be included and the API can validate prices server-side. */}
            <form action="/api/checkout" method="POST">
              <input
                type="hidden"
                name="payload"
                value={JSON.stringify({
                  items: cartItems.map((i: any) => ({
                    // include slug if your CartContext stores it (recommended)
                    slug: i.slug ?? undefined,
                    name: i.name,
                    price: Number(i.price) || 0,
                    qty: Number(i.quantity) || 1,
                  })),
                })}
              />
              <button
                type="submit"
                className="rounded-lg border px-4 py-2 font-medium hover:bg-gray-50"
              >
                Checkout
              </button>
            </form>
          </div>
        </>
      )}
    </main>
  );
}
