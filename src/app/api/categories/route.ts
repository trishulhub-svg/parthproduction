import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { categories } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const allCategories = await db.select().from(categories)
  return NextResponse.json(allCategories)
}

export async function POST(req: NextRequest) {
  const { name, description, icon } = await req.json()
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

  const [category] = await db.insert(categories).values({
    name,
    description,
    icon: icon || 'Package',
  }).returning()

  return NextResponse.json(category, { status: 201 })
}
