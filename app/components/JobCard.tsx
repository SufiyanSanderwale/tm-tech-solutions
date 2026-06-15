import Link from 'next/link'
import { formatDaysAgo } from '@/lib/utils'
import type { JobWithCount } from '@/lib/jobs'

type JobCardProps = {
  job: JobWithCount
}

export default function JobCard({ job }: JobCardProps) {
  const applicantLabel =
    job.applicationCount === 1
      ? '1 person applied'
      : `${job.applicationCount} people applied`

  return (
    <article className="modern-card group p-6 sm:p-8 flex flex-col h-full hover:shadow-card-hover transition-all duration-300">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 mb-3">
            {job.jobType}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-dark-900 group-hover:text-primary-700 transition-colors">
            {job.title}
          </h2>
        </div>
      </div>

      <p className="text-dark-500 text-sm mb-4 line-clamp-3 flex-grow">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-dark-600 mb-6">
        <span className="inline-flex items-center gap-1.5">
          <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatDaysAgo(new Date(job.createdAt))}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {applicantLabel}
        </span>
      </div>

      <Link href={`/careers/${job.slug}`} className="btn-primary w-full text-center mt-auto">
        View & Apply
      </Link>
    </article>
  )
}
