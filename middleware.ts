export const runtime = "nodejs";

import { auth } from "@core/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const protectedPaths = [
    "/dashboard",
    "/api/delete-item",
    "/api/edit-item",
    "/api/items",
  ];

  if (!req.auth && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
