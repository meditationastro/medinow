import { useEffect, useState } from "react"

const chakras = [
  { name: "Root", color: "var(--chakra-root)", position: "top-20 left-10" },
  { name: "Sacral", color: "var(--chakra-sacral)", position: "top-32 right-16" },
  { name: "Solar Plexus", color: "var(--chakra-solar-plexus)", position: "top-44 left-20" },
  { name: "Heart", color: "var(--chakra-heart)", position: "top-56 right-12" },
  { name: "Throat", color: "var(--chakra-throat)", position: "top-68 left-16" },
  { name: "Third Eye", color: "var(--chakra-third-eye)", position: "top-80 right-20" },
  { name: "Crown", color: "var(--chakra-crown)", position: "top-96 left-12" },
]

export function Background() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {chakras.map((chakra, index) => (
        <div
          key={chakra.name}
          className={`absolute ${chakra.position} opacity-20`}
          style={{
            transform: `translateY(${scrollY * 0.1 * (index + 1)}px)`,
            animation: `float ${3 + index * 0.5}s ease-in-out infinite alternate`,
          }}
        >
          <div
            className="w-16 h-16 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, ${chakra.color}40, ${chakra.color}10)`,
              boxShadow: `0 0 20px ${chakra.color}30`,
            }}
          />
        </div>
      ))}
    </div>
  )
} 