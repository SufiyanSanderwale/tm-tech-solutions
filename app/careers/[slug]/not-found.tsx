import Link from 'next/link'

export default function CareersNotFound() {
  return (
    <section className="section-padding bg-dark-50 min-h-[60vh] flex items-center">
      <div className="container-max text-center">
        <h1 className="text-2xl font-bold font-display text-dark-900 mb-3">Job not found</h1>
        <p className="text-dark-500 mb-6">This position may have been closed or removed.</p>
        <Link href="/careers" className="btn-primary">
          View all openings
        </Link>
      </div>
    </section>
  )
}
