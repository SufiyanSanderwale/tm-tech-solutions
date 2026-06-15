import { NextResponse } from 'next/server'
import {
  createJob,
  getAllJobsWithCounts,
  slugExists,
} from '@/lib/jobs'
import { requireAdminSession } from '@/lib/auth'
import { isDbConfigured, slugify } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await requireAdminSession()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const jobs = await getAllJobsWithCounts()
    return NextResponse.json({ jobs })
  } catch (error) {
    console.error('Failed to fetch admin jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
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
    const title = String(body.title ?? '').trim()
    const description = String(body.description ?? '').trim()
    const location = String(body.location ?? '').trim()
    const jobType = String(body.jobType ?? '').trim()
    const requirements = String(body.requirements ?? '').trim()

    if (!title || !description || !location || !jobType) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 })
    }

    let slug = slugify(title)
    if (!slug) slug = `job-${Date.now()}`

    if (await slugExists(slug)) {
      slug = `${slug}-${Date.now()}`
    }

    const id = await createJob({
      title,
      slug,
      description,
      location,
      jobType,
      requirements: requirements || undefined,
    })

    return NextResponse.json({ success: true, id, slug })
  } catch (error) {
    console.error('Failed to create job:', error)
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}
