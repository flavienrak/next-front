import { NextResponse } from "next/server";

export function middleware(req) {
  // if (req.nextUrl.pathname === "/dashboard") {
  //   const hasActive = req.nextUrl.searchParams.has("active");
  //   if (!hasActive) {
  //     return NextResponse.redirect(
  //       new URL("/dashboard?active=general", req.url)
  //     );
  //   }
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|assets|_next|.*\\..*|favicon.ico).*)"],
};
