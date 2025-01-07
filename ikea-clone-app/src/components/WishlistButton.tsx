"use client";

import { Heart } from "lucide-react";
import Swal from "sweetalert2";

export default function WishlistButton({ productId }: { productId: string }) {
  const addWishlist = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`, {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message);
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product added to wishlist!",
      });
    } catch (err) {
      // console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: (err as Error).message,
      });
    }
  };

  return (
    <button
      onClick={() => addWishlist()}
      className="p-2 rounded-full hover:bg-gray-200 transition"
      aria-label="Add to wishlist"
    >
      <Heart size={20} className="text-gray-500 hover:text-red-500" />
    </button>
  );
}
