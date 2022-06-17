import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req) {
    
  // token exist if login
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname, origin } = req.nextUrl;

  // allow request if following is true
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // redirect to login if conditions do not match
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(`${origin}/login`);
  }
}
