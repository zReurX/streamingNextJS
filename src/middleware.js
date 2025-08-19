// middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  // Se non c'è una sessione valida...
  if (!req.auth) {
    // Costruisci l'URL di signin con callbackUrl completo
    const signInUrl = new URL("/api/auth/signin", req.nextUrl.origin)
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.href)

    // Redirect verso il signin di Auth.js v5
    return NextResponse.redirect(signInUrl)
  }

  // Altrimenti lascia passare la richiesta
  return NextResponse.next()
})

export const config = {
  matcher: [
    "/watch/:path*",     // tutte le sottorotte di /watch
    "/dashboard/:path*", // tutte le sottorotte di /dashboard
  ],
}
