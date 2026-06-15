interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 sm:mb-16 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <span className={`section-badge mb-4 ${centered ? 'mx-auto' : ''} inline-flex`}>
          {badge}
        </span>
      )}
      <h2 className={`section-title mb-4 text-balance ${light ? 'text-white' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${centered ? 'mx-auto' : ''} ${light ? 'text-primary-100/80' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
