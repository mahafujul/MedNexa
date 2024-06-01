import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// Middleware function to handle redirection logic based on user's authentication and role
export async function middleware(request: NextRequest) {
  // Retrieve the token from the request
  const token = await getToken({ req: request });

  // Extract the user's role from the token and convert it to lowercase
  const role = token?.role?.toString().toLowerCase();

  // Extract the request URL
  const url = request.nextUrl;

  // Get the subpath after the first two segments of the URL
  let remainingPath = url.pathname.split("/")[3] || "";

  // If the user is authenticated and tries to access login/signup or a general dashboard path
  if (
    token &&
    (url.pathname.startsWith("/login_signup") ||
      url.pathname.startsWith("/dashboard"))
  ) {
    // Redirect to their specific role-based dashboard if not already there
    if (!url.pathname.startsWith(`/dashboard/${role}`)) {
      return NextResponse.redirect(
        new URL(`/dashboard/${role}/${remainingPath}`, request.url)
      );
    }
  }

  // If the user is not authenticated and tries to access any dashboard path
  if (!token && url.pathname.startsWith("/dashboard")) {
    // Redirect them to the login/signup page
    return NextResponse.redirect(new URL("/login_signup", request.url));
  }

  // Proceed with the request if no redirection is needed
  return NextResponse.next();
}

// Apply the middleware to specific paths
export const config = {
  matcher: ["/login_signup", "/dashboard/:path*"],
};
