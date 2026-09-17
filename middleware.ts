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

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export default function middleware(req: any, evt: any) {
  const secretKey =
    process.env.CLERK_SECRET_KEY ||
    'sk_test_85SQ6L1URBzYQhVGGmOvQ4qaQEeaexrui1M1jyfUuA';
  const publishableKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    'pk_test_ZWFzeS10YXBpci03MDM5LmNsZXJrLmFjY291bnRzLmRldiQ';

  if (!process.env.CLERK_SECRET_KEY) {
    process.env.CLERK_SECRET_KEY = secretKey;
  }
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = publishableKey;
  }

  try {
    return clerkHandler(req, evt);
  } catch (err) {
    return;
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webmanifest|ttf|woff2?|png|jpg|jpeg|gif|svg|webp|ico)).*)',
    '/(api|trpc)(.*)',
  ],
};
