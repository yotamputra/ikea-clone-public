import UserModel from "@/db/models/UserModel";
import errorHandler from "@/helpers/errorHandler";
import { AppError } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await UserModel.create(body);

    return Response.json({
      message: "Success register",
    });
  } catch (err) {
    return errorHandler(err as AppError);
  }
}
