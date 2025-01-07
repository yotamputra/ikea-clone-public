"use client";

import { ProductType } from "@/types";
import Link from "next/link";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div
      key={product.slug}
      className="border border-none flex flex-col h-full overflow-hidden"
    >
      <Link href={`/products/${product.slug}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-auto object-cover"
        />
      </Link>
      <div className="p-4 flex-1">
        <h2 className="text-xl font-semibold">
          {product.name.toLocaleUpperCase()}
        </h2>
        <h2 className="text-gray-600">{product.excerpt}</h2>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="bg-yellow-400 text-black font-bold px-4 py-2 shadow-[4px_4px_8px_rgba(255,0,0,0.5)]">
          Rp {product.price.toLocaleString()}
        </div>
        <WishlistButton productId={product._id.toString()} />
      </div>
    </div>
  );
}
