import Image from 'next/image'

export default function Logo({ className = "h-10 w-auto", variant = "full" }) {
  return (
    <Image 
      src="/logo.png" 
      alt="VezxTech Logo" 
      width={160}
      height={160}
      className={`rounded-full ${className}`}
      priority
      quality={85}
    />
  )
}

// Alternate Logo for dark backgrounds
export function LogoLight({ className = "h-10 w-auto", variant = "full" }) {
  return (
    <Image 
      src="/logo.png" 
      alt="VezxTech Logo" 
      width={160}
      height={160}
      className={`rounded-full ${className}`}
      priority
      quality={85}
    />
  )
}
