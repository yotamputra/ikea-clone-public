import ProductModel from "@/db/models/ProductModel";
import errorHandler from "@/helpers/errorHandler";
import { AppError } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const product = await ProductModel.getBySlug(slug);
    if (!product) {
      throw {
        message: "Product not found",
        status: 404,
      };
    }

    return Response.json(product);
  } catch (err) {
    return errorHandler(err as AppError);
  }
}
