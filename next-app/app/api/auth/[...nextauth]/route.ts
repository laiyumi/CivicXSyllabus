import NextAuth from "next-auth";
import { authOptions } from "../authOptions";

const handler = NextAuth(authOptions);

// any resuqest that send to this endpoint will be handled by the handler
export { handler as GET, handler as POST };
