import { NextResponse, NextRequest } from 'next/server';
export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

// This function handles middleware logic and can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const role = token?.role?.toString().toLowerCase();
    const url = request.nextUrl;

    // If token exists and user is trying to access login/signup or dashboard, redirect them to their specific dashboard
    if (token && (url.pathname.startsWith('/login_signup') || url.pathname.startsWith('/dashboard'))) {
        // If user is already on their role-based dashboard, do not redirect
        if (url.pathname !== `/dashboard/${role}`) {
            return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
        }
    }

    // If no token and user is trying to access dashboard, redirect them to login/signup
    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login_signup', request.url));
    }

    // Continue with the request if no redirection is needed
    return NextResponse.next();
}

// Specify the paths where the middleware should be applied
export const config = {
    matcher: [
        '/login_signup',
        '/dashboard/:path*',
    ],
};
