"use client"
import { useState, useEffect } from 'react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Users, 
  UserPlus, 
  Search, 
  Phone, 
  Mail, 
  Briefcase, 
  Calendar,
  MoreVertical,
  ShieldCheck,
  MapPin,
  CheckCircle2
} from 'lucide-react'
import { cn, fmtDate, STATUS_COLORS } from '@/lib/utils'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function fetchEmployees() {
    try {
      const res = await fetch('/api/employees')
      const data = await res.json()
      setEmployees(data)
    } catch (err) {
      toast.error('Failed to load crew')
    } finally {
      setIsLoading(false)
    }
  }

  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || (e.role || '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Workforce</h3>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Crew & Technical Team Management</p>
        </div>
        <Button className="shadow-neon-teal px-6">
          <UserPlus className="w-5 h-5 mr-2" />
          Onboard Crew
        </Button>
      </div>

      {/* Stats & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-end justify-between">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
          {[
            { label: 'Total Crew', val: employees.length, color: 'text-white' },
            { label: 'Active', val: employees.filter(e => e.status === 'ACTIVE').length, color: 'text-neon-green' },
            { label: 'On Field', val: 0, color: 'text-neon-teal' },
            { label: 'Off Duty', val: employees.filter(e => e.status === 'INACTIVE').length, color: 'text-zinc-600' },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-2xl bg-navy-900 border border-white/5">
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{s.label}</div>
              <div className={cn("text-2xl font-black tracking-tighter", s.color)}>{s.val}</div>
            </div>
          ))}
        </div>
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or role..." 
            className="w-full bg-navy-900 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:border-neon-teal/50 outline-none" 
          />
        </div>
      </div>

      {/* Crew Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-40 animate-pulse text-zinc-600 font-bold uppercase tracking-widest text-xs">Retrieving Crew Profiles...</div>
        ) : filtered.length > 0 ? (
          filtered.map((emp, i) => (
            <motion.div key={emp.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <Card className="group hover:border-white/10 transition-all hover:shadow-xl relative overflow-hidden">
                <CardBody className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-navy-800 to-navy-900 border border-white/5 flex items-center justify-center font-black text-3xl text-zinc-700 group-hover:text-neon-teal transition-colors">
                      {emp.name[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={cn("px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border", STATUS_COLORS[emp.status])}>
                        {emp.status}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-700 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-neon-teal transition-colors">{emp.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Briefcase className="w-3 h-3 text-neon-teal" />
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{emp.role}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      <Phone className="w-4 h-4 opacity-50" />
                      <span className="text-xs font-medium">{emp.phone || '—'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      <Mail className="w-4 h-4 opacity-50" />
                      <span className="text-xs font-medium truncate">{emp.email || '—'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      <MapPin className="w-4 h-4 opacity-50" />
                      <span className="text-xs font-medium truncate">{emp.address || 'Field Staff'}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center bg-navy-900/50 p-4 rounded-2xl border border-white/5">
                    <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Joined</div>
                    <div className="text-xs font-bold text-zinc-400">{fmtDate(emp.joinDate)}</div>
                  </div>
                </CardBody>
                
                {/* Visual accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-neon-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-neon-teal/10 transition-all" />
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-40 border-2 border-dashed border-white/5 rounded-3xl">
            <Users className="w-16 h-16 mx-auto mb-6 text-zinc-800" />
            <h4 className="text-lg font-black text-zinc-700 uppercase tracking-widest">No Crew Matches</h4>
            <p className="text-sm text-zinc-600 font-medium">Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  )
}
