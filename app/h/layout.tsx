import { Header } from "@/components/home/Header"
import { Footer } from "@/components/home/Footer"
import { ContactButton } from "@/components/ContactButton"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ContactButton />
    </div>
  )
}


