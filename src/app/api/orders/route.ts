import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders, orderInventory, orderEmployees } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt))
  return NextResponse.json(allOrders)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { client, eventName, eventDate, eventEndDate, location, budget, status, teamId, notes, allocations } = body

  if (!client || !eventName) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const [order] = await db.insert(orders).values({
    client,
    eventName,
    eventDate,
    eventEndDate,
    location,
    budget: parseFloat(budget) || 0,
    status: status || 'UPCOMING',
    teamId: teamId ? parseInt(teamId) : null,
    notes,
  }).returning()

  // Handle equipment allocations if provided
  if (allocations && Array.isArray(allocations)) {
    for (const alloc of allocations) {
      await db.insert(orderInventory).values({
        orderId: order.id,
        inventoryId: parseInt(alloc.itemId),
        quantity: parseInt(alloc.qty),
      })
    }
  }

  return NextResponse.json(order, { status: 201 })
}
