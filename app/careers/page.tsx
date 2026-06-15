import type { Metadata } from 'next'
import PageHero from '../components/PageHero'
import JobCard from '../components/JobCard'
import { getActiveJobsWithCounts } from '@/lib/jobs'
import { isDbConfigured } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Careers | TM Tech Solutions',
  description: 'Explore job openings at TM Tech Solutions in Pune. Join our team in automation and fabrication.',
}

export const dynamic = 'force-dynamic'

export default async function CareersPage() {
  let jobs: Awaited<ReturnType<typeof getActiveJobsWithCounts>> = []
  let dbReady = false
  let error: string | null = null

  if (isDbConfigured()) {
    try {
      jobs = await getActiveJobsWithCounts()
      dbReady = true
    } catch (e) {
      console.error(e)
      error = 'Unable to load jobs right now. Please try again later.'
    }
  }

  return (
    <>
      <PageHero
        badge="Join Our Team"
        title="Careers at TM Tech Solutions"
        subtitle="Build your future in automation, fabrication, and precision engineering with us in Pune."
      />

      <section className="section-padding bg-dark-50">
        <div className="container-max">
          {!isDbConfigured() && (
            <div className="modern-card p-8 text-center max-w-2xl mx-auto">
              <h2 className="text-xl font-bold font-display text-dark-900 mb-3">Careers coming soon</h2>
              <p className="text-dark-500">
                Job listings are being set up. Meanwhile, you can reach us at{' '}
                <a href="mailto:tmtechsolutions11@gmail.com" className="text-primary-600 hover:underline">
                  tmtechsolutions11@gmail.com
                </a>
              </p>
            </div>
          )}

          {error && (
            <div className="modern-card p-8 text-center max-w-2xl mx-auto border-red-200 bg-red-50">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {dbReady && jobs.length === 0 && (
            <div className="modern-card p-8 text-center max-w-2xl mx-auto">
              <h2 className="text-xl font-bold font-display text-dark-900 mb-3">No open positions right now</h2>
              <p className="text-dark-500">
                Check back soon or send your resume to{' '}
                <a href="mailto:tmtechsolutions11@gmail.com" className="text-primary-600 hover:underline">
                  tmtechsolutions11@gmail.com
                </a>
              </p>
            </div>
          )}

          {jobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
