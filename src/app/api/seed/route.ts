import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, categories, inventory } from '@/lib/db/schema'
import bcrypt from 'bcryptjs'
import { DEFAULT_CATEGORIES } from '@/lib/utils'
import { genBarcode } from '@/lib/utils'

export async function POST() {
  try {
    // Seed admin user
    const hashedPassword = await bcrypt.hash('admin', 12)
    await db.insert(users).values({
      name: 'Admin',
      email: 'admin@parthproduction.in',
      password: hashedPassword,
      role: 'admin',
    }).onConflictDoNothing()

    // Seed categories
    for (const cat of DEFAULT_CATEGORIES) {
      await db.insert(categories).values(cat).onConflictDoNothing()
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      credentials: {
        email: 'admin@parthproduction.in',
        password: 'admin',
      },
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Seed failed', details: String(error) }, { status: 500 })
  }
}
