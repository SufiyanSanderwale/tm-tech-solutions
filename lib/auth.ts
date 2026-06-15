import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'tmtech_admin_session'

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SECRET
  if (!secret || secret.length < 16) {
    throw new Error('ADMIN_SECRET must be at least 16 characters.')
  }
  return new TextEncoder().encode(secret)
}

export async function createAdminSession(): Promise<void> {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearAdminSession(): Promise<void> {
  cookies().set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}

export async function verifyAdminSession(): Promise<boolean> {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return false

  try {
    await jwtVerify(token, getSecret())
    return true
  } catch {
    return false
  }
}

export async function requireAdminSession(): Promise<void> {
  const valid = await verifyAdminSession()
  if (!valid) {
    throw new Error('Unauthorized')
  }
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return password === expected
}

export { COOKIE_NAME }
