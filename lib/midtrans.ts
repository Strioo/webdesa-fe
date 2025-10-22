// ============================================
// MIDTRANS SERVER HELPER
// ============================================

import { MidtransTransaction, MidtransSnapResponse } from './types'

// Midtrans configuration
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || ''
const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''
const MIDTRANS_IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true'

const MIDTRANS_API_URL = MIDTRANS_IS_PRODUCTION
  ? 'https://app.midtrans.com/snap/v1/transactions'
  : 'https://app.sandbox.midtrans.com/snap/v1/transactions'

/**
 * Create Midtrans Snap transaction
 * @param transaction Transaction details
 * @returns Snap token and redirect URL
 */
export async function createMidtransTransaction(
  transaction: MidtransTransaction
): Promise<MidtransSnapResponse> {
  if (!MIDTRANS_SERVER_KEY) {
    throw new Error('MIDTRANS_SERVER_KEY is not configured')
  }

  // Base64 encode server key
  const authString = Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64')

  try {
    const response = await fetch(MIDTRANS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(transaction),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Midtrans API error: ${errorData.error_messages?.join(', ') || response.statusText}`
      )
    }

    const data = await response.json()

    return {
      token: data.token,
      redirect_url: data.redirect_url,
    }
  } catch (error) {
    console.error('Midtrans transaction creation failed:', error)
    throw error
  }
}

/**
 * Generate unique order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')
  return `ORDER-${timestamp}-${random}`
}

/**
 * Get Midtrans client key for frontend
 */
export function getMidtransClientKey(): string {
  return MIDTRANS_CLIENT_KEY
}

/**
 * Verify Midtrans server key is configured
 */
export function isMidtransConfigured(): boolean {
  return Boolean(MIDTRANS_SERVER_KEY && MIDTRANS_CLIENT_KEY)
}

/**
 * Get Midtrans Snap script URL
 */
export function getMidtransSnapUrl(): string {
  return MIDTRANS_IS_PRODUCTION
    ? 'https://app.midtrans.com/snap/snap.js'
    : 'https://app.sandbox.midtrans.com/snap/snap.js'
}
