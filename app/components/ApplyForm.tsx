'use client'

import { useState } from 'react'

type ApplyFormProps = {
  jobId: string
  jobTitle: string
}

export default function ApplyForm({ jobId, jobTitle }: ApplyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [resume, setResume] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')

    if (!resume) {
      setStatus('error')
      setErrorMessage('Please upload your resume.')
      setIsSubmitting(false)
      return
    }

    try {
      const payload = new FormData()
      payload.append('jobId', jobId)
      payload.append('name', formData.name)
      payload.append('email', formData.email)
      payload.append('phone', formData.phone)
      payload.append('message', formData.message)
      payload.append('resume', resume)

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: payload,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application.')
      }

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setResume(null)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modern-card p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold font-display text-dark-900 mb-2">
        Apply for {jobTitle}
      </h2>
      <p className="text-dark-500 text-sm mb-6">
        Fill in your details and upload your resume (PDF or Word, max 4 MB).
      </p>

      {status === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm">
          Thank you! Your application has been submitted. Our HR team will review it soon.
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-2">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-dark-700 mb-2">
              Phone *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              placeholder="+91 9876543210"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            placeholder="you@email.com"
          />
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-dark-700 mb-2">
            Resume (PDF / Word) *
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => setResume(e.target.files?.[0] ?? null)}
            className="w-full px-4 py-3 rounded-xl border border-dark-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary-50 file:text-primary-700 file:font-medium"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-dark-700 mb-2">
            Cover Message (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
            placeholder="Briefly tell us why you are a good fit..."
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto disabled:opacity-60">
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  )
}
