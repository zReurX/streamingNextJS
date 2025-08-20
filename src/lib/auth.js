import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    GitHub
  ],
})