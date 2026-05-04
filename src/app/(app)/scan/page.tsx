"use client"
import { useState, useEffect } from 'react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  QrCode, 
  Search, 
  Camera, 
  Package, 
  Box, 
  ArrowRight,
  Maximize2,
  RefreshCw,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  History
} from 'lucide-react'
import { cn, STATUS_COLORS } from '@/lib/utils'
import toast from 'react-hot-toast'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScanPage() {
  const [barcode, setBarcode] = useState('')
  const [item, setItem] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let scanner: any = null
    if (isScanning) {
      scanner = new Html5QrcodeScanner("reader", { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }, false)

      scanner.render((decodedText: string) => {
        setBarcode(decodedText)
        handleSearch(decodedText)
        setIsScanning(false)
        scanner.clear()
      }, (error: any) => {
        // quiet error
      })
    }
    return () => { if (scanner) scanner.clear() }
  }, [isScanning])

  async function handleSearch(code?: string) {
    const c = code || barcode
    if (!c) return
    setIsLoading(true)
    setItem(null)
    try {
      const res = await fetch(`/api/inventory?search=${c}`)
      const data = await res.json()
      if (data && data.length > 0) {
        setItem(data[0])
        toast.success('Item Identified')
      } else {
        toast.error('Item not found in registry')
      }
    } catch (err) {
      toast.error('Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      <div className="text-center">
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Inventory Scanner</h3>
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">Real-time Equipment Tracking</p>
      </div>

      {/* Input Bar */}
      <Card className="glass border-white/5">
        <CardBody className="p-6 flex gap-4">
          <div className="relative flex-1">
            <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
            <input 
              type="text" 
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter Barcode ID..." 
              className="w-full bg-navy-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold tracking-widest placeholder:text-zinc-700 outline-none focus:border-neon-teal/50" 
            />
          </div>
          <Button onClick={() => handleSearch()} className="px-8 shadow-neon-teal">
            Search
          </Button>
          <Button variant="secondary" size="icon" className="w-14 h-14" onClick={() => setIsScanning(!isScanning)}>
            <Camera className={cn("w-6 h-6", isScanning ? "text-neon-teal" : "text-zinc-500")} />
          </Button>
        </CardBody>
      </Card>

      {/* Scanner View */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="bg-black border-neon-teal/30">
              <CardBody className="p-0 relative aspect-square md:aspect-video">
                <div id="reader" className="w-full h-full"></div>
                <div className="absolute inset-0 pointer-events-none border-[40px] border-black/40 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-neon-teal/50 rounded-3xl relative">
                    <div className="absolute inset-0 bg-neon-teal/5 animate-pulse" />
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-neon-teal shadow-neon-teal animate-scan" />
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white"
                  onClick={() => setIsScanning(false)}
                >
                  <XCircle className="w-6 h-6" />
                </Button>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result View */}
      <AnimatePresence>
        {isLoading ? (
          <div className="text-center py-20 animate-pulse text-zinc-600 font-bold uppercase tracking-widest text-xs">Querying Global Registry...</div>
        ) : item && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="stat-top-teal overflow-hidden">
              <CardBody className="p-10">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="w-full md:w-48 aspect-square rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center">
                    <Box className="w-20 h-20 text-zinc-700" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black text-neon-teal uppercase tracking-[0.3em]">Identification Successful</span>
                        <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border", STATUS_COLORS[item.item.status])}>
                          {item.item.status}
                        </span>
                      </div>
                      <h4 className="text-4xl font-black text-white uppercase tracking-tighter">{item.item.name}</h4>
                      <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mt-1">{item.category?.name || 'General Equipment'}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Total Units', val: item.item.quantity, icon: Package },
                        { label: 'Available', val: item.item.available, icon: CheckCircle2 },
                        { label: 'On Event', val: item.item.onEvent, icon: RefreshCw },
                        { label: 'Damaged', val: item.item.damaged, icon: AlertTriangle },
                      ].map((s, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-navy-900 border border-white/5 text-center">
                          <s.icon className="w-4 h-4 mx-auto mb-2 text-zinc-600" />
                          <div className="text-xl font-black text-white tracking-tighter">{s.val}</div>
                          <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-6">
                      <Button className="px-8 shadow-neon-green">Check Out</Button>
                      <Button variant="secondary" className="px-8">Mark Damaged</Button>
                      <Button variant="outline" className="px-8">View History</Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!item && !isLoading && !isScanning && (
        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[40px] bg-navy-900/30">
          <History className="w-16 h-16 mx-auto mb-6 text-zinc-800" />
          <h4 className="text-lg font-black text-zinc-700 uppercase tracking-widest">Ready for ID</h4>
          <p className="text-sm text-zinc-600 font-medium">Scan an item or enter a barcode to view its status.</p>
        </div>
      )}
    </div>
  )
}
