import Stripe from "stripe"

// ─────────────────────────────────────────────────────────────
// Stripe Client
// Uses STRIPE_SECRET_KEY from environment variables.
// For TEST mode: use key starting with  sk_test_...
// For LIVE mode: use key starting with  sk_live_...
// Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY accordingly.
// ─────────────────────────────────────────────────────────────

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ""

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-06-20",
})

export const isStripeEnabled = () => Boolean(stripeSecretKey)

export const isStripeTestMode = () => stripeSecretKey.startsWith("sk_test_")

export const getStripePublishableKey = () =>
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
