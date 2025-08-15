// app/b2b/page.tsx
import { groq } from 'next-sanity';
import Link from 'next/link';
import Image from 'next/image';
import { sanityClient } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { formatAUD } from '@/lib/money';
import AddToCartButton from './AddToCartButton';

type Product = {
  _id: string;
  title: string;
  price: number;
  slug: { current: string };
  images?: any[]; // images array
};

const PRODUCTS_QUERY = groq`*[_type == "product" && active == true]|order(_createdAt desc){
  _id, title, price, slug, images
}`;

export default async function B2BPage() {
  const products: Product[] = await sanityClient.fetch(PRODUCTS_QUERY);

  return (
    <main className="p-8">
      {/* Header row with title + quick links */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Wholesale Products</h1>
        <div className="flex gap-4 text-sm">
          <Link href="/cart" className="underline">Cart</Link>
          <Link href="/logout" className="underline">Logout</Link>
        </div>
      </div>

      <p className="mb-8 opacity-80">These are coming straight from your Sanity Studio.</p>

      {products.length === 0 ? (
        <div>
          No products yet — add one in{' '}
          <Link className="underline" href="/studio">
            Studio
          </Link>
          .
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <li key={p._id} className="rounded-xl border p-4 hover:shadow transition">
              {/* Make the card clickable to the product page */}
              <Link href={`/product/${p.slug.current}`} className="block">
                <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-lg bg-gray-100">
                  {p.images?.[0] && (
                    <Image
                      src={urlFor(p.images[0]).width(800).height(600).url()}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                  )}
                </div>
                <h2 className="text-lg font-semibold line-clamp-1">{p.title}</h2>
                <p className="opacity-70">{formatAUD(p.price)}</p>
              </Link>

              {/* Add-to-cart button (NOT inside the Link) */}
              <AddToCartButton name={p.title} price={p.price} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
