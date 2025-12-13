export default function Logo({ className = "h-10 w-auto", variant = "full" }) {
  return (
    <img 
      src="/logo.png" 
      alt="VezxTech Logo" 
      className={`rounded-full ${className}`}
    />
  )
}

// Alternate Logo for dark backgrounds
export function LogoLight({ className = "h-10 w-auto", variant = "full" }) {
  return (
    <img 
      src="/logo.png" 
      alt="VezxTech Logo" 
      className={`rounded-full ${className}`}
    />
  )
}
