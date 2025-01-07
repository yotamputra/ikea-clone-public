import UserModel from "@/db/models/UserModel";
import { comparePass } from "@/helpers/bcrypt";
import errorHandler from "@/helpers/errorHandler";
import { signToken } from "@/helpers/jwt";
import { AppError } from "@/types";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();

    const user = await UserModel.findByEmail(body.email);
    if (!user) {
      throw { message: "Invalid email/password", status: 401 };
    }

    const validatePass = comparePass(body.password, user.password);
    if (!validatePass) {
      throw { message: "Invalid email/password", status: 401 };
    }

    const accessToken = signToken({ _id: user._id.toString() });

    cookies().set("authorization", `Bearer ${accessToken}`);

    return Response.json({
      accessToken,
    });
  } catch (err) {
    // console.log(err)
    return errorHandler(err as AppError);
  }
}
