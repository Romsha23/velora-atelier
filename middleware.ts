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

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webmanifest|ttf|woff2?|png|jpg|jpeg|gif|svg|webp|ico)).*)',
    '/(api|trpc)(.*)',
  ],
};
