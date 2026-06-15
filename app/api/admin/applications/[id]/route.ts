import { NextResponse } from 'next/server'
import { updateApplicationStatus } from '@/lib/jobs'
import { requireAdminSession } from '@/lib/auth'
import { isDbConfigured } from '@/lib/utils'
import { APPLICATION_STATUSES, type ApplicationStatus } from '@/lib/schema'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdminSession()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const status = body.status as ApplicationStatus

    if (!APPLICATION_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status.' }, { status: 400 })
    }

    await updateApplicationStatus(params.id, status)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update application:', error)
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }
}
