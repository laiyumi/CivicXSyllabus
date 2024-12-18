import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Forward the accessToken and user ID to the session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub; // Forward user ID
        session.user.token = token.jti; // Forward accessToken
      }
      return session;
    },
    // Forward the user ID to the session
    // async session({ session, token }) {
    //   if (session.user) {
    //     session.user.id = token.sub; // Add id to session.user
    //   }
    //   return session;
    // },
  },
};
