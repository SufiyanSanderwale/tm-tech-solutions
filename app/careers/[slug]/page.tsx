import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHero from '../../components/PageHero'
import ApplyForm from '../../components/ApplyForm'
import { getJobBySlug } from '@/lib/jobs'
import { formatDaysAgo, isDbConfigured } from '@/lib/utils'

export const dynamic = 'force-dynamic'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isDbConfigured()) {
    return { title: 'Careers | TM Tech Solutions' }
  }

  try {
    const job = await getJobBySlug(params.slug)
    if (!job) return { title: 'Job Not Found | TM Tech Solutions' }
    return {
      title: `${job.title} | Careers | TM Tech Solutions`,
      description: job.description.slice(0, 160),
    }
  } catch {
    return { title: 'Careers | TM Tech Solutions' }
  }
}

export default async function JobDetailPage({ params }: Props) {
  if (!isDbConfigured()) {
    notFound()
  }

  let job: Awaited<ReturnType<typeof getJobBySlug>> = null

  try {
    job = await getJobBySlug(params.slug)
  } catch {
    notFound()
  }

  if (!job) {
    notFound()
  }

  const applicantLabel =
    job.applicationCount === 1
      ? '1 person applied'
      : `${job.applicationCount} people applied`

  return (
    <>
      <PageHero
        badge={job.jobType}
        title={job.title}
        subtitle={`${job.location} · ${formatDaysAgo(new Date(job.createdAt))} · ${applicantLabel}`}
      />

      <section className="section-padding bg-white">
        <div className="container-max">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all jobs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8">
              <div className="modern-card p-6 sm:p-8">
                <h2 className="text-xl font-bold font-display text-dark-900 mb-4">Job Description</h2>
                <div className="prose prose-sm max-w-none text-dark-600 whitespace-pre-wrap leading-relaxed">
                  {job.description}
                </div>
              </div>

              {job.requirements && (
                <div className="modern-card p-6 sm:p-8">
                  <h2 className="text-xl font-bold font-display text-dark-900 mb-4">Requirements</h2>
                  <div className="prose prose-sm max-w-none text-dark-600 whitespace-pre-wrap leading-relaxed">
                    {job.requirements}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="px-4 py-2 rounded-xl bg-primary-50 text-primary-700 font-medium">
                  {job.location}
                </span>
                <span className="px-4 py-2 rounded-xl bg-dark-100 text-dark-700 font-medium">
                  {job.jobType}
                </span>
                <span className="px-4 py-2 rounded-xl bg-accent-50 text-accent-700 font-medium">
                  {applicantLabel}
                </span>
              </div>
            </div>

            <ApplyForm jobId={job.id} jobTitle={job.title} />
          </div>
        </div>
      </section>
    </>
  )
}
