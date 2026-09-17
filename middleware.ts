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

export default clerkMiddleware(
  async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  },
  {
    publishableKey:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
      'pk_test_ZWFzeS10YXBpci03MDM5LmNsZXJrLmFjY291bnRzLmRldiQ',
    secretKey:
      process.env.CLERK_SECRET_KEY ||
      'sk_test_85SQ6L1URBzYQhVGGmOvQ4qaQEeaexrui1M1jyfUuA',
  }
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webmanifest|ttf|woff2?|png|jpg|jpeg|gif|svg|webp|ico)).*)',
    '/(api|trpc)(.*)',
  ],
};
