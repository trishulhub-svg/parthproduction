import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { inventory, categories } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { genBarcode } from '@/lib/utils'
import { z } from 'zod'

const inventorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  categoryId: z.number().nullable().optional(),
  quantity: z.number().min(0).default(0),
  status: z.enum(['AVAILABLE', 'ON_EVENT', 'DAMAGED']).default('AVAILABLE'),
  notes: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const categoryId = searchParams.get('categoryId')
  const status = searchParams.get('status')

  try {
    const items = await db
      .select({ 
        id: inventory.id,
        name: inventory.name,
        barcode: inventory.barcode,
        quantity: inventory.quantity,
        available: inventory.available,
        onEvent: inventory.onEvent,
        damaged: inventory.damaged,
        status: inventory.status,
        categoryId: inventory.categoryId,
        categoryName: categories.name,
      })
      .from(inventory)
      .leftJoin(categories, eq(inventory.categoryId, categories.id))
      .orderBy(desc(inventory.createdAt))

    let filtered = items
    if (search) {
      const s = search.toLowerCase()
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(s) || 
        (r.barcode || '').toLowerCase().includes(s)
      )
    }
    if (categoryId) filtered = filtered.filter(r => String(r.categoryId) === categoryId)
    if (status) filtered = filtered.filter(r => r.status === status)

    return NextResponse.json(filtered)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = inventorySchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error.format() }, { status: 400 })
    }

    const { name, categoryId, quantity, status, notes } = result.data
    const barcode = genBarcode()

    const [item] = await db.insert(inventory).values({
      name,
      categoryId,
      barcode,
      quantity,
      available: status === 'DAMAGED' ? 0 : quantity,
      onEvent: 0,
      damaged: status === 'DAMAGED' ? quantity : 0,
      status,
      notes,
    }).returning()

    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
