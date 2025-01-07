"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

export function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="relative flex items-center mx-4 flex-1">
      <span className="absolute left-5">
        <IoSearch />
      </span>
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/products?search=${search}`);
        }}
      >
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="pl-12 py-2 pr-7 border-2 rounded-full w-full bg-[#f5f5f5] hover:bg-[#f0f0f0]"
        />
      </form>
    </div>
  );
}
