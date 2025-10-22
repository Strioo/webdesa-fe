// ============================================
// API ROUTE: Create Midtrans Payment
// POST /api/payments/create
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { createMidtransTransaction, generateOrderId } from '@/lib/midtrans'
import { PaymentRequest, PaymentResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: PaymentRequest = await request.json()

    // Validate required fields
    if (
      !body.destinationId ||
      !body.destinationName ||
      !body.quantity ||
      !body.price ||
      !body.customerName ||
      !body.customerEmail ||
      !body.customerPhone
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        } as PaymentResponse,
        { status: 400 }
      )
    }

    // Validate quantity and price
    if (body.quantity < 1 || body.price < 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid quantity or price',
        } as PaymentResponse,
        { status: 400 }
      )
    }

    // Generate order ID
    const orderId = generateOrderId()

    // Calculate gross amount
    const grossAmount = body.price * body.quantity

    // Split customer name
    const nameParts = body.customerName.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || firstName

    // Create Midtrans transaction
    const transaction = {
      order_id: orderId,
      gross_amount: grossAmount,
      customer_details: {
        first_name: firstName,
        last_name: lastName,
        email: body.customerEmail,
        phone: body.customerPhone,
      },
      item_details: [
        {
          id: body.destinationId,
          price: body.price,
          quantity: body.quantity,
          name: body.destinationName,
        },
      ],
    }

    // Call Midtrans API
    const snapResponse = await createMidtransTransaction(transaction)

    // Return success response
    return NextResponse.json(
      {
        success: true,
        token: snapResponse.token,
        redirectUrl: snapResponse.redirect_url,
      } as PaymentResponse,
      { status: 200 }
    )
  } catch (error) {
    console.error('Payment creation error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      } as PaymentResponse,
      { status: 500 }
    )
  }
}
