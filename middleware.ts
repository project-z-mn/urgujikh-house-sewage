import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin login page зөвшөөрнө
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Admin бүх хэсгийг хамгаална
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;

    if (!token || role !== "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
