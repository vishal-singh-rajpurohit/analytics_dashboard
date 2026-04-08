import { NextResponse } from "next/server";
import type { NextProxy, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  
  const token = request.cookies.get("ACCESS_TOKEN")?.value;
  const pathname = request.nextUrl.pathname;

  // console.log("COOKIES:", request.cookies.getAll());
  // console.log('Middleware triggered:', request.nextUrl.pathname)

  if (pathname.startsWith("/_next") ||pathname.startsWith("/api") ||pathname.includes(".")) {
    return NextResponse.next();
  }

  // if (pathname.startsWith("/admin/auth/login") && token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // if (!token && !pathname.startsWith("/admin/auth/login")) {
  //   return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};