// WhatsApp phone number from environment variable
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

if (!WHATSAPP_NUMBER) {
  console.warn('WhatsApp number not configured. Please set NEXT_PUBLIC_WHATSAPP_NUMBER in your environment variables.')
}

/**
 * Redirects to WhatsApp chat with a pre-filled message
 * @param message - The message to pre-fill in WhatsApp
 */
export const redirectToWhatsApp = (message: string = "") => {
  if (!WHATSAPP_NUMBER) {
    console.error('WhatsApp number not configured')
    return
  }

  // Remove any special characters from the number
  const cleanNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '')
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message)
  
  // Construct WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, "_blank")
} 