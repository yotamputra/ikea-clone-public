"use client";

import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/types";
import { useEffect, useState } from "react";
import { HiArrowPath } from "react-icons/hi2";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../loading";
import { useSearchParams } from "next/navigation";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
  }, [search]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${page}&search=${search}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const productsRes: ProductType[] = await res.json();

      if (productsRes.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => {
          if (page === 1) {
            return productsRes;
          }
          return [...prev, ...productsRes];
        });
      }

      setLoading(false);
    }
    fetchData();
  }, [page, search]);

  if (loading) {
    return <HiArrowPath size={80} className="animate-spin" />;
  }

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
      <div className="relative">
        <InfiniteScroll
          dataLength={products.length}
          next={() => setPage(page + 1)}
          hasMore={hasMore}
          loader={<Loading />}
          style={{ overflow: "visible" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {products.map((el, idx) => (
            <ProductCard key={idx} product={el} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
