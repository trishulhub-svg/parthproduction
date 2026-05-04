"use client"
import { useState, useEffect } from 'react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  Plus, 
  Download,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard
} from 'lucide-react'
import { cn, fmtCurrency, fmtDate, FINANCE_TYPES } from '@/lib/utils'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function FinancePage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterType, setFilterType] = useState('')

  useEffect(() => {
    fetchFinance()
  }, [])

  async function fetchFinance() {
    try {
      const res = await fetch('/api/finance')
      const data = await res.json()
      setTransactions(data)
    } catch (err) {
      toast.error('Failed to load records')
    } finally {
      setIsLoading(false)
    }
  }

  const income = transactions.filter(t => t.type === 'Payment Received' || t.type === 'Advance').reduce((s, t) => s + (t.amount || 0), 0)
  const expense = transactions.filter(t => t.type === 'Expense' || t.type === 'Salary').reduce((s, t) => s + (t.amount || 0), 0)

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Finance Ledger</h3>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Track Cashflow & Profitability</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="px-6">
            <Download className="w-5 h-5 mr-2" />
            Export
          </Button>
          <Button className="shadow-neon-green px-6">
            <Plus className="w-5 h-5 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Revenue', val: income, icon: TrendingUp, color: 'green', top: 'stat-top-green' },
          { label: 'Total Expenses', val: expense, icon: TrendingDown, color: 'red', top: 'stat-top-red' },
          { label: 'Net Surplus', val: income - expense, icon: IndianRupee, color: 'teal', top: 'stat-top-teal' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className={cn("relative group overflow-hidden", stat.top)}>
              <CardBody className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-4 rounded-2xl bg-white/5 text-neon-${stat.color}`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
                <div className="text-4xl font-black text-white tracking-tighter">{fmtCurrency(stat.val)}</div>
              </CardBody>
              <div className={`absolute bottom-0 left-0 h-1 bg-neon-${stat.color} w-20 transition-all group-hover:w-full`} />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Ledger Table */}
      <Card>
        <div className="p-6 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input type="text" placeholder="Search ledger..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-neon-teal/50 outline-none" />
            </div>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-zinc-400 outline-none focus:border-neon-teal/50"
            >
              <option value="">All Types</option>
              {FINANCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
            {transactions.length} Recorded Entries
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description / Order</th>
                <th>Type</th>
                <th>Method</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-20 animate-pulse text-zinc-600 font-bold uppercase tracking-widest text-[10px]">Accessing Vault Records...</td></tr>
              ) : transactions.length > 0 ? (
                transactions.map((t, i) => {
                  const isExpense = ['Expense', 'Salary'].includes(t.type)
                  return (
                    <tr key={t.id}>
                      <td className="text-zinc-400 font-bold text-xs">{fmtDate(t.date)}</td>
                      <td>
                        <div className="font-bold text-white">{t.description || 'General Transaction'}</div>
                        {t.orderId && <div className="text-[10px] font-black text-neon-teal uppercase tracking-widest mt-1">Linked to Order #{t.orderId}</div>}
                      </td>
                      <td>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                          isExpense ? "text-red-400 border-red-500/20 bg-red-500/5" : "text-neon-green border-neon-green/20 bg-neon-green/5"
                        )}>
                          {t.type}
                        </span>
                      </td>
                      <td className="text-zinc-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                        <CreditCard className="w-3 h-3" /> {t.paymentMode}
                      </td>
                      <td className={cn("text-right font-black text-xl tracking-tighter", isExpense ? "text-red-400" : "text-neon-green")}>
                        {isExpense ? '-' : '+'}{fmtCurrency(t.amount)}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr><td colSpan={5} className="text-center py-20 text-zinc-700 font-black uppercase tracking-widest text-[10px]">No financial movements recorded</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
