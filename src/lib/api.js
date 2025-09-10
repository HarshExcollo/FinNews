import axios from 'axios'

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL
const isDev = import.meta.env.DEV

export async function triggerSearchWebhook({ ticker, type }) {
  if (!WEBHOOK_URL) {
    throw new Error('VITE_WEBHOOK_URL is not configured')
  }
  const payload = { ticker, type }
  // Debug logs
  console.info('[FinNews] Posting to webhook:', WEBHOOK_URL)
  console.info('[FinNews] Payload:', payload)
  const url = isDev ? '/api/webhook' : WEBHOOK_URL
  const response = await axios.post(url, payload, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
  })
  console.info('[FinNews] Webhook response status:', response.status)
  try {
    console.info('[FinNews] Webhook response data:', response.data)
  } catch {}
  return response.data
}


