import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { verifyPassword } from "../../../libs/auth";

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    Providers.Credentials({
      async authorize(credentials: { email: string; password: string }) {
        const userCollection = await prisma.user.findMany();

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log(user, "USER");
        if (!user) {
          throw new Error("User not found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log you in");
        }

        return { email: user.email, password: user.password };
      },
    }),
  ],
});
