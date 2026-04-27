import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  const userRole = request.cookies.get("user_role")?.value;
  const hasSession = request.cookies.has("connect.sid");

  // Allow static assets
  if (pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js)$/)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!hasSession || userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
