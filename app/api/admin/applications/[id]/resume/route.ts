import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth'
import {
  extractPublicIdFromUrl,
  getResumeFetchUrl,
  getResumeMimeType,
  sanitizeResumeFilename,
} from '@/lib/cloudinary'
import { getApplicationById } from '@/lib/jobs'
import { isDbConfigured } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function GET(
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
    const application = await getApplicationById(params.id)
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    const publicId =
      application.resumePublicId ?? extractPublicIdFromUrl(application.resumeUrl)
    const fileName =
      application.resumeFileName ??
      sanitizeResumeFilename('resume.pdf', application.name)

    const fetchUrl = getResumeFetchUrl(publicId, application.resumeUrl)
    const fileResponse = await fetch(fetchUrl)

    if (!fileResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch resume from storage' }, { status: 502 })
    }

    const fileBuffer = await fileResponse.arrayBuffer()

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': getResumeMimeType(fileName),
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'private, no-cache',
      },
    })
  } catch (error) {
    console.error('Resume download failed:', error)
    return NextResponse.json({ error: 'Failed to download resume' }, { status: 500 })
  }
}
