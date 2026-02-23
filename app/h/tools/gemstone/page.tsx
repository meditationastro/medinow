"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Intent = "confidence" | "calm" | "love" | "prosperity" | "protection" | "focus";

const DATA: Record<Intent, { gemstone: string; why: string; how: string[]; caution: string[] }> = {
  confidence: {
    gemstone: "Ruby (Sun) / Garnet (gentle alternative)",
    why: "Supports confidence, leadership, and vitality.",
    how: ["Wear after consultation", "Clean with mild water; avoid harsh chemicals", "Set intention before wearing"],
    caution: ["If you have high heat/anger, be cautious", "Not a medical treatment"],
  },
  calm: {
    gemstone: "Pearl / Moonstone (Moon)",
    why: "Supports calm mind, emotional balance, and sleep routine.",
    how: ["Use in evening practice", "Keep near bed or wear occasionally", "Pair with cooling breathwork"],
    caution: ["If feeling too sluggish, reduce use", "Consult for exact suitability"],
  },
  love: {
    gemstone: "Diamond / Opal (Venus)",
    why: "Supports relationships, harmony, and self-worth.",
    how: ["Use on Fridays", "Pair with gratitude and kindness practice", "Avoid over-attachment"],
    caution: ["If overindulging, focus on discipline too"],
  },
  prosperity: {
    gemstone: "Yellow Sapphire / Citrine (Jupiter)",
    why: "Supports wisdom, growth, and opportunities.",
    how: ["Use with study + action", "Offer service/charity weekly", "Keep goals written"],
    caution: ["Do not replace financial planning"],
  },
  protection: {
    gemstone: "Red Coral (Mars) / Black Tourmaline (modern use)",
    why: "Supports courage, boundaries, and protection intention.",
    how: ["Use during travel or challenging periods", "Combine with Hanuman practice", "Stay grounded and calm"],
    caution: ["If you feel more anger, reduce use"],
  },
  focus: {
    gemstone: "Emerald (Mercury) / Green Aventurine (gentle)",
    why: "Supports learning, communication, and clarity.",
    how: ["Use before study/work blocks", "Keep desk clear", "Speak less, listen more"],
    caution: ["Avoid overstimulation and too much screen time"],
  },
};

export default function GemstoneToolPage() {
  const [intent, setIntent] = React.useState<Intent>("calm");
  const d = DATA[intent];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gemstone Guidance</h1>
            <p className="mt-2 text-slate-600">Educational guidance—final gemstone choice should be confirmed by a Jyotish consultation.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/h/tools">Back</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Select your intent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={intent} onValueChange={(v) => setIntent(v as Intent)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose intent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confidence">Confidence</SelectItem>
                  <SelectItem value="calm">Calm</SelectItem>
                  <SelectItem value="love">Love</SelectItem>
                  <SelectItem value="prosperity">Prosperity</SelectItem>
                  <SelectItem value="protection">Protection</SelectItem>
                  <SelectItem value="focus">Focus</SelectItem>
                </SelectContent>
              </Select>

              <div className="rounded-xl border bg-white p-4 text-sm">
                <div className="text-xs text-slate-500">Suggested gemstone</div>
                <div className="mt-1 text-base font-semibold">{d.gemstone}</div>
                <p className="mt-2 text-slate-600">{d.why}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>How to use safely</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="how">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="how">How</TabsTrigger>
                  <TabsTrigger value="caution">Caution</TabsTrigger>
                </TabsList>
                <TabsContent value="how" className="mt-4">
                  <ul className="list-disc pl-5 text-sm text-slate-600">
                    {d.how.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </TabsContent>
                <TabsContent value="caution" className="mt-4">
                  <ul className="list-disc pl-5 text-sm text-slate-600">
                    {d.caution.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                  <div className="mt-4 rounded-xl border bg-white p-3 text-xs text-slate-500">
                    Disclaimer: Gemstones are spiritual tools and do not replace medical or financial advice.
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <div className="text-sm font-semibold">Want your gemstone confirmed?</div>
                <p className="mt-1 text-sm text-slate-600">
                  We check chart strength, suitability, and safe alternatives based on your current period and constitution.
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
