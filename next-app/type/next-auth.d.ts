import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the user ID
      token: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    role: string;
    rememberMe: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string; // Ensure the JWT sub property is treated as a string
    jti: string;
    role: string;
  }
}
