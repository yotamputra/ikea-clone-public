import { ProductType } from "@/types";
import { database } from "../config/mongodb";

class ProductModel {
  static collection() {
    return database.collection<ProductType>("products");
  }

  static async getAll(page: string, search: string) {
    const limit = 8;
    const skip = (+page - 1) * limit;

    const queries = search.split(" ").map((el) => {
      return {
        name: {
          $regex: el,
          $options: "i",
        },
      };
    });

    return await this.collection()
      .find({
        $and: queries,
      })
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  static async getBySlug(slug: string) {
    return await this.collection().findOne({ slug });
  }

  static async getHome() {
    const limit = 5;

    return await this.collection().find().limit(limit).toArray();
  }
}

export default ProductModel;
