import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Default 1 day
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // UI for the sign in page
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "hidden" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        try {
          const { email, password, rememberMe } = credentials;
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/sign-in`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
              referer: process.env.NEXT_PUBLIC_BASE_URL ?? "",
            },
          });
          const user = await res.json();

          // If no error and we have user data, return it
          if (res.ok && user) {
            return { ...user, rememberMe };
          }
        } catch (error) {
          console.error("Authorization error", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.rememberMe = user.rememberMe;
        token.name = user.name;
      }

      // fetch the updated user from the db
      if (trigger === "update") {
        const updatedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        if (updatedUser) {
          token.name = updatedUser.name;
        }
      }

      if (token.rememberMe === "true") {
        token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days
      } else {
        token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // Default 1 day
      }
      console.log("Staying logged in until:", token.exp);

      return token;
    },
    // Forward the accessToken and user ID to the session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.token = token.jti; // Forward accessToken
        session.user.role = token.role;
        session.user.name = token.name;
      }

      // Ensure session expiration matches JWT expiration
      if (typeof token.exp === "number" && token.exp) {
        session.expires = new Date(token.exp * 1000).toISOString();
      }

      console.log("Session expires at:", session.expires);

      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      // Create a default list for the new user
      try {
        await prisma.list.create({
          data: {
            name: "Default",
            userId: user.id,
          },
        });
        console.log(`Created default list for user ${user.id}`);
      } catch (error) {
        console.error(
          `Failed to create default list for user ${user.id}:`,
          error
        );
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
