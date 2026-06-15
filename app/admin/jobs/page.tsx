'use client'

import { Suspense, useEffect, useState } from 'react'
import AdminNav from '../../components/AdminNav'
import { formatDate, formatDaysAgo } from '@/lib/utils'

type Job = {
  id: string
  title: string
  slug: string
  description: string
  location: string
  jobType: string
  requirements: string | null
  isActive: boolean
  createdAt: string
  applicationCount: number
}

const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract']

function AdminJobsContent() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: 'Pune, Maharashtra',
    jobType: 'Full-time',
    requirements: '',
  })

  const loadJobs = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/jobs')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load jobs')
      setJobs(data.jobs)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create job')

      setForm({
        title: '',
        description: '',
        location: 'Pune, Maharashtra',
        jobType: 'Full-time',
        requirements: '',
      })
      setShowForm(false)
      await loadJobs()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job')
    } finally {
      setIsSaving(false)
    }
  }

  const toggleActive = async (job: Job) => {
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !job.isActive }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update job')
      }
      await loadJobs()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update job')
    }
  }

  const deleteJob = async (job: Job) => {
    if (!confirm(`Delete "${job.title}"? This will also remove all applications.`)) return

    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete job')
      }
      await loadJobs()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete job')
    }
  }

  return (
    <>
      <AdminNav />
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-display text-dark-900">Job Openings</h1>
            <p className="text-dark-500 text-sm mt-1">Add, close, or remove job postings</p>
          </div>
          <button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : '+ Add New Job'}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleCreate} className="modern-card p-6 sm:p-8 mb-8 space-y-5">
            <h2 className="text-lg font-bold font-display text-dark-900">New Job Opening</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-dark-700 mb-2">Job Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="input-modern"
                  placeholder="e.g. Design Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">Location *</label>
                <input
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="input-modern"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">Job Type *</label>
                <select
                  required
                  value={form.jobType}
                  onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                  className="input-modern"
                >
                  {JOB_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-dark-700 mb-2">Job Description *</label>
                <textarea
                  required
                  rows={6}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-modern resize-none"
                  placeholder="Describe the role, responsibilities, and what you offer..."
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-dark-700 mb-2">Requirements (optional)</label>
                <textarea
                  rows={4}
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  className="input-modern resize-none"
                  placeholder="Experience, skills, education..."
                />
              </div>
            </div>
            <button type="submit" disabled={isSaving} className="btn-primary disabled:opacity-60">
              {isSaving ? 'Publishing...' : 'Publish Job'}
            </button>
          </form>
        )}

        {loading ? (
          <p className="text-dark-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="modern-card p-8 text-center text-dark-500">No jobs yet. Add your first opening.</div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="modern-card p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold font-display text-dark-900">{job.title}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          job.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-dark-100 text-dark-600'
                        }`}
                      >
                        {job.isActive ? 'Active' : 'Closed'}
                      </span>
                    </div>
                    <p className="text-sm text-dark-500 mb-3">
                      {job.location} · {job.jobType} · {formatDaysAgo(new Date(job.createdAt))} ·{' '}
                      {job.applicationCount} applicant{job.applicationCount !== 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-dark-600 line-clamp-2">{job.description}</p>
                    <p className="text-xs text-dark-400 mt-2">Posted {formatDate(new Date(job.createdAt))}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => toggleActive(job)}
                      className="px-4 py-2 rounded-lg text-sm font-medium border border-dark-200 hover:bg-dark-50"
                    >
                      {job.isActive ? 'Close Job' : 'Reopen Job'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteJob(job)}
                      className="px-4 py-2 rounded-lg text-sm font-medium border border-red-200 text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function AdminJobsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-dark-500">Loading...</div>}>
      <AdminJobsContent />
    </Suspense>
  )
}
