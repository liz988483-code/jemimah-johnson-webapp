import React from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  description,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`${centered ? 'text-center' : 'text-left'} ${className}`}>
      {subtitle && (
        <h3 className="text-sm font-medium text-primary-600 uppercase tracking-wider mb-2">
          {subtitle}
        </h3>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mb-4 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
