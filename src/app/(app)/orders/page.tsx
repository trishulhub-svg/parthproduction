"use client"
import { useState, useEffect } from 'react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Plus, 
  Search, 
  Calendar, 
  MapPin, 
  User, 
  IndianRupee,
  ChevronRight,
  Filter,
  ArrowUpRight
} from 'lucide-react'
import { cn, fmtCurrency, fmtDate, STATUS_COLORS } from '@/lib/utils'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = ['ALL', 'UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED']

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('ALL')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      toast.error('Failed to load orders')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredOrders = orders.filter(o => {
    const statusMatch = activeTab === 'ALL' || o.status === activeTab
    const searchMatch = o.client.toLowerCase().includes(search.toLowerCase()) || 
                      o.eventName.toLowerCase().includes(search.toLowerCase())
    return statusMatch && searchMatch
  })

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Event Pipeline</h3>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Manage Bookings & Production</p>
        </div>
        <Button className="shadow-neon-green px-6">
          <Plus className="w-5 h-5 mr-2" />
          Create New Order
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex p-1 bg-navy-900 border border-white/5 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeTab === tab 
                  ? "bg-white/10 text-white shadow-lg" 
                  : "text-zinc-600 hover:text-zinc-400"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events or clients..."
            className="w-full bg-navy-900 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-zinc-700 focus:border-neon-teal/50 outline-none transition-all"
          />
        </div>
      </div>

      {/* Orders Grid */}
      {isLoading ? (
        <div className="text-center py-40 animate-pulse text-zinc-600 font-bold uppercase tracking-widest text-xs">Accessing Event Records...</div>
      ) : filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order, i) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/orders/${order.id}`}>
                  <Card className="group hover:border-neon-teal/30 transition-all hover:shadow-neon-teal/10 relative overflow-hidden">
                    <CardBody className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="text-[10px] font-black text-neon-teal uppercase tracking-[0.2em] mb-2">Order #{String(order.id).padStart(5, '0')}</div>
                          <h4 className="text-2xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-neon-teal transition-colors">{order.eventName}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-bold text-zinc-400">{order.client}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-700" />
                            <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border", STATUS_COLORS[order.status])}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-neon-teal group-hover:text-navy-900 transition-all">
                          <ArrowUpRight className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-zinc-500">
                            <Calendar className="w-4 h-4 text-neon-teal" />
                            <span className="text-xs font-bold uppercase tracking-wider">{fmtDate(order.eventDate)}</span>
                          </div>
                          <div className="flex items-center gap-3 text-zinc-500">
                            <MapPin className="w-4 h-4 text-neon-teal" />
                            <span className="text-xs font-bold uppercase tracking-wider truncate max-w-[150px]">{order.location || 'Remote'}</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Total Budget</div>
                          <div className="text-2xl font-black text-white tracking-tighter">{fmtCurrency(order.budget)}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex -space-x-2">
                          {[1,2,3].map(j => (
                            <div key={j} className="w-8 h-8 rounded-full border-2 border-navy-900 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                              <User className="w-4 h-4" />
                            </div>
                          ))}
                          <div className="w-8 h-8 rounded-full border-2 border-navy-900 bg-navy-800 flex items-center justify-center text-[10px] font-bold text-neon-teal">
                            +4
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Team Assigned</span>
                      </div>
                    </CardBody>
                    
                    {/* Progress bar for ongoing */}
                    {order.status === 'ONGOING' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-navy-800">
                        <div className="h-full bg-neon-teal shadow-neon-teal animate-pulse" style={{ width: '65%' }}></div>
                      </div>
                    )}
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-3xl">
          <Calendar className="w-16 h-16 mx-auto mb-6 text-zinc-800" />
          <h4 className="text-lg font-black text-zinc-700 uppercase tracking-widest">Pipeline Empty</h4>
          <p className="text-sm text-zinc-600 font-medium">No {activeTab.toLowerCase()} orders match your search.</p>
        </div>
      )}
    </div>
  )
}
