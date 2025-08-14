"use client";

import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
