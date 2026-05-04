"use client"
import { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Calendar, 
  MapPin, 
  User, 
  IndianRupee, 
  ArrowLeft, 
  Printer, 
  Save, 
  Plus, 
  Trash2,
  Package,
  Clock,
  CheckCircle2,
  LayoutGrid,
  Users2,
  CreditCard
} from 'lucide-react'
import { cn, fmtCurrency, fmtDate, STATUS_COLORS } from '@/lib/utils'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${params.id}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setOrder(data)
      } catch (err) {
        toast.error('Order not found')
        router.push('/orders')
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrder()
  }, [params.id, router])

  if (isLoading) return <div className="text-center py-40 animate-pulse text-zinc-600 font-bold uppercase tracking-widest text-xs">Accessing System Registry...</div>

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'inventory', label: 'Equipment', icon: Package },
    { id: 'workforce', label: 'Workforce', icon: Users2 },
    { id: 'finance', label: 'Finance', icon: CreditCard },
  ]

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex items-start gap-6">
          <Link href="/orders">
            <Button variant="secondary" size="icon" className="rounded-2xl w-12 h-12">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-black text-neon-teal uppercase tracking-[0.3em]">Event Management</span>
              <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border", STATUS_COLORS[order.status])}>
                {order.status}
              </span>
            </div>
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{order.eventName}</h3>
            <p className="text-lg text-zinc-400 font-medium mt-1">{order.client}</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Printer className="w-5 h-5 mr-2" />
            Print Invoice
          </Button>
          <Button className="flex-1 md:flex-none shadow-neon-green">
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-navy-900 border border-white/5 rounded-2xl w-fit overflow-hidden">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === tab.id 
                ? "bg-white/10 text-white shadow-lg" 
                : "text-zinc-600 hover:text-zinc-400"
            )}
          >
            <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-neon-teal" : "text-zinc-700")} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'overview' && (
            <Card>
              <CardBody className="p-10 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-neon-teal" /> Event Schedule
                      </label>
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-sm font-bold text-white mb-1">Start: {fmtDate(order.eventDate)}</div>
                        <div className="text-sm font-bold text-zinc-400">End: {fmtDate(order.eventEndDate)}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-neon-teal" /> Location
                      </label>
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-sm font-bold text-white">{order.location || 'Not Specified'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-2 text-right">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mr-1 flex items-center justify-end gap-2">
                        <IndianRupee className="w-3 h-3 text-neon-teal" /> Financial Summary
                      </label>
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-neon-teal/10 to-transparent border border-neon-teal/20">
                        <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total Budget</div>
                        <div className="text-4xl font-black text-white tracking-tighter mb-4">{fmtCurrency(order.budget)}</div>
                        <div className="h-[1px] bg-white/5 w-full mb-4" />
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-zinc-500 uppercase">Paid: {fmtCurrency(0)}</span>
                          <span className="font-black text-neon-green uppercase">Due: {fmtCurrency(order.budget)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Order Notes</label>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/5 min-h-[150px] text-zinc-400 leading-relaxed font-medium">
                    {order.notes || 'No internal notes provided for this event.'}
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {activeTab === 'inventory' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="uppercase tracking-widest text-sm flex items-center gap-3">
                  <Package className="w-5 h-5 text-neon-teal" /> Allocated Equipment
                </CardTitle>
                <Button variant="secondary" size="sm">
                  <Plus className="w-4 h-4 mr-2" /> Add Item
                </Button>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Equipment</th>
                      <th>Quantity</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3} className="text-center py-20 text-zinc-600 font-bold uppercase tracking-widest text-[10px]">
                        No equipment allocated yet
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Status & Activity */}
        <div className="space-y-8">
          <Card className="stat-top-teal">
            <CardBody className="p-8">
              <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">Workflow Status</h4>
              <div className="space-y-6">
                {[
                  { label: 'Booking Confirmed', done: true, time: '2 days ago' },
                  { label: 'Inventory Allocated', done: false, time: 'Pending' },
                  { label: 'Team Assigned', done: false, time: 'Pending' },
                  { label: 'Advance Received', done: false, time: 'Pending' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={cn(
                      "w-6 h-6 rounded-full shrink-0 flex items-center justify-center",
                      step.done ? "bg-neon-green/20 text-neon-green" : "bg-white/5 text-zinc-700"
                    )}>
                      {step.done ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className={cn("text-sm font-bold uppercase tracking-tight", step.done ? "text-white" : "text-zinc-600")}>{step.label}</div>
                      <div className="text-[10px] font-bold text-zinc-700 uppercase">{step.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="glass border-white/5">
            <CardBody className="p-8">
              <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Quick Links</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="ghost" className="justify-start text-xs font-bold uppercase tracking-widest">
                  <Printer className="w-4 h-4 mr-3" /> Get Quote (PDF)
                </Button>
                <Button variant="ghost" className="justify-start text-xs font-bold uppercase tracking-widest">
                  <Package className="w-4 h-4 mr-3" /> Packing List
                </Button>
                <Button variant="ghost" className="justify-start text-xs font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4 mr-3" /> Cancel Order
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
