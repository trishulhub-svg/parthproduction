import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { finance, orders } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function GET() {
  const transactions = await db.select().from(finance).orderBy(desc(finance.date))
  return NextResponse.json(transactions)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { type, amount, date, paymentMode, orderId, description } = body

  if (!type || !amount || !date) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const [transaction] = await db.insert(finance).values({
    type,
    amount: parseFloat(amount),
    date,
    paymentMode,
    orderId: orderId ? parseInt(orderId) : null,
    description,
  }).returning()

  return NextResponse.json(transaction, { status: 201 })
}
