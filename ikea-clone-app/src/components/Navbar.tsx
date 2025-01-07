import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { Heart } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const token = cookies().get("authorization")?.value;

  return (
    <header>
      <nav className="p-4 mt-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-2xl flex items-center pr-5">
            <Link href={"/"}>
              {" "}
              <img src="/ikea.png" className="h-10" alt="Logo" />
            </Link>
          </div>

          <SearchBar />

          <div className="flex items-center space-x-4 pl-5 gap-4">
            <Link href={"/wishlists"}>
              <Heart size={23} />
            </Link>
          </div>
          <div>
            {token ? (
              <LogoutButton />
            ) : (
              <Link className="ml-3 btn btn-ghost" href={"/login"}>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="ml-32 mt-3">
        <div className="flex">
          <FaShoppingCart className="mt-1 mr-1" />
          <Link href="/products" className="font-bold items-center">
            Products
          </Link>
        </div>
      </div>
    </header>
  );
}
