import { NextResponse } from 'next/server'
import { getApplications } from '@/lib/jobs'
import { requireAdminSession } from '@/lib/auth'
import { isDbConfigured } from '@/lib/utils'
import type { ApplicationStatus } from '@/lib/schema'
import { APPLICATION_STATUSES } from '@/lib/schema'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    await requireAdminSession()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('jobId') ?? undefined
    const statusParam = searchParams.get('status') ?? undefined
    const status = APPLICATION_STATUSES.includes(statusParam as ApplicationStatus)
      ? (statusParam as ApplicationStatus)
      : undefined

    const applications = await getApplications({ jobId, status })
    return NextResponse.json({ applications })
  } catch (error) {
    console.error('Failed to fetch applications:', error)
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}
