'use client';

import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';

type Props = {
  name: string;
  price: number;
  // you can add slug?: string later if you decide to store it
};

export default function AddToCartButton({ name, price }: Props) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const onClick = () => {
    setAdding(true);
    addToCart({ name, price, quantity: 1 });
    // tiny visual feedback
    setTimeout(() => setAdding(false), 300);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={adding}
      className="mt-2 border rounded-md px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
    >
      {adding ? 'Added' : 'Add to cart'}
    </button>
  );
}
