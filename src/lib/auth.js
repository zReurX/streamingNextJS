import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";


export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider,
    GoogleProvider
  ],
  callbacks: {
    async signIn({ user, account }) {
      // se è OAuth e l’email esiste già in un altro user.id
      if (account.provider !== "credentials" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser && existingUser.id !== user.id) {
          // ricollega l’account al user esistente
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: { userId: existingUser.id },
            create: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
            },
          });
          // forza l’id in sessione
          user.id = existingUser.id;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
})