import { useState } from 'react'

export function HoverCard({ children, style, hoverStyle, ...props }) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      {...props}
      style={isHovering ? { ...style, ...hoverStyle } : style}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </div>
  )
}
