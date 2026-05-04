import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { inventory, orders, finance } from '@/lib/db/schema'
import { sql } from 'drizzle-orm'

export async function GET() {
  try {
    const [invStats] = await db.select({
      totalItems: sql`count(*)`,
      totalUnits: sql`sum(${inventory.quantity})`,
      available: sql`sum(${inventory.available})`,
      onEvent: sql`sum(${inventory.onEvent})`,
      damaged: sql`sum(${inventory.damaged})`,
    }).from(inventory)

    const [orderStats] = await db.select({
      ongoing: sql`count(case when ${orders.status} = 'ONGOING' then 1 end)`,
      upcoming: sql`count(case when ${orders.status} = 'UPCOMING' then 1 end)`,
    }).from(orders)

    const financeRecords = await db.select().from(finance)
    const income = financeRecords.filter(f => f.type === 'Payment Received').reduce((s, f) => s + (f.amount || 0), 0)
    const expenses = financeRecords.filter(f => ['Expense', 'Salary'].includes(f.type)).reduce((s, f) => s + (f.amount || 0), 0)

    const recentOrders = await db.select().from(orders).orderBy(sql`${orders.createdAt} desc`).limit(6)

    return NextResponse.json({
      inventory: invStats,
      orders: { ...orderStats, recent: recentOrders },
      finance: { income, expenses, profit: income - expenses }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
