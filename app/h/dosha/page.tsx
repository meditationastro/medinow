"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Dosha = "Vata" | "Pitta" | "Kapha";

type Q = {
  id: string;
  text: string;
  a: { label: string; dosha: Dosha }[];
};

const QUESTIONS: Q[] = [
  {
    id: "body",
    text: "Body frame & build",
    a: [
      { label: "Lean, light, quick movements", dosha: "Vata" },
      { label: "Medium, athletic, warm body", dosha: "Pitta" },
      { label: "Sturdy, broader, steady energy", dosha: "Kapha" },
    ],
  },
  {
    id: "skin",
    text: "Skin & temperature",
    a: [
      { label: "Dry, cool hands/feet often", dosha: "Vata" },
      { label: "Warm, prone to redness/irritation", dosha: "Pitta" },
      { label: "Soft, cool, well-hydrated", dosha: "Kapha" },
    ],
  },
  {
    id: "appetite",
    text: "Appetite pattern",
    a: [
      { label: "Irregular—sometimes hungry, sometimes not", dosha: "Vata" },
      { label: "Strong—gets irritable if meals are late", dosha: "Pitta" },
      { label: "Steady—can skip meals comfortably", dosha: "Kapha" },
    ],
  },
  {
    id: "mind",
    text: "Mind & emotions under stress",
    a: [
      { label: "Worry, overthinking, scattered", dosha: "Vata" },
      { label: "Irritability, perfectionism, intense focus", dosha: "Pitta" },
      { label: "Sluggishness, withdrawal, attachment", dosha: "Kapha" },
    ],
  },
  {
    id: "sleep",
    text: "Sleep",
    a: [
      { label: "Light, interrupted, vivid dreams", dosha: "Vata" },
      { label: "Moderate, wakes up warm", dosha: "Pitta" },
      { label: "Deep, long, heavy to wake", dosha: "Kapha" },
    ],
  },
  {
    id: "weather",
    text: "Weather preference",
    a: [
      { label: "Dislikes cold/wind; loves warmth", dosha: "Vata" },
      { label: "Dislikes heat; prefers cool", dosha: "Pitta" },
      { label: "Dislikes damp/cold; likes dry warmth", dosha: "Kapha" },
    ],
  },
];

function clampPct(n: number) {
  return Math.max(0, Math.min(100, n));
}

function primaryDosha(scores: Record<Dosha, number>): Dosha | "Mixed" {
  const entries = Object.entries(scores) as [Dosha, number][];
  entries.sort((a, b) => b[1] - a[1]);
  const [top, topScore] = entries[0];
  const [, secondScore] = entries[1];
  if (topScore - secondScore <= 1) return "Mixed";
  return top;
}

const RECS: Record<Dosha, { do: string[]; avoid: string[]; routine: string[] }> = {
  Vata: {
    do: [
      "Warm, cooked meals (soups, stews), healthy oils, grounding spices (ginger, cumin)",
      "Consistent routine: same wake/sleep/meals",
      "Gentle yoga + slow breathing (nadi shodhana)",
      "Warm sesame oil self-massage (abhyanga) 3–5x/week",
    ],
    avoid: [
      "Skipping meals, too much caffeine, cold/raw foods",
      "Over-scheduling and late nights",
      "Excessive cardio without recovery",
    ],
    routine: [
      "Wake: warm water + a short gratitude practice",
      "Movement: 10–20 min gentle flow + 5 min breathwork",
      "Evening: warm shower, screen-free 30 min, early bedtime",
    ],
  },
  Pitta: {
    do: [
      "Cooling foods (cucumber, coconut, mint), moderate spices",
      "Take breaks; schedule 'cool-down' time",
      "Moon salutations, calming pranayama (sheetali)",
      "Nature time and hydration",
    ],
    avoid: [
      "Excess heat/spice, alcohol, overheating workouts",
      "Competitive mindset 24/7—balance ambition with rest",
      "Late-night work",
    ],
    routine: [
      "Midday: biggest meal, then a 10-min walk",
      "Afternoon: short pause + deep breathing",
      "Evening: light dinner, cooling tea, early sleep",
    ],
  },
  Kapha: {
    do: [
      "Light, warm meals; bitter/pungent tastes (greens, turmeric, black pepper)",
      "Energizing movement: brisk walking, strength training",
      "Dry brushing + warm shower",
      "Morning routine (avoid oversleeping)",
    ],
    avoid: [
      "Heavy, oily, sugary foods late night",
      "Too much daytime napping",
      "Staying sedentary for long hours",
    ],
    routine: [
      "Wake early + sunlight exposure",
      "Movement: 20–30 min brisk walk",
      "Evening: early dinner + light stretching",
    ],
  },
};

