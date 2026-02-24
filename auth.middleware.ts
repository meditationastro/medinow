import type { NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";

// Edge-safe NextAuth config for middleware.
// IMPORTANT: Do NOT import Prisma, bcrypt, or any Node-only modules here.
// Middleware only needs to decode the session/JWT to set req.auth.

export default {
  // NextAuth v5 types require providers even though middleware only needs
  // secret + session to decode JWT. Keep this edge-safe by providing an
  // empty providers array.
  providers: [] as Provider[],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
