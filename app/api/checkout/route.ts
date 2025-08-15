// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { groq } from 'next-sanity';
import { sanityClient } from '@/sanity/lib/client';

export const runtime = 'nodejs'; // Stripe needs Node runtime

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Fetch trusted prices from Sanity when we have slugs
const PRODUCTS_BY_SLUG = groq`*[_type=="product" && slug.current in $slugs]{
  "slug": slug.current, title, price
}`;

type CartItemIn = { slug?: string; name?: string; price?: number; qty?: number };

export async function POST(req: NextRequest) {
  try {
    // Accept JSON or form POST (your cart uses a <form method="POST"> with a hidden payload)
    const ct = req.headers.get('content-type') || '';
    let body: any = {};
    if (ct.includes('application/json')) {
      body = await req.json();
    } else {
      const form = await req.formData();
      const raw = form.get('payload');
      body = typeof raw === 'string' ? JSON.parse(raw) : Object.fromEntries(form.entries());
    }

    // Body can be { slug } OR { items: [{ slug?, name?, price?, qty }] }
    let items: CartItemIn[] = [];
    if (Array.isArray(body?.items)) items = body.items as CartItemIn[];
    else if (body?.slug) items = [{ slug: String(body.slug), qty: 1 }];

    if (items.length === 0) {
      return NextResponse.json({ error: 'No items to checkout' }, { status: 400 });
    }

    // Normalize qty
    items = items.map(i => ({
      ...i,
      qty: Math.max(1, Number(i.qty) || 1),
    }));

    // 1) Build line items from Sanity (secure) for any entries that include a slug
    const slugs = items.filter(i => i.slug).map(i => String(i.slug));
    const products: Array<{ slug: string; title: string; price: number }> =
      slugs.length ? await sanityClient.fetch(PRODUCTS_BY_SLUG, { slugs }) : [];
    const bySlug = new Map(products.map(p => [p.slug, p]));

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const i of items) {
      if (i.slug) {
        const p = bySlug.get(String(i.slug));
        if (!p) continue; // skip unknown slugs
        line_items.push({
          quantity: i.qty!,
          price_data: {
            currency: 'aud',
            unit_amount: Math.round((p.price ?? 0) * 100),
            product_data: { name: p.title },
          },
        });
      }
    }

    // 2) Fallback: if any items didn't have a slug, use client-provided name/price (less secure)
    for (const i of items.filter(it => !it.slug)) {
      const name = i.name ?? 'Item';
      const price = Number(i.price) || 0;
      if (price <= 0) continue;
      line_items.push({
        quantity: i.qty!,
        price_data: {
          currency: 'aud',
          unit_amount: Math.round(price * 100),
          product_data: { name },
        },
      });
    }

    if (line_items.length === 0) {
      return NextResponse.json({ error: 'No valid line items' }, { status: 400 });
    }

    const origin = req.nextUrl.origin; // works locally & on Vercel
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: { allowed_countries: ['AU'] },
    });

    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message ?? 'Stripe error' }, { status: 500 });
  }
}