const WHATSAPP_NUMBER = "9779800000000"; // change to your WhatsApp number (with country code, no +)
function whatsappHref(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function DoshaPage() {
  const [answers, setAnswers] = React.useState<Record<string, Dosha | null>>(
    () => Object.fromEntries(QUESTIONS.map((q) => [q.id, null])) as Record<string, Dosha | null>
  );

  const [goals, setGoals] = React.useState({
    sleep: false,
    stress: false,
    digestion: false,
    energy: false,
    focus: false,
  });

  const [notes, setNotes] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const totalAnswered = Object.values(answers).filter(Boolean).length;
  const completion = clampPct(Math.round((totalAnswered / QUESTIONS.length) * 100));

  const scores = React.useMemo(() => {
    const s: Record<Dosha, number> = { Vata: 0, Pitta: 0, Kapha: 0 };
    for (const v of Object.values(answers)) if (v) s[v] += 1;
    return s;
  }, [answers]);

  const result = primaryDosha(scores);

  const pct = React.useMemo(() => {
    const total = Math.max(1, QUESTIONS.length);
    return {
      Vata: clampPct(Math.round((scores.Vata / total) * 100)),
      Pitta: clampPct(Math.round((scores.Pitta / total) * 100)),
      Kapha: clampPct(Math.round((scores.Kapha / total) * 100)),
    };
  }, [scores]);

  const canSubmit = completion === 100;

  const summary = React.useMemo(() => {
    const g = Object.entries(goals).filter(([, v]) => v).map(([k]) => k);
    return `Dosha test result: ${result}. Scores — Vata ${scores.Vata}, Pitta ${scores.Pitta}, Kapha ${scores.Kapha}. Goals: ${g.length ? g.join(", ") : "not selected"}. Notes: ${notes || "-"} Name: ${name || "-"} Email: ${email || "-"}`;
  }, [goals, result, scores, notes, name, email]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ayurveda Dosha Test (Prakriti + Vikriti)</h1>
            <p className="mt-2 text-slate-600">
              Answer a few questions to get a practical, beginner-friendly Dosha profile and a personalized routine.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/h/appointment">Book a Session</Link>
            </Button>
            <Button asChild>
              <a href={whatsappHref("Hi! I want help understanding my Dosha test result and a personalized plan.")} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Quiz</span>
                <Badge variant={canSubmit ? "default" : "secondary"}>{completion}% complete</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Progress value={completion} />

              <div className="space-y-5">
                {QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="rounded-xl border bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-medium">
                        {idx + 1}. {q.text}
                      </div>
                      {answers[q.id] ? <Badge>{answers[q.id]}</Badge> : <Badge variant="secondary">Choose</Badge>}
                    </div>

                    <div className="mt-3 grid gap-2 md:grid-cols-3">
                      {q.a.map((opt) => {
                        const active = answers[q.id] === opt.dosha;
                        return (
                          <button
                            key={opt.label}
                            onClick={() => setAnswers((p) => ({ ...p, [q.id]: opt.dosha }))}
                            className={[
                              "rounded-xl border px-3 py-3 text-left text-sm transition",
                              active ? "border-slate-900 bg-slate-900 text-white" : "bg-white hover:bg-slate-50",
                            ].join(" ")}
                            type="button"
                          >
                            <div className="text-xs opacity-80">{opt.dosha}</div>
                            <div className="mt-1">{opt.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border bg-slate-50 p-4">
                <div className="text-sm font-semibold">Your goals (optional)</div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {[
                    ["sleep", "Better sleep"],
                    ["stress", "Less stress/anxiety"],
                    ["digestion", "Improve digestion"],
                    ["energy", "More energy"],
                    ["focus", "Improve focus"],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={(goals as any)[key]}
                        onCheckedChange={(v) => setGoals((p) => ({ ...p, [key]: Boolean(v) }))}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" />
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" />
                </div>

                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes (optional): current issues, sleep, digestion, mood..."
                  className="mt-3"
                />

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAnswers(Object.fromEntries(QUESTIONS.map((q) => [q.id, null])) as any);
                      setGoals({ sleep: false, stress: false, digestion: false, energy: false, focus: false });
                      setNotes("");
                      setName("");
                      setEmail("");
                    }}
                  >
                    Reset
                  </Button>

                  <Button
                    disabled={!canSubmit}
                    onClick={() => {
                      // copy summary to clipboard so user can paste into WhatsApp / email
                      navigator.clipboard?.writeText(summary).catch(() => {});
                    }}
                  >
                    Copy result summary
                  </Button>

                  <Button asChild disabled={!canSubmit}>
                    <a href={whatsappHref(summary)} target="_blank" rel="noreferrer">
                      Share on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="text-sm text-slate-600">
                  This is a helpful starting point. For a deeper assessment, we combine your lifestyle + symptoms (vikriti)
                  with your birth chart + season (ritu).
                </div>

                <div className="space-y-3">
                  {(["Vata", "Pitta", "Kapha"] as Dosha[]).map((d) => (
                    <div key={d}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium">{d}</span>
                        <span className="text-slate-600">{pct[d]}%</span>
                      </div>
                      <Progress value={pct[d]} />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">Primary profile</div>
                  <Badge className="text-sm">{result}</Badge>
                </div>

                {!canSubmit && (
                  <div className="rounded-xl border bg-white p-3 text-sm text-slate-600">
                    Answer all questions to unlock the full recommendations.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Personalized plan</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="do">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="do">Do</TabsTrigger>
                    <TabsTrigger value="avoid">Avoid</TabsTrigger>
                    <TabsTrigger value="routine">Routine</TabsTrigger>
                  </TabsList>

                  <TabsContent value="do" className="mt-4 space-y-2">
                    {(result === "Mixed" ? ["Vata", "Pitta", "Kapha"] : [result]).flatMap((d) =>
                      RECS[d as Dosha].do.map((t, i) => (
                        <div key={`${d}-do-${i}`} className="rounded-xl border bg-white p-3 text-sm">
                          <span className="mr-2 font-semibold">{d}:</span>
                          {t}
                        </div>
                      ))
                    )}
                  </TabsContent>

                  <TabsContent value="avoid" className="mt-4 space-y-2">
                    {(result === "Mixed" ? ["Vata", "Pitta", "Kapha"] : [result]).flatMap((d) =>
                      RECS[d as Dosha].avoid.map((t, i) => (
                        <div key={`${d}-av-${i}`} className="rounded-xl border bg-white p-3 text-sm">
                          <span className="mr-2 font-semibold">{d}:</span>
                          {t}
                        </div>
                      ))
                    )}
                  </TabsContent>

                  <TabsContent value="routine" className="mt-4 space-y-2">
                    {(result === "Mixed" ? ["Vata", "Pitta", "Kapha"] : [result]).flatMap((d) =>
                      RECS[d as Dosha].routine.map((t, i) => (
                        <div key={`${d}-rt-${i}`} className="rounded-xl border bg-white p-3 text-sm">
                          <span className="mr-2 font-semibold">{d}:</span>
                          {t}
                        </div>
                      ))
                    )}
                  </TabsContent>
                </Tabs>

                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-semibold">Want a detailed plan?</div>
                  <p className="mt-1 text-sm text-slate-600">
                    We’ll connect your Dosha + lifestyle + sleep + digestion with your Vedic chart for a practical weekly routine.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button asChild variant="outline">
                      <Link href="/h/vedic-remedies">Vedic Remedies</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/h/appointment">Book Now</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Try Vedic tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link className="block rounded-xl border bg-white p-3 text-sm hover:bg-slate-50" href="/h/tools">
                  Open Vedic Astrology Tools →
                </Link>
                <div className="text-xs text-slate-500">
                  Disclaimer: Tools provide guidance and education; they do not replace medical advice.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
