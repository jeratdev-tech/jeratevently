import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes with a route matcher
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/events/:id",
]);

// Middleware function
export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect(); // Protect non-public routes
  }
});

// Configuration to ignore specific routes (for example, webhooks)
export const config = {
  matcher: [
    // Ignore Next.js internals and all static files unless in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Ignored routes like webhooks
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
  ],
};
