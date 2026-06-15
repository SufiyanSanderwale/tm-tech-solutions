import { NextResponse } from 'next/server'
import { getActiveJobsWithCounts } from '@/lib/jobs'
import { isDbConfigured } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json({ jobs: [], configured: false })
  }

  try {
    const jobs = await getActiveJobsWithCounts()
    return NextResponse.json({ jobs, configured: true })
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}
