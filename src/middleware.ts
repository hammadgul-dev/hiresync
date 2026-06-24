import {NextResponse, NextRequest} from "next/server"
import {getToken} from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  let token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
  let {pathname} = req.nextUrl
  let isAuth = !!token
  let role = (token as any)?.role

  if ((pathname === "/login" || pathname === "/register") && isAuth) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  if (pathname.startsWith("/profile-setup") && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  if (
    pathname.startsWith("/employer-dashboard") ||
    pathname.startsWith("/post-job")
  ) {
    if (!isAuth) return NextResponse.redirect(new URL("/login", req.url))
    if (role !== "employer") return NextResponse.redirect(new URL("/", req.url))
  }
  if (pathname.startsWith("/job-seeker-dashboard")) {
    if (!isAuth) return NextResponse.redirect(new URL("/login", req.url))
    if (role !== "jobSeeker")
      return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
}

export let config = {
  matcher: [
    "/login",
    "/register",
    "/profile-setup/:path*",
    "/employer-dashboard/:path*",
    "/post-job/:path*",
    "/job-seeker-dashboard/:path*",
  ],
}
