// Dynamic imports for lazy loading heavy components
import dynamic from 'next/dynamic'
import { CardSkeleton } from './SkeletonLoader'

// Lazy load TemplateCard with loading fallback
export const DynamicTemplateCard = dynamic(
  () => import('./TemplateCard'),
  {
    loading: () => <CardSkeleton />,
    ssr: true
  }
)

// Lazy load PortfolioCard with loading fallback
export const DynamicPortfolioCard = dynamic(
  () => import('./PortfolioCard'),
  {
    loading: () => <CardSkeleton />,
    ssr: true
  }
)

// Lazy load PricingCard with loading fallback
export const DynamicPricingCard = dynamic(
  () => import('./PricingCard'),
  {
    loading: () => <CardSkeleton />,
    ssr: true
  }
)

// Lazy load TestimonialCard with loading fallback
export const DynamicTestimonialCard = dynamic(
  () => import('./TestimonialCard'),
  {
    loading: () => <CardSkeleton />,
    ssr: true
  }
)
