"use client";

import WishlistCard from "@/components/WishlistCard";
import { WishlistType } from "@/types";
import { useEffect, useState } from "react";
import { HiArrowPath } from "react-icons/hi2";

export default function Wishlists() {
  const [wishlists, setWhistlists] = useState<WishlistType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`);

        const response = await res.json();

        if (!res.ok) {
          throw new Error(response.message || "Failed to fetch wishlists");
        }

        setWhistlists(response);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <HiArrowPath size={80} className="animate-spin" />;
  }

  return (
    <div className="flex flex-2/3 flex-col space-y-6 p-4 pt-0">
      <h1 className="text-4xl pb-7 font-bold text-center">My Wishlist</h1>
      {wishlists.map((el, idx) => (
        <WishlistCard wishlist={el} key={idx} />
      ))}
    </div>
  );
}
