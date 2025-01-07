import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readPayloadJose } from "./helpers/jwt";

export async function middleware(request: NextRequest) {
  console.log("middlewares <<<");

  const authorization = cookies().get("authorization")?.value;

  if (request.nextUrl.pathname.startsWith("/api/wishlists")) {
    if (!authorization) {
      return NextResponse.json(
        {
          message: "Unauthorized. Please login first",
        },
        {
          status: 401,
        }
      );
    }
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
      return NextResponse.json(
        {
          message: "Unauthorized. Invalid token",
        },
        {
          status: 401,
        }
      );
    }

    const decoded = await readPayloadJose<{ _id: string }>(token);
    // console.log(decoded);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded._id);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  }

  if (request.nextUrl.pathname.startsWith("/wishlists")) {
    if (!authorization) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/api/wishlists/:path*", "/wishlists/:path*"],
};
