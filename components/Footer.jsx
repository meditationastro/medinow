// Footer.jsx (React site – no Next.js required)
// Uses plain React + inline styles (no Tailwind needed)

import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  const styles = {
    footer: {
      background: "#0b1220",
      color: "#e5e7eb",
      padding: "50px 20px",
      fontFamily: "Arial, sans-serif",
      borderTop: "1px solid #1e293b",
    },
    container: { maxWidth: 1200, margin: "0 auto" },

    cta: {
      background: "linear-gradient(135deg,#111c36,#0f172a)",
      border: "1px solid #22304f",
      borderRadius: 20,
      padding: 28,
      marginBottom: 35,
      textAlign: "center",
    },
    ctaTitle: { margin: "0 0 10px", fontSize: 24, color: "#fff" },
    ctaText: { margin: "0 0 18px", color: "#cbd5e1", lineHeight: 1.6 },

    btnRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      justifyContent: "center",
    },
    btn: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "14px 22px",
      borderRadius: 12,
      textDecoration: "none",
      fontWeight: 800,
    },
    btnWhatsApp: { background: "#22c55e", color: "#0b1220" },
    btnEmail: {
      background: "#1f2937",
      color: "#ffffff",
      border: "1px solid #334155",
    },
    btnCall: {
      background: "transparent",
      color: "#ffffff",
      border: "1px solid #475569",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: 20,
    },
    box: {
      background: "#0f172a",
      padding: 20,
      borderRadius: 18,
      border: "1px solid #22304f",
    },
    h4: { margin: "0 0 12px", color: "#ffffff", fontSize: 16 },
    p: { margin: 0, color: "#cbd5e1", lineHeight: 1.7, fontSize: 14 },
    ul: { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.8, fontSize: 14 },
    link: { color: "#93c5fd", textDecoration: "none" },

    bottom: {
      marginTop: 35,
      paddingTop: 18,
      borderTop: "1px solid #1e293b",
      textAlign: "center",
      color: "#94a3b8",
      fontSize: 13,
    },

    // Optional: small sticky WhatsApp button
    stickyWhatsApp: {
      position: "fixed",
      right: 18,
      bottom: 18,
      zIndex: 9999,
      background: "#22c55e",
      color: "#0b1220",
      padding: "12px 16px",
      borderRadius: 999,
      fontWeight: 900,
      textDecoration: "none",
      boxShadow: "0 10px 30px rgba(0,0,0,.35)",
    },
  };

  return (
    <>
      {/* Sticky WhatsApp (optional) */}
      <a
        href="https://wa.me/9779841647283?text=Hello%20I%20want%20to%20join%20a%20Meditation%20Workshop%20or%20Retreat.%20Please%20share%20upcoming%20dates%2C%20location%20and%20fees."
        target="_blank"
        rel="noopener noreferrer"
        style={styles.stickyWhatsApp}
        aria-label="Chat on WhatsApp"
      >
        💬 WhatsApp
      </a>

      <footer style={styles.footer}>
        <div style={styles.container}>
          {/* CTA */}
          <div style={styles.cta}>
            <h2 style={styles.ctaTitle}>Ready to Join a Meditation Workshop or Retreat?</h2>
            <p style={styles.ctaText}>
              Learn effortless meditation, deepen your practice, and reset your nervous system with guided workshops and retreats.
            </p>

            <div style={styles.btnRow}>
              <a
                href="https://wa.me/9779841647283?text
