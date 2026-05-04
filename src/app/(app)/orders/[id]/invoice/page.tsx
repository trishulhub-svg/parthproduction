"use client"
import { useState, useEffect } from 'react'
import { fmtCurrency, fmtDate } from '@/lib/utils'
import { Printer, ArrowLeft, Film, Globe, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function InvoicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${params.id}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setOrder(data)
      } catch (err) {
        router.push('/orders')
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrder()
  }, [params.id, router])

  if (isLoading) return <div className="p-20 text-center font-bold uppercase tracking-widest text-zinc-500 animate-pulse">Generating Document...</div>

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-zinc-100 py-12 px-6 print:p-0 print:bg-white">
      {/* Controls - Hidden on print */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center no-print">
        <Link href={`/orders/${params.id}`}>
          <Button variant="secondary" className="bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Order
          </Button>
        </Link>
        <Button onClick={handlePrint} className="bg-navy-900 text-white shadow-xl hover:bg-black px-8">
          <Printer className="w-5 h-5 mr-2" /> Print Document
        </Button>
      </div>

      {/* Invoice Content */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl p-16 print:shadow-none print:p-0">
        {/* Header */}
        <div className="flex justify-between items-start border-b-4 border-navy-950 pb-12 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-navy-950 flex items-center justify-center text-white">
              <Film className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter text-navy-950 leading-none">PARTH</h1>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Production House</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-5xl font-black text-navy-950 uppercase tracking-tighter mb-2">Invoice</h2>
            <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">No. #INV-{String(order.id).padStart(5, '0')}</div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-20 mb-16">
          <div>
            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-100 pb-2">Client Details</div>
            <h3 className="text-2xl font-black text-navy-950 uppercase tracking-tight mb-2">{order.client}</h3>
            <div className="space-y-1 text-sm font-bold text-zinc-600">
              <p className="flex items-center gap-2"><MapPin className="w-3 h-3 text-zinc-300" /> {order.location || 'Site Location'}</p>
              <p className="flex items-center gap-2"><Globe className="w-3 h-3 text-zinc-300" /> Event: {order.eventName}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-100 pb-2">Issue Date</div>
            <div className="text-xl font-black text-navy-950 tracking-tighter mb-6">{fmtDate(new Date().toISOString())}</div>
            
            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-100 pb-2">Event Schedule</div>
            <div className="text-sm font-bold text-navy-950 uppercase tracking-widest">
              {fmtDate(order.eventDate)} — {fmtDate(order.eventEndDate)}
            </div>
          </div>
        </div>

        {/* Table */}
        <table className="w-full mb-16">
          <thead>
            <tr className="bg-navy-950 text-white">
              <th className="text-left py-4 px-6 text-[10px] font-black uppercase tracking-widest">Description of Services</th>
              <th className="text-right py-4 px-6 text-[10px] font-black uppercase tracking-widest">Amount (INR)</th>
            </tr>
          </thead>
          <tbody className="border-b-2 border-navy-950">
            <tr>
              <td className="py-10 px-6 align-top">
                <h4 className="text-lg font-black text-navy-950 uppercase tracking-tight mb-2">Production & Equipment Package</h4>
                <p className="text-sm font-medium text-zinc-500 leading-relaxed max-w-md">
                  Professional production services including audio-visual setup, cinematic lighting, 
                  and technical onsite crew for the "{order.eventName}" event.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-zinc-100 rounded-lg text-[9px] font-black text-zinc-500 uppercase tracking-widest">Pro Audio</span>
                   <span className="px-3 py-1 bg-zinc-100 rounded-lg text-[9px] font-black text-zinc-500 uppercase tracking-widest">Stage Lighting</span>
                   <span className="px-3 py-1 bg-zinc-100 rounded-lg text-[9px] font-black text-zinc-500 uppercase tracking-widest">Technical Crew</span>
                </div>
              </td>
              <td className="py-10 px-6 text-right align-top text-2xl font-black text-navy-950 tracking-tighter">
                {fmtCurrency(order.budget)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-20">
          <div className="w-80 space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-zinc-500 uppercase tracking-widest">
              <span>Subtotal</span>
              <span>{fmtCurrency(order.budget)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-zinc-500 uppercase tracking-widest">
              <span>Tax (GST 0%)</span>
              <span>₹0</span>
            </div>
            <div className="h-[1px] bg-zinc-200 w-full" />
            <div className="flex justify-between items-center text-3xl font-black text-navy-950 tracking-tighter">
              <span className="text-sm font-black uppercase tracking-widest text-zinc-400">Total</span>
              <span>{fmtCurrency(order.budget)}</span>
            </div>
            <div className="pt-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-500 uppercase tracking-widest">
                <span>Advance Paid</span>
                <span className="text-navy-950">- {fmtCurrency(0)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-navy-50 rounded-2xl border border-navy-100">
                <span className="text-xs font-black text-navy-950 uppercase tracking-widest">Amount Due</span>
                <span className="text-xl font-black text-navy-950 tracking-tighter">{fmtCurrency(order.budget)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-2 gap-10 border-t border-zinc-100 pt-12">
          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Terms & Conditions</h5>
            <p className="text-[10px] font-medium text-zinc-400 leading-loose">
              1. Advance payment is non-refundable.<br/>
              2. Full payment must be settled on the day of the event.<br/>
              3. Any damage to equipment will be charged as per actual repair costs.<br/>
              4. Management is not responsible for any delay due to unforeseen circumstances.
            </p>
          </div>
          <div className="text-right space-y-8">
            <div className="space-y-2">
              <div className="text-sm font-black text-navy-950 uppercase tracking-tight">Authorized Signature</div>
              <div className="h-16 w-48 ml-auto border-b-2 border-zinc-100 flex items-end justify-center pb-2">
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Stamp Here</p>
              </div>
            </div>
            <div className="space-y-2 text-xs font-bold text-zinc-400">
              <p className="flex items-center justify-end gap-2"><Phone className="w-3 h-3" /> +91 98765 43210</p>
              <p className="flex items-center justify-end gap-2"><Mail className="w-3 h-3" /> hello@parthproduction.in</p>
              <p className="flex items-center justify-end gap-2"><Globe className="w-3 h-3" /> www.parthproduction.in</p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
           <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.5em]">Thank you for choosing Parth Production</p>
        </div>
      </div>
    </div>
  )
}
