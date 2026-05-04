"use client"
import { useState, useEffect } from 'react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  UsersRound, 
  UserPlus, 
  Plus, 
  MoreVertical,
  ShieldCheck,
  ChevronRight,
  Settings2,
  Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await fetch('/api/teams')
        const data = await res.json()
        setTeams(data)
      } catch (err) {
        toast.error('Failed to load teams')
      } finally {
        setIsLoading(false)
      }
    }
    fetchTeams()
  }, [])

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Team Structure</h3>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Organize Crew & Leads</p>
        </div>
        <Button className="shadow-neon-purple px-6">
          <Plus className="w-5 h-5 mr-2" />
          Form New Team
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {isLoading ? (
          <div className="col-span-full text-center py-40 animate-pulse text-zinc-600 font-bold uppercase tracking-widest text-xs">Assembling Team Data...</div>
        ) : teams.length > 0 ? (
          teams.map((team, i) => (
            <motion.div key={team.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="group hover:border-white/10 transition-all">
                <CardBody className="p-8">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-purple to-purple-800 flex items-center justify-center shadow-lg">
                        <UsersRound className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-neon-purple transition-colors">{team.name}</h4>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-3 h-3 text-neon-teal" />
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Managed by Lead</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-700 hover:text-white">
                        <Settings2 className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-red-500/30 hover:text-red-500 hover:bg-red-500/10">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8">
                    {team.description || 'Dedicated team specialized in large-scale event production and technical setup.'}
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-white/5 pb-2">
                      <span>Assigned Members</span>
                      <span>{team.members?.length || 0} Professionals</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(team.members || []).map((m: any, j: number) => (
                        <div key={j} className="px-3 py-1.5 rounded-xl bg-navy-900 border border-white/5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:border-neon-purple/30 transition-colors">
                          {m.name}
                        </div>
                      ))}
                      <button className="px-3 py-1.5 rounded-xl border border-dashed border-white/10 text-[10px] font-bold text-zinc-600 uppercase tracking-widest hover:border-neon-teal hover:text-neon-teal transition-all">
                        + Add Member
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy-800 border border-white/5 flex items-center justify-center text-neon-teal">
                        <UserPlus className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active Lead</div>
                        <div className="text-xs font-bold text-white uppercase">{team.leader?.name || 'Assigned Manager'}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-[10px] uppercase tracking-[0.2em] px-4">
                      Deploy Team
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-40 border-2 border-dashed border-white/5 rounded-3xl">
            <UsersRound className="w-16 h-16 mx-auto mb-6 text-zinc-800" />
            <h4 className="text-lg font-black text-zinc-700 uppercase tracking-widest">No Teams Formed</h4>
            <p className="text-sm text-zinc-600 font-medium">Create specialized units for event operations.</p>
          </div>
        )}
      </div>
    </div>
  )
}
