// app/api/auth/route.ts
import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

// Handler for NextAuth.js
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
