"use client"
import { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Settings2, 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Building2, 
  Globe, 
  Mail, 
  Phone,
  Save,
  CheckCircle2,
  Trash2,
  Plus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')

  const sections = [
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'company', label: 'Company Info', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ]

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h3 className="text-xl font-black text-white uppercase tracking-tight">System Settings</h3>
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Configure Environment & Identity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-2">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeSection === s.id 
                  ? "bg-neon-teal/10 text-neon-teal border border-neon-teal/20 shadow-lg" 
                  : "text-zinc-600 hover:text-zinc-400 hover:bg-white/5"
              )}
            >
              <s.icon className="w-5 h-5" />
              {s.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeSection === 'profile' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="uppercase tracking-widest text-sm">Personal Identity</CardTitle>
                    <Button variant="secondary" size="sm" className="px-6 shadow-none">
                      <Save className="w-4 h-4 mr-2" /> Update Profile
                    </Button>
                  </CardHeader>
                  <CardBody className="p-10 space-y-8">
                    <div className="flex items-center gap-8 mb-10">
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-neon-teal to-blue-800 p-[2px] shadow-lg">
                        <div className="w-full h-full rounded-3xl bg-navy-900 flex items-center justify-center text-4xl font-black text-neon-teal">A</div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm" className="mb-2">Change Avatar</Button>
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Recommended: 400x400px • JPG/PNG</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Display Name</label>
                        <input type="text" defaultValue="Admin User" className="w-full bg-navy-900 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-neon-teal/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Email Identifier</label>
                        <input type="email" defaultValue="admin@parthproduction.in" className="w-full bg-navy-900 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-neon-teal/50" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {activeSection === 'security' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card>
                  <CardHeader><CardTitle className="uppercase tracking-widest text-sm">Access Control</CardTitle></CardHeader>
                  <CardBody className="p-10 space-y-12">
                    <div className="max-w-md space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-navy-900 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-neon-teal/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">New Secure Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-navy-900 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-neon-teal/50" />
                      </div>
                      <Button className="w-full h-14 shadow-neon-teal uppercase tracking-widest font-black">Update Credentials</Button>
                    </div>

                    <div className="pt-12 border-t border-white/5 space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Authorized Accounts</h4>
                        <Button variant="secondary" size="sm"><Plus className="w-4 h-4 mr-2" /> Add Admin</Button>
                      </div>
                      <div className="space-y-2">
                        {[
                          { name: 'Admin User', email: 'admin@parthproduction.in', role: 'Super Admin' },
                          { name: 'Technician', email: 'tech@parthproduction.in', role: 'Editor' }
                        ].map((u, i) => (
                          <div key={i} className="flex justify-between items-center p-5 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center font-bold text-zinc-500">{u.name[0]}</div>
                              <div>
                                <div className="text-sm font-bold text-white">{u.name}</div>
                                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{u.email}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] font-black text-neon-teal uppercase tracking-widest px-3 py-1 rounded-full bg-neon-teal/10">{u.role}</span>
                              <Button variant="ghost" size="icon" className="text-red-500/50 hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {activeSection === 'company' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card>
                  <CardHeader><CardTitle className="uppercase tracking-widest text-sm">Enterprise Identity</CardTitle></CardHeader>
                  <CardBody className="p-10 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Organization Name</label>
                        <input type="text" defaultValue="Parth Production" className="w-full bg-navy-900 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-neon-teal/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Registered Phone</label>
                        <input type="text" defaultValue="+91 98765 43210" className="w-full bg-navy-900 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-neon-teal/50" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">HQ Address (For Invoices)</label>
                        <textarea className="w-full bg-navy-900 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-neon-teal/50 h-32" defaultValue="123 Production Way, Media Center, Gujarat, India." />
                      </div>
                    </div>
                    <Button className="px-10 h-14 shadow-neon-green uppercase tracking-widest font-black">Save Global Data</Button>
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

import { AnimatePresence } from 'framer-motion'
