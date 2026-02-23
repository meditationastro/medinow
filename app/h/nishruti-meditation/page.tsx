import type { Metadata } from "next"
import { NishrutiClient } from "./NishrutiClient"

export const metadata: Metadata = {
  title: "Nishruti Meditation Course – Transcending the Planes of Hearing | MeditationAstro",
  description: "Discover Nishruti Meditation by Niaadim — a transformative journey through Shruti, Anusruti, and Nishruti: the three sacred planes of hearing. Online course, 5 modules.",
  keywords: "Nishruti meditation, Niaadim, Vedic meditation, sacred sound, inner listening, Shruti Anusruti, meditation course Nepal",
  openGraph: {
    title: "Nishruti Meditation – Transcending the Planes of Hearing",
    description: "A sacred journey from outer sound to inner silence. Developed by Niaadim, Vedic meditation astrologer.",
    type: "website",
  }
}

export default function NishrutiPage() {
  return <NishrutiClient />
}
