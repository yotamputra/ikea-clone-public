import { ObjectId } from "mongodb";
import { ZodError } from "zod";

export type ProductType = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export type WishlistType = {
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  productDetail?: ProductType;
};

type CustomError = {
  message: string;
  status: number;
};

export type AppError = CustomError | Error | ZodError