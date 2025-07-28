import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });

  const protectedPaths = [
    "/dashboard",
    "/api/delete-item",
    "/api/edit-item",
    "/api/items",
    "/api/auth",
    "/api/signup",
    "/dashboard/settings",
    "/dashboard/items",
    "/dashboard/new-item",
  ];

  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
