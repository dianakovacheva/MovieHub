import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Routes that require an authenticated user
      const privateRoutes = ["/watchlist", "/list", "/user"];
      const isOnPrivateRoute = privateRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`),
      );

      // Auth pages should not be reachable once logged in
      const isOnAuthPage = pathname === "/login" || pathname === "/register";

      if (isOnAuthPage) {
        if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
        return true;
      }

      if (isOnPrivateRoute) {
        // Returning false sends unauthenticated users to the sign-in page
        return isLoggedIn;
      }

      // All other routes (home, search, movie, person) are public
      return true;
    },
  },
} satisfies NextAuthConfig;
