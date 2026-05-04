import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { employees } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const allEmployees = await db.select().from(employees)
  return NextResponse.json(allEmployees)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, role, salary, joinDate, status, address, notes } = body

  if (!name || !role) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const [employee] = await db.insert(employees).values({
    name,
    email,
    phone,
    role,
    salary: parseFloat(salary) || 0,
    joinDate,
    status: status || 'ACTIVE',
    address,
    notes,
  }).returning()

  return NextResponse.json(employee, { status: 201 })
}
