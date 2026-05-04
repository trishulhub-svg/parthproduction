import { auth } from './lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isLoggedIn = !!session

  const isAppRoute = nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/inventory') ||
    nextUrl.pathname.startsWith('/categories') ||
    nextUrl.pathname.startsWith('/orders') ||
    nextUrl.pathname.startsWith('/finance') ||
    nextUrl.pathname.startsWith('/employees') ||
    nextUrl.pathname.startsWith('/teams') ||
    nextUrl.pathname.startsWith('/scan') ||
    nextUrl.pathname.startsWith('/settings')

  const isApiProtected = nextUrl.pathname.startsWith('/api/inventory') ||
    nextUrl.pathname.startsWith('/api/categories') ||
    nextUrl.pathname.startsWith('/api/orders') ||
    nextUrl.pathname.startsWith('/api/finance') ||
    nextUrl.pathname.startsWith('/api/employees') ||
    nextUrl.pathname.startsWith('/api/teams') ||
    nextUrl.pathname.startsWith('/api/dashboard')

  if ((isAppRoute || isApiProtected) && !isLoggedIn) {
    if (isApiProtected) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  if (isLoggedIn && nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)'],
}
