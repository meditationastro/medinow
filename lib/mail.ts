import { Resend } from "resend";

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Default inbox for the website owner (fallback if env vars are not configured)
const DEFAULT_OWNER_EMAIL = "meditationastro1@gmail.com";

/**
 * IMPORTANT:
 * Do NOT instantiate Resend at module load time.
 * Next.js may import server files during build to collect route metadata.
 * If RESEND_API_KEY is missing in build env, `new Resend(undefined)` throws and fails the build.
 */
function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function fromEmail(): string {
  return process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export async function sendContactFormEmail(data: ContactFormData) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[MAIL] RESEND_API_KEY missing; skipping contact email");
    return { success: false, skipped: true };
  }

  const { fullName, email, phone, service, message } = data;

  const to = process.env.RESEND_TO_EMAIL || DEFAULT_OWNER_EMAIL;

  return resend.emails.send({
    from: fromEmail(),
    to,
    subject: `New Contact Form: ${service}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><b>Name:</b> ${fullName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || "-"}</p>
      <p><b>Service:</b> ${service}</p>
      <p><b>Message:</b></p>
      <p>${String(message).replace(/\n/g, "<br/>")}</p>
    `,
  });
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone?: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export async function sendBookingEmail(data: BookingFormData) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[MAIL] RESEND_API_KEY missing; skipping booking email");
    return { success: false, skipped: true };
  }

  const to = process.env.RESEND_TO_EMAIL || DEFAULT_OWNER_EMAIL;

  return resend.emails.send({
    from: fromEmail(),
    to,
    subject: `New Booking Request: ${data.service}`,
    html: `
      <h2>New Booking / Appointment Request</h2>
      <p><b>Name:</b> ${data.fullName}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Phone:</b> ${data.phone || "-"}</p>
      <p><b>Service:</b> ${data.service}</p>
      <p><b>Preferred Date:</b> ${data.preferredDate || "-"}</p>
      <p><b>Preferred Time:</b> ${data.preferredTime || "-"}</p>
      <p><b>Message:</b></p>
      <p>${(data.message || "-").toString().replace(/\n/g, "<br/>")}</p>
    `,
  });
}

export type OrderEmailItem = {
  productTitle: string;
  versionTitle?: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type OrderEmailData = {
  orderId: string;
  fullName: string;
  email: string;
  phone?: string | null;
  notes?: string | null;
  currency: string;
  total: number;
  status: string;
  paymentProvider: string;
  paymentStatus: string;
  items: OrderEmailItem[];
};

function renderOrderItemsHtml(items: OrderEmailItem[], currency: string) {
  return `
    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <th align="left" style="border-bottom:1px solid #ddd; padding:8px;">Item</th>
          <th align="right" style="border-bottom:1px solid #ddd; padding:8px;">Qty</th>
          <th align="right" style="border-bottom:1px solid #ddd; padding:8px;">Unit</th>
          <th align="right" style="border-bottom:1px solid #ddd; padding:8px;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (it) => `
          <tr>
            <td style="border-bottom:1px solid #eee; padding:8px;">
              ${it.productTitle}${it.versionTitle ? ` <small>(${it.versionTitle})</small>` : ""}
            </td>
            <td align="right" style="border-bottom:1px solid #eee; padding:8px;">${it.quantity}</td>
            <td align="right" style="border-bottom:1px solid #eee; padding:8px;">${currency} ${it.unitPrice.toFixed(2)}</td>
            <td align="right" style="border-bottom:1px solid #eee; padding:8px;">${currency} ${it.lineTotal.toFixed(2)}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

export async function sendNewOrderEmailToOwner(data: OrderEmailData) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[MAIL] RESEND_API_KEY missing; skipping owner order email");
    return { success: false, skipped: true };
  }

  const to = process.env.RESEND_TO_EMAIL || DEFAULT_OWNER_EMAIL;
  const itemsHtml = renderOrderItemsHtml(data.items, data.currency);
  const trackingLink = `${domain}/h/order-tracking?orderId=${encodeURIComponent(
    data.orderId
  )}&email=${encodeURIComponent(data.email)}`;

  return resend.emails.send({
    from: fromEmail(),
    to,
    subject: `New Order Received: ${data.orderId}`,
    html: `
      <h2>New Order Received</h2>
      <p><b>Order ID:</b> ${data.orderId}</p>
      <p><b>Name:</b> ${data.fullName}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Phone:</b> ${data.phone || "-"}</p>
      <p><b>Status:</b> ${data.status}</p>
      <p><b>Payment:</b> ${data.paymentProvider} / ${data.paymentStatus}</p>
      <p><b>Notes:</b> ${data.notes || "-"}</p>
      <h3>Items</h3>
      ${itemsHtml}
      <p style="margin-top:12px;"><b>Total:</b> ${data.currency} ${data.total.toFixed(2)}</p>
      <p><a href="${trackingLink}">Track this order</a></p>
    `,
  });
}

export async function sendOrderConfirmationEmailToCustomer(data: OrderEmailData) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[MAIL] RESEND_API_KEY missing; skipping customer order email");
    return { success: false, skipped: true };
  }

  const itemsHtml = renderOrderItemsHtml(data.items, data.currency);
  const trackingLink = `${domain}/h/order-tracking?orderId=${encodeURIComponent(
    data.orderId
  )}&email=${encodeURIComponent(data.email)}`;

  return resend.emails.send({
    from: fromEmail(),
    to: data.email,
    subject: `Order Confirmation: ${data.orderId}`,
    html: `
      <h2>Thank you for your order!</h2>
      <p>Hi ${data.fullName},</p>
      <p>We received your order. You can track it anytime here:</p>
      <p><a href="${trackingLink}">Track your order</a></p>
      <h3>Items</h3>
      ${itemsHtml}
      <p style="margin-top:12px;"><b>Total:</b> ${data.currency} ${data.total.toFixed(2)}</p>
    `,
  });
}

// NextAuth email helpers (safe when RESEND_API_KEY missing)
export async function sendTwoFactorTokenEmail(email: string, token: string) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[MAIL] RESEND_API_KEY missing; skipping 2FA email");
    return { success: false, skipped: true };
  }

  return resend.emails.send({
    from: fromEmail(),
    to: email,
    subject: "2FA code",
    html: `<p>Your 2FA code: <b>${token}</b></p>`,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[MAIL] RESEND_API_KEY missing; skipping password reset email");
    return { success: false, skipped: true };
  }

  const resetLink = `${domain}/auth/new-password?token=${token}`;

  return resend.emails.send({
    from: fromEmail(),
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[MAIL] RESEND_API_KEY missing; skipping verification email");
    return { success: false, skipped: true };
  }

  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  return resend.emails.send({
    from: fromEmail(),
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
  });
}
