import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const MAX_RESUME_SIZE = 4 * 1024 * 1024 // 4 MB (Vercel request limit)

const MIME_TO_EXT: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
}

const EXT_TO_MIME: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

function getExtensionFromFile(file: File): string {
  const fromName = file.name.includes('.') ? file.name.split('.').pop()?.toLowerCase() : ''
  if (fromName && MIME_TO_EXT[file.type] === fromName) return fromName
  if (fromName && ['pdf', 'doc', 'docx'].includes(fromName)) return fromName
  return MIME_TO_EXT[file.type] ?? 'pdf'
}

export function sanitizeResumeFilename(originalName: string, applicantName: string): string {
  const ext = originalName.includes('.')
    ? originalName.split('.').pop()?.toLowerCase()
    : 'pdf'
  const validExt = ext && ['pdf', 'doc', 'docx'].includes(ext) ? ext : 'pdf'
  const safeName = applicantName
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 50)

  return `${safeName || 'Applicant'}_Resume.${validExt}`
}

export function getResumeMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() ?? 'pdf'
  return EXT_TO_MIME[ext] ?? 'application/octet-stream'
}

export function extractPublicIdFromUrl(url: string): string | null {
  const match = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+?)(?:\?|#|$)/)
  return match?.[1] ?? null
}

export function getResumeFetchUrl(publicId: string | null, fallbackUrl: string): string {
  if (publicId) {
    return cloudinary.url(publicId, {
      resource_type: 'raw',
      secure: true,
      type: 'upload',
    })
  }
  return fallbackUrl
}

export async function uploadResume(
  file: File,
  applicantName: string
): Promise<{ url: string; publicId: string; fileName: string }> {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary is not configured.')
  }

  if (file.size > MAX_RESUME_SIZE) {
    throw new Error('Resume must be 4 MB or smaller.')
  }

  const allowedTypes = Object.keys(MIME_TO_EXT)

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Resume must be a PDF or Word document.')
  }

  const ext = getExtensionFromFile(file)
  const fileName = sanitizeResumeFilename(file.name, applicantName)
  const publicId = `tmtech-resumes/${crypto.randomUUID()}.${ext}`

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          public_id: publicId,
        },
        (error, uploadResult) => {
          if (error || !uploadResult) {
            reject(error ?? new Error('Upload failed'))
            return
          }
          resolve(uploadResult)
        }
      )
      stream.end(buffer)
    }
  )

  return {
    url: result.secure_url,
    publicId: result.public_id,
    fileName,
  }
}
