'use server';

import { cookies } from 'next/headers';

type CartItem = { slug: string; qty: number };
type Cart = { items: CartItem[] };

const COOKIE_NAME = 'cart';

function getCart(): Cart {
  const raw = cookies().get(COOKIE_NAME)?.value;
  try {
    return raw ? (JSON.parse(raw) as Cart) : { items: [] };
  } catch {
    return { items: [] };
  }
}

function setCart(cart: Cart) {
  cookies().set(COOKIE_NAME, JSON.stringify(cart), {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function addToCart(formData: FormData) {
  const slug = String(formData.get('slug') ?? '');
  const qty = Number(formData.get('qty') ?? 1);
  if (!slug) return;

  const cart = getCart();
  const existing = cart.items.find((i) => i.slug === slug);
  if (existing) {
    existing.qty = Math.max(1, Math.min(99, existing.qty + (isNaN(qty) ? 1 : qty)));
  } else {
    cart.items.push({ slug, qty: Math.max(1, isNaN(qty) ? 1 : qty) });
  }
  setCart(cart);
}

export async function updateQty(formData: FormData) {
  const slug = String(formData.get('slug') ?? '');
  const qty = Number(formData.get('qty') ?? 1);
  if (!slug) return;

  const cart = getCart();
  const item = cart.items.find((i) => i.slug === slug);
  if (!item) return;

  const next = Math.max(1, Math.min(99, isNaN(qty) ? 1 : qty));
  item.qty = next;
  setCart(cart);
}

export async function removeFromCart(formData: FormData) {
  const slug = String(formData.get('slug') ?? '');
  if (!slug) return;

  const cart = getCart();
  cart.items = cart.items.filter((i) => i.slug !== slug);
  setCart(cart);
}

export async function clearCart() {
  setCart({ items: [] });
}
