import WishlistButton from "@/components/WishlistButton";
import { ProductType } from "@/types";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const product = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`
  ).then((res) => res.json());

  return {
    title: product.name,
    openGraph: {
      images: [product.thumbnail],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  async function fetchProduct(slug: string): Promise<ProductType> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  const product = await fetchProduct(params.slug);

  return (
    <div className="w-2/3">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-4 items-end mr-10">
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.images[1]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-8 mr-5 ml-10">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p>
              <span className="bg-yellow-400 text-black font-bold p-2 shadow-[4px_4px_8px_rgba(255,0,0,0.5)]">
                Rp {product.price.toLocaleString()}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4"></div>
            <WishlistButton productId={product._id.toString()} />
            <span>Add to Wishlist</span>
          </div>
        </div>
      </div>
    </div>
  );
}
