export const runtime = "nodejs";

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const protectedPaths = [
    "/dashboard",
    "/api/delete-item",
    "/api/edit-item",
    "/api/items",
  ];

  // Block access if no session and trying to access protected routes
  if (!req.auth && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
