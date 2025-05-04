import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://stackzen.app';
  const response = NextResponse.redirect(new URL('/', baseUrl));
  response.cookies.delete('__next_preview_data');
  return response;
}
