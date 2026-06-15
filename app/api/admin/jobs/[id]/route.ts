import { NextResponse } from 'next/server'
import { deleteJob, getJobById, slugExists, updateJob } from '@/lib/jobs'
import { requireAdminSession } from '@/lib/auth'
import { isDbConfigured, slugify } from '@/lib/utils'

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
    const existing = await getJobById(params.id)
    if (!existing) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    const body = await request.json()
    const updates: Record<string, unknown> = {}

    if (body.title !== undefined) {
      const title = String(body.title).trim()
      if (!title) {
        return NextResponse.json({ error: 'Title is required.' }, { status: 400 })
      }
      updates.title = title
      if (body.slug === undefined) {
        const newSlug = slugify(title)
        if (newSlug && !(await slugExists(newSlug, params.id))) {
          updates.slug = newSlug
        }
      }
    }

    if (body.slug !== undefined) {
      const newSlug = slugify(String(body.slug))
      if (!newSlug) {
        return NextResponse.json({ error: 'Invalid slug.' }, { status: 400 })
      }
      if (await slugExists(newSlug, params.id)) {
        return NextResponse.json({ error: 'Slug already exists.' }, { status: 400 })
      }
      updates.slug = newSlug
    }

    if (body.description !== undefined) updates.description = String(body.description).trim()
    if (body.location !== undefined) updates.location = String(body.location).trim()
    if (body.jobType !== undefined) updates.jobType = String(body.jobType).trim()
    if (body.requirements !== undefined) {
      updates.requirements = String(body.requirements).trim() || null
    }
    if (body.isActive !== undefined) updates.isActive = Boolean(body.isActive)

    await updateJob(params.id, updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update job:', error)
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
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
    const existing = await getJobById(params.id)
    if (!existing) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    await deleteJob(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete job:', error)
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
  }
}
