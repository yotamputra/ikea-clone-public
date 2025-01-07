import { z } from "zod";
import { database } from "../config/mongodb";
import { hashPass } from "@/helpers/bcrypt";

type UserType = {
  name: string;
  username: string;
  email: string;
  password: string;
};

const UserSchema = z.object({
  name: z.string().optional(),
  username: z.string().min(1, { message: "Username is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(5, { message: "Password must be at least 5 characters" }),
});

class UserModel {
  static collection() {
    return database.collection<UserType>("users");
  }

  static async create(newUser: UserType) {
    UserSchema.parse(newUser);

    const existUser = await this.collection().findOne({
      $or: [
        {
          username: newUser.username,
        },
        {
          email: newUser.email,
        },
      ],
    });

    if (existUser) {
      throw { message: "Email/Username is already exist", status: 400 };
    }

    newUser.password = hashPass(newUser.password);

    return await this.collection().insertOne(newUser);
  }

  static async findByEmail(email: string) {
    return await this.collection().findOne({ email });
  }
}

export default UserModel;
