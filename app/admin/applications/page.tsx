'use client'

import { Suspense, useEffect, useState } from 'react'
import AdminNav from '../../components/AdminNav'
import { formatDate } from '@/lib/utils'

type Application = {
  id: string
  jobId: string
  jobTitle: string
  name: string
  email: string
  phone: string
  resumeUrl: string
  resumePublicId: string | null
  resumeFileName: string | null
  message: string | null
  status: string
  createdAt: string
}

type Job = {
  id: string
  title: string
}

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'applied', label: 'Applied' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'interview_done', label: 'Interview Done' },
  { value: 'selected', label: 'Selected' },
  { value: 'rejected', label: 'Rejected' },
]

const STATUS_LABELS: Record<string, string> = {
  applied: 'Applied',
  shortlisted: 'Shortlisted',
  interview_done: 'Interview Done',
  selected: 'Selected',
  rejected: 'Rejected',
}

function AdminApplicationsContent() {
  const [applications, setApplications] = useState<Application[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [jobFilter, setJobFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (jobFilter) params.set('jobId', jobFilter)
      if (statusFilter) params.set('status', statusFilter)

      const [appsRes, jobsRes] = await Promise.all([
        fetch(`/api/admin/applications?${params.toString()}`),
        fetch('/api/admin/jobs'),
      ])

      const appsData = await appsRes.json()
      const jobsData = await jobsRes.json()

      if (!appsRes.ok) throw new Error(appsData.error || 'Failed to load applications')
      if (!jobsRes.ok) throw new Error(jobsData.error || 'Failed to load jobs')

      setApplications(appsData.applications)
      setJobs(jobsData.jobs.map((j: Job) => ({ id: j.id, title: j.title })))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [jobFilter, statusFilter])

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update status')
      }
      await loadData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    }
  }

  return (
    <>
      <AdminNav />
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display text-dark-900">Applications</h1>
          <p className="text-dark-500 text-sm mt-1">Review applicants and shortlist for interviews</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="input-modern sm:max-w-xs"
          >
            <option value="">All jobs</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-modern sm:max-w-xs"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-dark-500">Loading applications...</p>
        ) : applications.length === 0 ? (
          <div className="modern-card p-8 text-center text-dark-500">No applications found.</div>
        ) : (
          <div className="modern-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-50 border-b border-dark-200 text-left">
                    <th className="px-4 py-3 font-semibold text-dark-700">Applicant</th>
                    <th className="px-4 py-3 font-semibold text-dark-700">Job</th>
                    <th className="px-4 py-3 font-semibold text-dark-700">Applied</th>
                    <th className="px-4 py-3 font-semibold text-dark-700">Status</th>
                    <th className="px-4 py-3 font-semibold text-dark-700">Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-dark-100 hover:bg-dark-50/50">
                      <td className="px-4 py-4">
                        <p className="font-medium text-dark-900">{app.name}</p>
                        <p className="text-dark-500">{app.email}</p>
                        <p className="text-dark-500">{app.phone}</p>
                        {app.message && (
                          <p className="text-dark-400 text-xs mt-1 line-clamp-2">{app.message}</p>
                        )}
                      </td>
                      <td className="px-4 py-4 text-dark-700">{app.jobTitle}</td>
                      <td className="px-4 py-4 text-dark-600 whitespace-nowrap">
                        {formatDate(new Date(app.createdAt))}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={app.status}
                          onChange={(e) => updateStatus(app.id, e.target.value)}
                          className="input-modern py-2 text-sm min-w-[140px]"
                        >
                          {STATUS_OPTIONS.filter((o) => o.value).map((option) => (
                            <option key={option.value} value={option.value}>
                              {STATUS_LABELS[option.value]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <a
                          href={`/api/admin/applications/${app.id}/resume`}
                          className="text-primary-600 hover:underline font-medium"
                        >
                          Download PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function AdminApplicationsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-dark-500">Loading...</div>}>
      <AdminApplicationsContent />
    </Suspense>
  )
}
