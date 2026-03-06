export const runtime = 'nodejs';

import { auth } from '@core/auth';
import { NextResponse, type NextRequest } from 'next/server';

type AuthenticatedRequest = NextRequest & {
  auth: {
    user?: {
      id?: string;
      username?: string;
      name?: string | null;
      email?: string | null;
    };
  } | null;
};

export default auth((req: AuthenticatedRequest) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
