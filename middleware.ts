import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Protect dashboard routes - only VENDOR
    if (pathname.startsWith("/dashboard")) {
      if (!token || token.role !== "VENDOR") {
        return NextResponse.redirect(new URL("/vendor-access", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow all routes — we handle auth in the function above
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
