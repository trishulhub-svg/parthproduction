import { sql } from 'drizzle-orm'
import {
  integer,
  real,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core'

// ─── Users ───────────────────────────────────────────────
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').default('admin'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
})

// ─── Categories ──────────────────────────────────────────
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  icon: text('icon').default('Package'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
})

// ─── Inventory ───────────────────────────────────────────
export const inventory = sqliteTable('inventory', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  barcode: text('barcode').unique(),
  quantity: integer('quantity').default(0),
  available: integer('available').default(0),
  onEvent: integer('on_event').default(0),
  damaged: integer('damaged').default(0),
  status: text('status').default('AVAILABLE'),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
})

// ─── Teams ───────────────────────────────────────────────
export const teams = sqliteTable('teams', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  leaderId: integer('leader_id'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
})

// ─── Employees ───────────────────────────────────────────
export const employees = sqliteTable('employees', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  role: text('role'),
  salary: real('salary').default(0),
  joinDate: text('join_date'),
  status: text('status').default('ACTIVE'),
  address: text('address'),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
})

// ─── Team Members ─────────────────────────────────────────
export const teamMembers = sqliteTable('team_members', {
  teamId: integer('team_id').references(() => teams.id),
  employeeId: integer('employee_id').references(() => employees.id),
})

// ─── Orders ──────────────────────────────────────────────
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  client: text('client').notNull(),
  eventName: text('event_name').notNull(),
  eventDate: text('event_date'),
  eventEndDate: text('event_end_date'),
  setupDate: text('setup_date'),
  location: text('location'),
  budget: real('budget').default(0),
  status: text('status').default('UPCOMING'),
  teamId: integer('team_id').references(() => teams.id),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
})

// ─── Order Inventory (Allocations) ───────────────────────
export const orderInventory = sqliteTable('order_inventory', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id').references(() => orders.id),
  inventoryId: integer('inventory_id').references(() => inventory.id),
  quantity: integer('quantity').default(1),
})

// ─── Order Employees ──────────────────────────────────────
export const orderEmployees = sqliteTable('order_employees', {
  orderId: integer('order_id').references(() => orders.id),
  employeeId: integer('employee_id').references(() => employees.id),
})

// ─── Finance ─────────────────────────────────────────────
export const finance = sqliteTable('finance', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type').notNull(), // Payment Received | Advance | Expense | Salary | Other
  amount: real('amount').notNull(),
  date: text('date').notNull(),
  paymentMode: text('payment_mode').default('Cash'),
  orderId: integer('order_id').references(() => orders.id),
  description: text('description'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
})

// ─── Type exports ──────────────────────────────────────────
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
export type Inventory = typeof inventory.$inferSelect
export type NewInventory = typeof inventory.$inferInsert
export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
export type Employee = typeof employees.$inferSelect
export type NewEmployee = typeof employees.$inferInsert
export type Team = typeof teams.$inferSelect
export type NewTeam = typeof teams.$inferInsert
export type Finance = typeof finance.$inferSelect
export type NewFinance = typeof finance.$inferInsert
