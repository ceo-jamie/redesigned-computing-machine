"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [hover, setHover] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="bg-black flex justify-center items-center h-40">
        {/* Logo with hover change */}
        <Image
          src={hover ? "/logo2.png" : "/logo1.png"}
          alt="Header Logo"
          width={120}
          height={120}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </header>

      <section className="px-8 py-24 text-center bg-gray-100">
        <h2 className="text-4xl font-bold mb-4">Distributing the Wealth Nationwide</h2>
        <p className="text-lg">
          High-quality skateboard gear at wholesale prices — built for B2B partners.
        </p>
      </section>

      <section id="about" className="px-8 py-16">
        <h3 className="text-2xl font-semibold mb-2">About Us</h3>
        <p className="text-gray-700 max-w-xl mx-auto">
          We’re a dedicated Australian skateboard goods distributor, working directly
          with independent skate shops and retailers. Our goal is to keep the scene
          thriving with reliable, fast supply and solid margins.
        </p>
      </section>

      <section id="products" className="px-8 py-16 bg-gray-50">
        <h3 className="text-2xl font-semibold mb-4">Product Range</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <li className="bg-white shadow-md p-6 rounded-xl">
            <h4 className="font-bold mb-2">Decks</h4>
            <p>All shapes and sizes from core and premium brands.</p>
          </li>
          <li className="bg-white shadow-md p-6 rounded-xl">
            <h4 className="font-bold mb-2">Trucks & Wheels</h4>
            <p>Reliable parts your customers trust, in stock and ready to ship.</p>
          </li>
          <li className="bg-white shadow-md p-6 rounded-xl">
            <h4 className="font-bold mb-2">Accessories</h4>
            <p>Hardware, grip, tools, and more — all in one place.</p>
          </li>
        </ul>
      </section>

      <section id="contact" className="px-8 py-16 max-w-xl mx-auto">
        <h3 className="text-2xl font-semibold mb-2">Contact Us</h3>
        <p className="mb-4">Interested in stocking our gear? Get in touch:</p>
        <a
          href="mailto:sales@skateflowdist.com"
          className="text-blue-600 hover:underline"
        >
          ceo@wealthdistributions.com
        </a>
      </section>

      <footer className="bg-black text-white text-center py-6 mt-12">
        <p>&copy; 2025 Wealth Distribution</p>
      </footer>
    </main>
  );
}
