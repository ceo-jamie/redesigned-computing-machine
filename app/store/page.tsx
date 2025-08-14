
"use client";

import { useCart } from "@/app/context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Street Deck 8.25\"",
    price: 89.95,
    image: "/deck1.jpg",
  },
];

export default function StorePage() {
  const { addToCart, cartItems } = useCart();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Wealth-Mart</h1>
      <p className="mb-4">Check out our premium skate gear, curated for quality and style.</p>

      <div className="mb-6 text-lg font-medium">
        🛒 Cart: {cartItems.length} item{cartItems.length !== 1 && "s"}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="mb-2">${product.price.toFixed(2)}</p>
            <button
              onClick={() =>
                addToCart({
                  name: product.name,
                  quantity: 1,
                  price: product.price,
                })
              }
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
