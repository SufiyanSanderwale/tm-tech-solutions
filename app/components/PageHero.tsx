interface PageHeroProps {
  title: string
  subtitle: string
  badge?: string
  videoSrc?: string
}

export default function PageHero({ title, subtitle, badge, videoSrc }: PageHeroProps) {
  return (
    <section className="page-hero-gradient relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      {videoSrc && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-hero-mesh opacity-40" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="container-max relative z-10 text-center px-4">
        {badge && (
          <span className="section-badge mb-6 animate-fade-in">{badge}</span>
        )}
        <h1 className="text-mobile-3xl font-bold text-white mb-4 tracking-tight text-balance animate-fade-in">
          {title}
        </h1>
        <p className="text-mobile-lg text-primary-100/90 max-w-2xl mx-auto animate-fade-in">
          {subtitle}
        </p>
        <div className="divider-gradient max-w-xs mx-auto mt-8" />
      </div>
    </section>
  )
}
