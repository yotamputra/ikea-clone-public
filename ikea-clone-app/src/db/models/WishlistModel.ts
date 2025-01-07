import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";
import { WishlistType } from "@/types";

class WishlistModel {
  static collection() {
    return database.collection<WishlistType>("wishlists");
  }

  static async create({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) {
    const newWishlist = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const validate = await this.collection().findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    if (validate) {
      throw { message: "Product has been added to wishlist", status: 400 };
    }

    return await this.collection().insertOne(newWishlist);
  }

  static async delete({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) {
    const deletedWishlist = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId)
    };

    const validate = await this.collection().findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    if (!validate) {
      throw { message: "Product not found", status: 404 };
    }

    return await this.collection().deleteOne(deletedWishlist);
  }

  static async getAll(userId: string) {
    const wishlists = this.collection()
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetail",
          },
        },
        {
          $unwind: {
            path: "$productDetail",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();

    return wishlists;
  }
}

export default WishlistModel;
