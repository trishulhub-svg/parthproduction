"use client"
import { useEffect, useState } from 'react'
import { Card, CardBody } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { 
  Boxes, 
  CheckCircle2, 
  Truck, 
  AlertTriangle, 
  CalendarClock, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  PlusCircle,
  ArrowRight,
  Zap,
  Star
} from 'lucide-react'
import { fmtCurrency, fmtDate, STATUS_COLORS, cn } from '../../../lib/utils'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/dashboard/stats')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <div className="w-16 h-16 border-4 border-neon-teal border-t-transparent rounded-full animate-spin" />
      <div className="text-sm font-black text-zinc-500 uppercase tracking-[0.4em] animate-pulse">Initializing Neural Interface...</div>
    </div>
  )

  const statCards = [
    { label: 'Total Units', val: stats?.inventory?.totalUnits || 0, sub: `${stats?.inventory?.totalItems || 0} categories`, icon: Boxes, color: 'neon-green' },
    { label: 'Available', val: stats?.inventory?.available || 0, sub: 'Ready to ship', icon: CheckCircle2, color: 'neon-teal' },
    { label: 'On Events', val: stats?.inventory?.onEvent || 0, sub: 'Active field use', icon: Truck, color: 'neon-purple' },
    { label: 'Damaged', val: stats?.inventory?.damaged || 0, sub: 'Maintenance required', icon: AlertTriangle, color: 'red-400' },
  ]

  return (
    <div className="space-y-12 pb-20">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 rounded-lg bg-neon-green/10 text-neon-green"><Star className="w-4 h-4" /></span>
            <span className="text-[10px] font-black text-neon-green uppercase tracking-[0.4em]">Operations Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">Command <br/> Dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/orders">
            <Button size="lg" className="shadow-neon-green h-14 px-8 group">
              <PlusCircle className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform" />
              New Event Order
            </Button>
          </Link>
          <Button variant="secondary" size="lg" className="h-14 px-8">
            <Zap className="w-5 h-5 mr-3 text-neon-teal" />
            Quick Report
          </Button>
        </div>
      </motion.div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="relative overflow-hidden group border-white/5 hover:border-white/20 transition-all">
              <CardBody className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className={cn("p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform", `text-${stat.color}`)}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
                <div className="text-5xl font-black text-white tracking-tighter">{stat.val}</div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase mt-2 tracking-widest flex items-center gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full", `bg-${stat.color}`)} />
                  {stat.sub}
                </div>
              </CardBody>
              <div className={cn("absolute bottom-0 left-0 h-1 transition-all duration-500 w-12 group-hover:w-full", `bg-${stat.color}`)} />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Secondary Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end px-2">
            <h4 className="text-xs font-black text-zinc-600 uppercase tracking-[0.4em]">Live Event Registry</h4>
            <Link href="/orders" className="text-[10px] font-black text-neon-teal uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
              Explore Full Pipeline <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Card className="overflow-hidden border-white/5">
            <div className="overflow-x-auto no-scrollbar">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Event Blueprint</th>
                    <th>Timeline</th>
                    <th>Valuation</th>
                    <th>Operational Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(stats?.orders?.recent || []).length > 0 ? (
                    stats.orders.recent.map((order: any) => (
                      <tr key={order.id}>
                        <td>
                          <div className="font-black text-white uppercase tracking-tight text-lg">{order.eventName}</div>
                          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{order.client}</div>
                        </td>
                        <td className="text-zinc-400 font-bold text-xs uppercase">{fmtDate(order.eventDate)}</td>
                        <td className="font-black text-white text-lg tracking-tighter">{fmtCurrency(order.budget)}</td>
                        <td>
                          <span className={cn(
                            "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                            STATUS_COLORS[order.status]
                          )}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-24">
                        <div className="text-zinc-800 font-black text-3xl uppercase tracking-tighter opacity-30">No Active Missions</div>
                        <p className="text-xs font-bold text-zinc-700 uppercase tracking-widest mt-2">Initialize a new order to begin tracking</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Financial Intel */}
        <div className="space-y-8">
          <h4 className="text-xs font-black text-zinc-600 uppercase tracking-[0.4em] px-2 text-right">Financial Intel</h4>
          {[
            { label: 'Revenue Stream', val: stats?.finance?.income, icon: TrendingUp, color: 'neon-green' },
            { label: 'Operational Burn', val: stats?.finance?.expenses, icon: TrendingDown, color: 'red-400' },
            { label: 'Net Efficiency', val: stats?.finance?.profit, icon: Wallet, color: 'neon-teal' },
          ].map((fin, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i * 0.1) }}>
              <Card className="group border-white/5 hover:bg-white/5 transition-all cursor-pointer">
                <CardBody className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={cn("w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center", `text-${fin.color}`)}>
                        <fin.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">{fin.label}</div>
                        <div className="text-3xl font-black text-white tracking-tighter">{fmtCurrency(fin.val)}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-800 group-hover:text-white transition-colors" />
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}

          <Card className="bg-gradient-to-br from-neon-teal/20 via-transparent to-transparent border-neon-teal/30 p-8 text-center relative overflow-hidden group">
            <div className="relative z-10">
              <div className="text-[10px] font-black text-neon-teal uppercase tracking-[0.4em] mb-4">Network Health</div>
              <div className="text-2xl font-black text-white uppercase tracking-tight mb-6">98.4% Uptime</div>
              <div className="h-2 w-full bg-navy-900 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-neon-teal shadow-neon-teal w-[98.4%] animate-pulse" />
              </div>
              <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Enterprise Systems Synchronized</div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </Card>
        </div>
      </div>
    </div>
  )
}
