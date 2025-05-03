import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug') || '';

  // Enable Preview Mode by setting cookies
  const response = NextResponse.redirect(slug ? `/blog/${slug}` : '/', { status: 307 });
  response.cookies.set('__prerender_bypass', 'true', { path: '/' });
  response.cookies.set('__next_preview_data', 'true', { path: '/' });

  return response;
}
