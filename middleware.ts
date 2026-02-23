import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes"

const { auth } = NextAuth(authConfig)

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicPrefix = nextUrl.pathname.startsWith('/h')
  const isApiRoute = nextUrl.pathname.startsWith('/api/')
  const isBlogRoute = nextUrl.pathname.startsWith('/h/blog') || nextUrl.pathname.startsWith('/h/blogs')
  const isBookingRoute = nextUrl.pathname.startsWith('/api/book-appointment')

  // Allow all API routes without authentication
  if (isApiRoute && !isApiAuthRoute) {
    return
  }

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  // Allow blog routes without authentication
  if (isBlogRoute) {
    return
  }

  // Allow booking route without authentication
  if (isBookingRoute) {
    return
  }

  if (!isLoggedIn && !isPublicRoute && !isPublicPrefix) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }
  return
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
