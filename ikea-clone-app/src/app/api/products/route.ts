import ProductModel from "@/db/models/ProductModel";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  const product = await ProductModel.getAll(page, search);
  return Response.json(product);
}
