"use client"
import { useState, useEffect } from 'react'
import { Card, CardBody } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Printer,
  Box,
  LayoutGrid,
  List,
  AlertCircle
} from 'lucide-react'
import { cn, STATUS_COLORS } from '../../../lib/utils'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [invRes, catRes] = await Promise.all([
        fetch('/api/inventory'),
        fetch('/api/categories')
      ])
      const invData = await invRes.json()
      const catData = await catRes.json()
      setItems(invData)
      setCategories(catData)
    } catch (err) {
      toast.error('Sync Error')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredItems = items.filter(r => {
    const searchMatch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                      (r.barcode || '').toLowerCase().includes(search.toLowerCase())
    const catMatch = !filterCat || String(r.categoryId) === filterCat
    return searchMatch && catMatch
  })

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="text-[10px] font-black text-neon-teal uppercase tracking-[0.4em] mb-3">Resource Allocation</div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">Inventory <br/> Registry</h1>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex p-1 bg-navy-900 border border-white/5 rounded-2xl">
            <button 
              onClick={() => setViewMode('table')}
              className={cn("p-3 rounded-xl transition-all", viewMode === 'table' ? "bg-white/10 text-white" : "text-zinc-600")}
            >
              <List className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("p-3 rounded-xl transition-all", viewMode === 'grid' ? "bg-white/10 text-white" : "text-zinc-600")}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
          <Button className="flex-1 md:flex-none shadow-neon-green h-14 px-8">
            <Plus className="w-5 h-5 mr-3" />
            Provision Gear
          </Button>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <Card className="glass border-white/5 shadow-2xl">
        <CardBody className="p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by blueprint or barcode..."
              className="w-full bg-navy-900 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-sm text-white placeholder:text-zinc-700 focus:border-neon-teal/50 outline-none transition-all font-bold tracking-tight"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <select 
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="flex-1 md:flex-none bg-navy-900 border border-white/10 rounded-2xl py-4 px-6 text-sm text-zinc-400 outline-none focus:border-neon-teal/50 transition-all min-w-[200px] font-black uppercase tracking-widest"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <Button variant="secondary" size="icon" className="h-14 w-14 shrink-0">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Content Area */}
      {isLoading ? (
        <div className="text-center py-40">
          <div className="w-12 h-12 border-2 border-neon-teal border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Querying Asset Database...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Mobile Card Grid (Visible only on mobile) or Grid Mode */}
          <div className={cn(
            "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6",
            viewMode === 'table' ? "lg:hidden" : "grid"
          )}>
            {filteredItems.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                <Card className="group hover:border-white/10 transition-all relative overflow-hidden">
                  <CardBody className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-neon-teal group-hover:scale-110 transition-transform shadow-lg">
                        <Box className="w-8 h-8" />
                      </div>
                      <span className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border", STATUS_COLORS[item.status])}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-1 group-hover:text-neon-teal transition-colors">{item.name}</h4>
                    <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-8">{item.categoryName || 'General Asset'}</div>
                    
                    <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-navy-900 border border-white/5 mb-8">
                      <div className="text-center border-r border-white/5">
                        <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Total</div>
                        <div className="text-xl font-black text-white tracking-tighter">{item.quantity}</div>
                      </div>
                      <div className="text-center border-r border-white/5">
                        <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Ready</div>
                        <div className="text-xl font-black text-neon-green tracking-tighter">{item.available}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Deploy</div>
                        <div className="text-xl font-black text-neon-teal tracking-tighter">{item.onEvent}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="text-[9px] font-mono text-zinc-700 tracking-widest uppercase">{item.barcode}</div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-700 hover:text-white"><Printer className="w-5 h-5" /></Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-700 hover:text-white"><Edit3 className="w-5 h-5" /></Button>
                      </div>
                    </div>
                  </CardBody>
                  <div className={cn("absolute bottom-0 left-0 h-[2px] transition-all duration-500 w-12 group-hover:w-full", `bg-${STATUS_COLORS[item.status].split(' ')[0].replace('text-', '')}`)} />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Desktop Table (Hidden on mobile) */}
          <div className={cn(
            "hidden lg:block",
            viewMode === 'grid' && "hidden"
          )}>
            <Card className="overflow-hidden border-white/5">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Item Specification</th>
                    <th>Asset ID</th>
                    <th>Category</th>
                    <th className="text-center">Inventory</th>
                    <th className="text-center">Live Units</th>
                    <th>Status</th>
                    <th className="text-right">Management</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="font-black text-white uppercase tracking-tight text-lg">{item.name}</div>
                        <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Master Blueprint</div>
                      </td>
                      <td className="font-mono text-xs text-zinc-500 tracking-widest uppercase">{item.barcode}</td>
                      <td>
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-xl border border-white/5">
                          {item.categoryName || 'Unassigned'}
                        </span>
                      </td>
                      <td className="text-center font-black text-white text-xl tracking-tighter">{item.quantity}</td>
                      <td className="text-center">
                        <div className="flex items-center justify-center gap-4">
                          <div className="text-center">
                            <div className="text-[8px] font-black text-neon-green uppercase tracking-widest">Ready</div>
                            <div className="text-lg font-black text-neon-green">{item.available}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-[8px] font-black text-neon-teal uppercase tracking-widest">Out</div>
                            <div className="text-lg font-black text-neon-teal">{item.onEvent}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={cn("px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-lg", STATUS_COLORS[item.status])}>
                          {item.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-3">
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-700 hover:text-white" title="Print Tag"><Printer className="w-5 h-5" /></Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-700 hover:text-white" title="Edit Data"><Edit3 className="w-5 h-5" /></Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-red-500/20 hover:text-red-500 hover:bg-red-500/10" title="Decommission"><Trash2 className="w-5 h-5" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[40px]">
              <AlertCircle className="w-16 h-16 mx-auto mb-6 text-zinc-800" />
              <h4 className="text-xl font-black text-zinc-700 uppercase tracking-widest">Registry Entry Not Found</h4>
              <p className="text-sm text-zinc-600 font-medium">Clear filters to resume scanning.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
