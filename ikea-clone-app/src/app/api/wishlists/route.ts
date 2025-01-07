import WishlistModel from "@/db/models/WishlistModel";
import errorHandler from "@/helpers/errorHandler";
import { AppError } from "@/types";

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id') as string
  const wishlists = await WishlistModel.getAll(userId)

  return Response.json(wishlists);
}

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();
    const userId = request.headers.get("x-user-id") as string;

    await WishlistModel.create({ userId, productId });

    return Response.json({
      message: "Success add to wishlist",
    });
  } catch (err) {
    return errorHandler(err as AppError);
  }
}

export async function DELETE(request: Request) {
  try {
    const { productId } = await request.json()
    const userId = request.headers.get('x-user-id') as string

    await WishlistModel.delete({ userId, productId })

    return Response.json({
      message: 'Success delete product from wishlist'
    })
  } catch (err) {
    return errorHandler(err as AppError)
  }
}