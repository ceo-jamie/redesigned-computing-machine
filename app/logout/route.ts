// app/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL('/', req.url); // send them back home (or change to '/login')
  const res = NextResponse.redirect(url);
  // clear the B2B auth cookie
  res.cookies.set('b2b_auth', '', { path: '/', expires: new Date(0) });
  return res;
}
