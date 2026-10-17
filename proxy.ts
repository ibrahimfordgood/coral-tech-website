import { NextResponse, type NextRequest } from "next/server"

// Fast redirect for visitors with no session cookie. The real check is
// requireUser() in the admin layout and in every admin server action.
export function proxy(request: NextRequest) {
  if (!request.cookies.has("ct_session")) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
}
