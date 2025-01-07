"use client";

import { WishlistType } from "@/types";
import RemoveWishlist from "./RemoveWishlist";

export default function WishlistCard({ wishlist }: { wishlist: WishlistType }) {
  return (
    <div
      key={wishlist.productDetail?._id.toString()}
      className="flex border-b pb-4"
    >
      <img
        src={wishlist.productDetail?.thumbnail}
        alt={wishlist.productDetail?.name}
        className="w-32 h-32 object-cover rounded"
      />

      <div className="flex-1 p-5">
        <h2 className="text-lg font-bold">{wishlist.productDetail?.name}</h2>
        <p className="text-gray-600 text-sm">
          {wishlist.productDetail?.excerpt}
        </p>
        <p className="font-semibold text-black mt-2">
          Rp {wishlist.productDetail?.price.toLocaleString()}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-2">
        <RemoveWishlist productId ={wishlist.productDetail?._id.toString() as string}/>
      </div>
    </div>
  );
}
