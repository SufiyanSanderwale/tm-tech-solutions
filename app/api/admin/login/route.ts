import { NextResponse } from 'next/server'
import {
  createAdminSession,
  verifyAdminPassword,
} from '@/lib/auth'
import { isAdminConfigured } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: 'Admin login is not configured. Set ADMIN_PASSWORD and ADMIN_SECRET.' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const password = String(body.password ?? '')

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
    }

    await createAdminSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login failed:', error)
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 })
  }
}
