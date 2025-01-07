"use client";

import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function RemoveWishlist({ productId }: { productId: string }) {

  const removeWishlist = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`, {
        method: "DELETE",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
          cache: "no-store",
        },
      });
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message);
      }

      // router.refresh();

      setTimeout(() => {
        window.location.reload();
      }, 300);
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
      onClick={() => removeWishlist()}
      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
    >
      <Trash2 size={20} />
    </button>
  );
}
