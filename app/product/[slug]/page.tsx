// app/product/[slug]/page.tsx
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { formatAUD } from '@/lib/money';

type Product = {
  _id: string;
  title: string;
  price: number;
  images?: any[];
  description?: any[];
  slug: string;
};

const QUERY = groq`*[_type == "product" && slug.current == $slug][0]{
  _id, title, price, images, description, "slug": slug.current
}`;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Next 15 expects params as a Promise
  const product: Product | null = await sanityClient.fetch(QUERY, { slug });

  if (!product) {
    return (
      <main className="p-8">
        <p>Product not found.</p>
        <Link className="underline" href="/b2b">
          ← Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8 grid gap-8 lg:grid-cols-2">
      <section>
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-gray-100">
          {product.images?.[0] && (
            <Image
              src={urlFor(product.images[0]).width(1000).height(1000).url()}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 50vw, 100vw"
            />
          )}
        </div>
      </section>

      <section>
        <Link className="underline text-sm" href="/b2b">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-3">{product.title}</h1>
        <p className="text-xl mb-6">{formatAUD(product.price)}</p>

        {product.description?.length ? (
          <div className="prose max-w-none">
            <PortableText value={product.description} />
          </div>
        ) : null}
      </section>
    </main>
  );
}
