import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminId = process.env.ADMIN_USER_ID;
  if (!user || !adminId || user.id !== adminId) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // The two-factor step itself only needs the password session.
  if (pathname === "/admin/mfa") return response;

  // Everything else requires a verified second factor (AAL2).
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  const hasVerifiedFactor = (user.factors ?? []).some(
    (f) => f.factor_type === "totp" && f.status === "verified"
  );
  if (aal?.currentLevel !== "aal2" || !hasVerifiedFactor) {
    return NextResponse.redirect(new URL("/admin/mfa", request.url));
  }

  return response;
}

export const config = {
  matcher: "/admin/:path*",
};
