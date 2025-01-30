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
  },
  events: {
    // Runs when a user successfully signs in
    async signIn({ user }) {
      if (!user?.id) return; // Ensure user ID exists

      try {
        // Check if the "default" list exists
        const existingList = await prisma.list.findFirst({
          where: {
            userId: user.id,
            name: "Default",
          },
        });

        // If missing, create the "default" list
        if (!existingList) {
          await prisma.list.create({
            data: {
              name: "Default",
              userId: user.id,
            },
          });
        }
      } catch (error) {
        console.error("Error creating default list on sign-in:", error);
      }
    },

    // Runs when a session is created (fallback for existing users)
    async session({ token }) {
      if (!token?.sub) return; // Ensure user ID exists

      try {
        const existingList = await prisma.list.findFirst({
          where: {
            userId: token.sub,
            name: "Default",
          },
        });

        if (!existingList) {
          await prisma.list.create({
            data: {
              name: "Default",
              userId: token.sub,
            },
          });
        }
      } catch (error) {
        console.error("Error creating default list on session:", error);
      }
    },
  },
};
