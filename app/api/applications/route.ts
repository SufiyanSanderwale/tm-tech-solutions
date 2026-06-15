import { NextResponse } from 'next/server'
import { createApplication, getJobById } from '@/lib/jobs'
import { uploadResume } from '@/lib/cloudinary'
import { isCloudinaryConfigured, isDbConfigured } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ error: 'File upload not configured' }, { status: 503 })
  }

  try {
    const formData = await request.formData()
    const jobId = String(formData.get('jobId') ?? '').trim()
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const resume = formData.get('resume')

    if (!jobId || !name || !email || !phone) {
      return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
    }

    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json({ error: 'Please upload your resume.' }, { status: 400 })
    }

    const job = await getJobById(jobId)
    if (!job || !job.isActive) {
      return NextResponse.json({ error: 'This job is no longer accepting applications.' }, { status: 404 })
    }

    const { url: resumeUrl, publicId, fileName } = await uploadResume(resume, name)

    await createApplication({
      jobId,
      name,
      email,
      phone,
      resumeUrl,
      resumePublicId: publicId,
      resumeFileName: fileName,
      message: message || undefined,
    })

    return NextResponse.json({ success: true, message: 'Application submitted successfully.' })
  } catch (error) {
    console.error('Application failed:', error)
    const message = error instanceof Error ? error.message : 'Failed to submit application.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
