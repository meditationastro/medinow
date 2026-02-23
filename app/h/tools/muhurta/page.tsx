"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const WHATSAPP_NUMBER = "9779800000000"; // change to your WhatsApp number (no +)
function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function MuhurtaPlannerPage() {
  const [intent, setIntent] = React.useState("");
  const [dateRange, setDateRange] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [constraints, setConstraints] = React.useState("");
  const [checks, setChecks] = React.useState({
    purposeClear: false,
    stakeholders: false,
    backupPlan: false,
    calmMind: false,
    cleanSpace: false,
    avoidRush: false,
  });

  const score = Object.values(checks).filter(Boolean).length;
  const pct = Math.round((score / Object.keys(checks).length) * 100);

  const summary = `Muhurta planner — intent: ${intent || "-"}, date range: ${dateRange || "-"}, location: ${location || "-"}, constraints: ${constraints || "-"}, readiness: ${pct}% (${score}/${Object.keys(checks).length}).`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Muhurta Planner</h1>
            <p className="mt-2 text-slate-600">
              Plan a good time for an important action. This tool creates a decision-ready checklist you can share for consultation.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/h/tools">Back</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 text-sm font-medium">Intent</div>
                <Input value={intent} onChange={(e) => setIntent(e.target.value)} placeholder="e.g., start a business, sign a contract..." />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium">Preferred date range</div>
                <Input value={dateRange} onChange={(e) => setDateRange(e.target.value)} placeholder="e.g., March 1–10, 2026" />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium">Location / City</div>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Kathmandu" />
              </div>
              <div>
                <div className="mb-2 text-sm font-medium">Constraints</div>
                <Textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} placeholder="Travel, family schedule, deadlines..." />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Checklist</span>
                <Badge variant={pct >= 70 ? "default" : "secondary"}>{pct}% ready</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ["purposeClear", "My purpose/goal is crystal clear"],
                ["stakeholders", "All key people are aligned"],
                ["backupPlan", "I have a backup plan"],
                ["calmMind", "I can do this calmly (not rushed)"],
                ["cleanSpace", "I can keep the space clean/sattvic"],
                ["avoidRush", "I can avoid last-minute chaos"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={(checks as any)[key]}
                    onCheckedChange={(v) => setChecks((p) => ({ ...p, [key]: Boolean(v) }))}
                  />
                  <span>{label}</span>
                </label>
              ))}

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard?.writeText(summary).catch(() => {})}
                >
                  Copy summary
                </Button>
                <Button asChild>
                  <a href={whatsappHref(summary)} target="_blank" rel="noreferrer">
                    Share on WhatsApp
                  </a>
                </Button>
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <div className="text-sm font-semibold">Want astrologer confirmation?</div>
                <p className="mt-1 text-sm text-slate-600">
                  In a session we check suitable weekday, tithi, nakshatra, and personal chart compatibility for your intent.
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
