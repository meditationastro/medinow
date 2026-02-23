"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type Goal = "peace" | "focus" | "protection" | "prosperity" | "healing";

const WHATSAPP_NUMBER = "9779800000000"; // change to your WhatsApp number (no +)
function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const DATA: Record<Goal, { title: string; mantras: { name: string; text: string; how: string }[]; plan: string[] }> = {
  peace: {
    title: "Peace & calm",
    mantras: [
      { name: "Om Shanti", text: "ॐ शान्तिः शान्तिः शान्तिः", how: "108 times daily, slow breathing." },
      { name: "Mahamrityunjaya (gentle)", text: "ॐ त्र्यम्बकं यजामहे...", how: "27–108 times, especially evenings." },
    ],
    plan: ["Day 1–2: 5 min breath + 27 japa", "Day 3–5: 10 min + 54 japa", "Day 6–7: 15 min + 108 japa"],
  },
  focus: {
    title: "Focus & study",
    mantras: [
      { name: "Gayatri", text: "ॐ भूर्भुवः स्वः ...", how: "Morning, 108 times (or 27 if short)." },
      { name: "Om Aim Saraswatyai Namah", text: "ॐ ऐं सरस्वत्यै नमः", how: "Before study/work blocks." },
    ],
    plan: ["Choose a fixed time", "No phone during japa", "Do 3 focused blocks daily (25 min)"],
  },
  protection: {
    title: "Protection & strength",
    mantras: [
      { name: "Hanuman Chalisa (daily)", text: "Recitation", how: "1 time daily, Tuesday/Saturday ideal." },
      { name: "Om Dum Durgayei Namah", text: "ॐ दुं दुर्गायै नमः", how: "108 times, steady rhythm." },
    ],
    plan: ["Clean space + diya", "Keep mind steady", "End with gratitude and charity intention"],
  },
  prosperity: {
    title: "Prosperity & opportunities",
    mantras: [
      { name: "Om Shreem Mahalakshmyai Namah", text: "ॐ श्रीं महालक्ष्म्यै नमः", how: "108 times, Friday ideal." },
      { name: "Om Gam Ganapataye Namah", text: "ॐ गं गणपतये नमः", how: "Start new work with 27 japa." },
    ],
    plan: ["Offer sweets/flowers (optional)", "Do one concrete action daily", "Donate something weekly"],
  },
  healing: {
    title: "Healing & balance",
    mantras: [
      { name: "Mahamrityunjaya", text: "ॐ त्र्यम्बकं यजामहे...", how: "108 times, evenings." },
      { name: "Om Namah Shivaya", text: "ॐ नमः शिवाय", how: "Anytime, 108 times." },
    ],
    plan: ["Hydrate + light food", "Sleep on time", "Japa + 10 min meditation daily"],
  },
};

export default function MantraToolPage() {
  const [goal, setGoal] = React.useState<Goal>("peace");
  const selected = DATA[goal];

  const share = `Mantra plan goal: ${selected.title}. Mantras: ${selected.mantras.map((m) => `${m.name} (${m.how})`).join(" | ")}. 7-day plan: ${selected.plan.join(" / ")}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mantra Recommender</h1>
            <p className="mt-2 text-slate-600">Choose your goal and get a simple, consistent practice plan.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/h/tools">Back</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Select goal</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {(["peace","focus","protection","prosperity","healing"] as Goal[]).map((g) => (
                <button
                  key={g}
                  className={[
                    "rounded-xl border px-3 py-3 text-left text-sm transition",
                    goal === g ? "border-slate-900 bg-slate-900 text-white" : "bg-white hover:bg-slate-50",
                  ].join(" ")}
                  onClick={() => setGoal(g)}
                  type="button"
                >
                  <div className="font-semibold">{DATA[g].title}</div>
                  <div className="mt-1 text-xs opacity-80">Tap to select</div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Plan</span>
                <Badge>{selected.title}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mantras">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mantras">Mantras</TabsTrigger>
                  <TabsTrigger value="plan">7-day plan</TabsTrigger>
                </TabsList>

                <TabsContent value="mantras" className="mt-4 space-y-3">
                  {selected.mantras.map((m) => (
                    <div key={m.name} className="rounded-xl border bg-white p-3 text-sm">
                      <div className="font-semibold">{m.name}</div>
                      <div className="mt-1 text-slate-600">{m.text}</div>
                      <div className="mt-2 text-xs text-slate-500">{m.how}</div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="plan" className="mt-4">
                  <ul className="list-disc pl-5 text-sm text-slate-600">
                    {selected.plan.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </TabsContent>
              </Tabs>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" onClick={() => navigator.clipboard?.writeText(share).catch(() => {})}>
                  Copy
                </Button>
                <Button asChild>
                  <a href={whatsappHref(share)} target="_blank" rel="noreferrer">WhatsApp</a>
                </Button>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <div className="text-sm font-semibold">Want a personalized mantra?</div>
                <p className="mt-1 text-sm text-slate-600">
                  We pick mantras based on your chart, current dasha, and mental state—then set a practice schedule.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button asChild variant="outline"><Link href="/h/jyotish-consultancy">Consultancy</Link></Button>
                  <Button asChild><Link href="/h/appointment">Book</Link></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
