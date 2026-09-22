import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default hasClerk
  ? authMiddleware({
      publicRoutes: ['/', '/api/webhook/clerk'],
      ignoredRoutes: ['/api/webhook/clerk'],
    })
  : () => NextResponse.next();

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
