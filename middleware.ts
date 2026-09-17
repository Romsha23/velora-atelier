import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/shop(.*)',
  '/product(.*)',
  '/cart(.*)',
  '/checkout(.*)',
  '/order-confirmation(.*)',
  '/journal(.*)',
  '/runway(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/login(.*)',
  '/api(.*)',
]);

const publishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  'pk_test_ZWFzeS10YXBpci03MDM5LmNsZXJrLmFjY291bnRzLmRldiQ';

const secretKey =
  process.env.CLERK_SECRET_KEY ||
  'sk_test_85SQ6L1URBzYQhVGGmOvQ4qaQEeaexrui1M1jyfUuA';

export default function middleware(req: NextRequest, evt: any) {
  try {
    const handler = clerkMiddleware(
      async (auth, request) => {
        if (!isPublicRoute(request)) {
          await auth.protect();
        }
      },
      { publishableKey, secretKey }
    );
    return handler(req, evt);
  } catch (error) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webmanifest|ttf|woff2?|png|jpg|jpeg|gif|svg|webp|ico)).*)',
    '/(api|trpc)(.*)',
  ],
};
