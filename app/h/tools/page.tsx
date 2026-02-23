import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tools = [
  {
    href: "/h/tools/numerology",
    title: "Vedic Numerology",
    desc: "Calculate Destiny/Life Path number + Name number and get practical guidance.",
  },
  {
    href: "/h/tools/muhurta",
    title: "Muhurta Planner",
    desc: "Create a decision-ready checklist for a good time: intent, constraints, and reminders.",
  },
  {
    href: "/h/tools/mantra",
    title: "Mantra Recommender",
    desc: "Choose your goal and get mantras + a 7-day practice plan.",
  },
  {
    href: "/h/tools/gemstone",
    title: "Gemstone Guidance",
    desc: "Educational tool to explore gemstone intent, cleansing, and safe-use notes.",
  },
];

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vedic Astrology Tools</h1>
            <p className="mt-2 text-slate-600">
              Quick, interactive tools designed for clarity and daily practice. For accurate chart calculations, book a reading.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/h/dosha">Dosha Test</Link>
            </Button>
            <Button asChild>
              <Link href="/h/appointment">Book a Reading</Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {tools.map((t) => (
            <Card key={t.href} className="rounded-2xl">
              <CardHeader>
                <CardTitle>{t.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600">{t.desc}</p>
                <Button asChild>
                  <Link href={t.href}>Open tool</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Want deeper accuracy?</h2>
          <p className="mt-2 text-sm text-slate-600">
            Tools are great for guidance, but exact Vedic astrology needs birth data, ayanamsa, and full chart analysis.
            In a session we cover: Lagna, Moon sign, Nakshatra, Vimshottari timelines, transits, and remedies.
          </p>
          <div className="mt-4 flex gap-2">
            <Button asChild variant="outline">
              <Link href="/h/jyotish-consultancy">Jyotish Consultancy</Link>
            </Button>
            <Button asChild>
              <Link href="/h/appointment">Book Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
