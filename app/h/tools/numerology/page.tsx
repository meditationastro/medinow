"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

function sumToDigit(n: number): number {
  // preserve master numbers 11/22/33
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n)
      .split("")
      .reduce((s, d) => s + Number(d), 0);
  }
  return n;
}

function lifePathFromDate(dateStr: string): number | null {
  // expects YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const digits = dateStr.replaceAll("-", "").split("").map(Number);
  const total = digits.reduce((s, d) => s + d, 0);
  return sumToDigit(total);
}

const MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

function nameNumber(name: string): number | null {
  const letters = name.toUpperCase().replace(/[^A-Z]/g, "");
  if (!letters) return null;
  const total = letters.split("").reduce((s, ch) => s + (MAP[ch] || 0), 0);
  return sumToDigit(total);
}

const MEANINGS: Record<number, { title: string; strengths: string[]; growth: string[]; practice: string[] }> = {
  1: { title: "Sun — Leadership", strengths: ["Initiative", "Confidence", "Independence"], growth: ["Ego balance", "Patience"], practice: ["Morning sun gaze (safe, brief)", "One clear priority daily", "Offer help without control"] },
  2: { title: "Moon — Harmony", strengths: ["Empathy", "Partnership", "Diplomacy"], growth: ["Boundaries", "Overthinking"], practice: ["Journaling", "Nadi shodhana", "Gentle evening routine"] },
  3: { title: "Jupiter — Wisdom", strengths: ["Creativity", "Learning", "Optimism"], growth: ["Scattered focus"], practice: ["Study time blocks", "Teach what you learn", "Gratitude practice"] },
  4: { title: "Rahu — Structure", strengths: ["Discipline", "Systems", "Reliability"], growth: ["Rigidity"], practice: ["Weekly planning", "Strength training", "Declutter routine"] },
  5: { title: "Mercury — Change", strengths: ["Adaptability", "Communication", "Curiosity"], growth: ["Restlessness"], practice: ["Mindful walks", "Digital boundaries", "Breath-focused meditation"] },
  6: { title: "Venus — Love", strengths: ["Care", "Beauty", "Responsibility"], growth: ["People-pleasing"], practice: ["Creative hobby", "Self-care day", "Speak one honest need daily"] },
  7: { title: "Ketu — Insight", strengths: ["Analysis", "Spiritual depth", "Intuition"], growth: ["Isolation"], practice: ["Silent time", "Mantra japa", "Nature grounding"] },
  8: { title: "Saturn — Mastery", strengths: ["Persistence", "Authority", "Results"], growth: ["Harsh self-judgment"], practice: ["Long-term goals", "Service work", "Slow steady progress"] },
  9: { title: "Mars — Courage", strengths: ["Energy", "Compassion", "Drive"], growth: ["Anger management"], practice: ["Physical movement", "Cooling breath", "Forgiveness practice"] },
  11: { title: "Master 11 — Intuition", strengths: ["Inspiration", "Vision", "Sensitivity"], growth: ["Nervous tension"], practice: ["Grounding routines", "Limit stimulants", "Creative expression"] },
  22: { title: "Master 22 — Builder", strengths: ["Big vision", "Practical execution", "Impact"], growth: ["Perfectionism"], practice: ["Break into milestones", "Delegate", "Rest + recovery"] },
  33: { title: "Master 33 — Compassionate Teacher", strengths: ["Healing", "Service", "Guidance"], growth: ["Burnout"], practice: ["Boundaries", "Weekly rest day", "Serve sustainably"] },
};

function Meaning({ n }: { n: number | null }) {
  if (!n) return <div className="text-sm text-slate-600">Enter details to see meanings.</div>;
  const m = MEANINGS[n] || MEANINGS[sumToDigit(n)];
  if (!m) return <div className="text-sm text-slate-600">No meaning found.</div>;
  return (
    <div className="space-y-3">
      <div className="text-lg font-semibold">{m.title}</div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-3">
          <div className="text-sm font-semibold">Strengths</div>
          <ul className="mt-2 list-disc pl-4 text-sm text-slate-600">
            {m.strengths.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border bg-white p-3">
          <div className="text-sm font-semibold">Growth</div>
          <ul className="mt-2 list-disc pl-4 text-sm text-slate-600">
            {m.growth.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border bg-white p-3">
          <div className="text-sm font-semibold">7-day practice</div>
          <ul className="mt-2 list-disc pl-4 text-sm text-slate-600">
            {m.practice.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function NumerologyPage() {
  const [dob, setDob] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [lifePath, setLifePath] = React.useState<number | null>(null);
  const [nameNum, setNameNum] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vedic Numerology</h1>
            <p className="mt-2 text-slate-600">Compute Life Path (DOB) and Name number + actionable guidance.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/h/tools">Back to Tools</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Your inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 text-sm font-medium">Date of birth</div>
                <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium">Full name</div>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g., Sita Sharma" />
              </div>
              <Button
                onClick={() => {
                  setLifePath(lifePathFromDate(dob));
                  setNameNum(nameNumber(fullName));
                }}
              >
                Calculate
              </Button>

              <div className="rounded-xl border bg-white p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Life Path</span>
                  <span className="font-semibold">{lifePath ?? "-"}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-slate-600">Name Number</span>
                  <span className="font-semibold">{nameNum ?? "-"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Interpretation</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="life">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="life">Life Path</TabsTrigger>
                  <TabsTrigger value="name">Name</TabsTrigger>
                </TabsList>

                <TabsContent value="life" className="mt-4">
                  <Meaning n={lifePath} />
                </TabsContent>

                <TabsContent value="name" className="mt-4">
                  <Meaning n={nameNum} />
                </TabsContent>
              </Tabs>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <div className="text-sm font-semibold">Need a full Jyotish reading?</div>
                <p className="mt-1 text-sm text-slate-600">
                  Numerology is supportive. For deeper clarity we combine chart + dashas + transits + remedies.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button asChild variant="outline">
                    <Link href="/h/jyotish-consultancy">Consultancy</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/h/appointment">Book</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
