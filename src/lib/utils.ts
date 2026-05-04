import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fmtCurrency(amount: number | null | undefined): string {
  return '₹' + Number(amount || 0).toLocaleString('en-IN')
}

export function fmtDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export function genBarcode(): string {
  return 'PP' + Date.now() + Math.floor(Math.random() * 1000)
}

export const STATUS_COLORS: Record<string, string> = {
  UPCOMING: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  ONGOING: 'text-neon-teal bg-cyan-400/10 border-cyan-400/20',
  COMPLETED: 'text-neon-green bg-green-400/10 border-green-400/20',
  CANCELLED: 'text-red-400 bg-red-400/10 border-red-400/20',
  AVAILABLE: 'text-neon-green bg-green-400/10 border-green-400/20',
  ON_EVENT: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  DAMAGED: 'text-red-400 bg-red-400/10 border-red-400/20',
  ACTIVE: 'text-neon-green bg-green-400/10 border-green-400/20',
  INACTIVE: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
}

export const FINANCE_TYPES = [
  'Payment Received',
  'Advance',
  'Expense',
  'Salary',
  'Other',
] as const

export const EMPLOYEE_ROLES = [
  'Manager', 'Technician', 'Driver', 'Helper', 'Electrician', 'Sound Engineer', 'Other',
] as const

export const PAYMENT_MODES = ['Cash', 'Bank Transfer', 'UPI', 'Cheque', 'Other'] as const

export const DEFAULT_CATEGORIES = [
  { name: 'CONSOLE & POWER PANELS', description: 'Power distribution and control panels', icon: 'Sliders' },
  { name: 'LIGHTS', description: 'Stage and event lighting equipment', icon: 'Lightbulb' },
  { name: 'SOUND', description: 'Audio equipment and speakers', icon: 'Volume2' },
  { name: 'LED SCREEN', description: 'LED display screens and panels', icon: 'Monitor' },
  { name: 'GENERATOR', description: 'Power generators', icon: 'Zap' },
  { name: 'LIVE SOUND', description: 'Live sound mixing equipment', icon: 'Music' },
  { name: 'SFX', description: 'Special effects equipment', icon: 'Sparkles' },
  { name: 'FIREWORKS', description: 'Pyrotechnics and fireworks', icon: 'Flame' },
  { name: 'TRANSPORT', description: 'Transportation vehicles and logistics', icon: 'Truck' },
  { name: 'EXTRA', description: 'Miscellaneous equipment', icon: 'Package' },
] as const
