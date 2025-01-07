import ProductModel from "@/db/models/ProductModel";
import errorHandler from "@/helpers/errorHandler";
import { AppError } from "@/types";

export async function GET() {
  try {
    const products = await ProductModel.getHome();
    if (!products) {
      throw {
        message: "Product not found",
        status: 404,
      };
    }

    const banner = [
      {
        imageUrl:
          "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1734626697113__0.webp",
      },
      {
        imageUrl:
          "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1730647355260__0.webp",
      },
      {
        imageUrl:
          "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1726675984368_0_0.webp",
      },
    ];

    const result = {
      "products": products,
      "banner": banner
    }

    return Response.json(result);
  } catch (err) {
    return errorHandler(err as AppError);
  }
}
