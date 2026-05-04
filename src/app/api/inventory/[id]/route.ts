import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { inventory } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const body = await req.json()
  const { name, categoryId, quantity, status, notes } = body

  const [existing] = await db.select().from(inventory).where(eq(inventory.id, id))
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const qty = quantity != null ? parseInt(quantity) : existing.quantity
  const s = status || existing.status

  const [item] = await db
    .update(inventory)
    .set({
      name: name || existing.name,
      categoryId: categoryId ? parseInt(categoryId) : existing.categoryId,
      quantity: qty,
      status: s,
      notes: notes !== undefined ? notes : existing.notes,
      available: s === 'AVAILABLE' ? qty : existing.available,
      damaged: s === 'DAMAGED' ? qty : existing.damaged,
    })
    .where(eq(inventory.id, id))
    .returning()

  return NextResponse.json(item)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  await db.delete(inventory).where(eq(inventory.id, id))
  return NextResponse.json({ success: true })
}
