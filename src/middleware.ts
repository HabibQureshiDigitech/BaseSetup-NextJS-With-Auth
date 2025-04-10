import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('role')?.value
  const url = req.nextUrl.clone()

  if (!cookie && url.pathname === '/dashboard') {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (cookie === 'user' && url.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard'],
}
