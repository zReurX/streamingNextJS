import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"



export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "Email e Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // verifica credenziali con prisma.user.findUnique
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (user && checkPassword(credentials.password, user.hashedPassword)) {
          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // se l’utente esiste già (stesso email) e account nuovo, ricolleghiamo
      if (account.provider !== "credentials" && user.email) {
        const existing = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        if (existing && existing.id !== user.id) {
          // cancelliamo l’utente doppione creato da NextAuth
          const existing = await prisma.user.findUnique({ where: { id: user.id } });
          if (existing) {
            await prisma.user.delete({ where: { id: user.id } });
          }

          // aggiorniamo l’account OAuth collegandolo all’utente esistente
          await prisma.account.update({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            data: { userId: existing.id },
          });

          // in sessione forziamo l’id dell’esistente
          user.id = existing.id;
        }
      }
      return true;
    },
  },
})