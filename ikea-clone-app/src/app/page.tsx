import { ProductType } from "@/types";
import Link from "next/link";
import { SliderImage } from "@/components/SliderImage";

export default async function Home() {
  async function fetchData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  const data = await fetchData();
  // console.log(data)

  const bannerImages = data.banner.map(
    (item: { imageUrl: string }) => item.imageUrl
  );

  return (
    <div className="flex-1">
      <section className="py-10 mt-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to IKEA</h1>
          <p className="mt-4 text-lg">
            Explore furniture and home accessories that suit your style
          </p>
        </div>
      </section>

      <section className="flex py-10 w-full">
        <SliderImage banner={bannerImages} />
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row w-full mb-4 justify-between items-center">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <div className="text-center">
              <Link
                href="/products"
                className="btn rounded-full text-white px-5 text-xs font-normal bg-[#121212]"
              >
                See all products
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.products.map((product: ProductType, idx: number) => (
              <div key={idx} className="p-4">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-60 object-cover  mb-4"
                />
                <h3 className="text-lg font-bold mb-2">
                  {product.name.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{product.excerpt}</p>
                <p className="text-red-600 font-semibold">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
