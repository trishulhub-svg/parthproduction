"use client"
import { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Tags, 
  Plus, 
  MoreVertical, 
  Package, 
  Edit3, 
  Trash2,
  Box,
  LayoutGrid
} from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, invRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/inventory')
        ])
        const catData = await catRes.json()
        const invData = await invRes.json()
        setCategories(catData)
        setItems(invData)
      } catch (err) {
        toast.error('Failed to load data')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Classification</h3>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Equipment Categories & Organization</p>
        </div>
        <Button className="shadow-neon-teal px-6">
          <Plus className="w-5 h-5 mr-2" />
          New Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-40 animate-pulse text-zinc-600 font-bold uppercase tracking-widest text-xs">Mapping System Structure...</div>
        ) : categories.map((cat, i) => {
          const catItems = items.filter(it => it.item.categoryId === cat.id)
          const totalUnits = catItems.reduce((s, it) => s + (it.item.quantity || 0), 0)
          
          return (
            <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <Card className="group hover:border-neon-teal/30 transition-all hover:shadow-2xl">
                <CardBody className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-neon-teal transition-colors">
                      <LayoutGrid className="w-6 h-6" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-700 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1 group-hover:text-neon-teal transition-colors truncate">{cat.name}</h4>
                  <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-6">Equipment Group</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                    <div>
                      <div className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">Item Types</div>
                      <div className="text-lg font-black text-white tracking-tighter">{catItems.length}</div>
                    </div>
                    <div>
                      <div className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">Total Stock</div>
                      <div className="text-lg font-black text-neon-green tracking-tighter">{totalUnits}</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">Directory View</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Description</th>
                <th className="text-center">Items</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td className="font-bold text-white uppercase tracking-widest text-xs">{cat.name}</td>
                  <td className="text-zinc-500 font-medium text-sm">{cat.description || '—'}</td>
                  <td className="text-center font-bold text-neon-teal">{items.filter(it => it.item.categoryId === cat.id).length}</td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-white"><Edit3 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500/30 hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
