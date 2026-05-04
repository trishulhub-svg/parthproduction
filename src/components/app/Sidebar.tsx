"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/utils'
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  CalendarCheck, 
  IndianRupee, 
  Users, 
  UsersRound, 
  QrCode, 
  Settings,
  LogOut,
  ChevronLeft,
  Film,
  Menu,
  X
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '../ui/Button'
import { signOut } from 'next-auth/react'

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Inventory', href: '/inventory', icon: Package },
  { label: 'Categories', href: '/categories', icon: Tags },
  { label: 'Event Orders', href: '/orders', icon: CalendarCheck },
  { label: 'Finance', href: '/finance', icon: IndianRupee },
  { label: 'Employees', href: '/employees', icon: Users },
  { label: 'Teams', href: '/teams', icon: UsersRound },
  { label: 'Scan Item', href: '/scan', icon: QrCode },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Auto-close mobile sidebar on navigation
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-[60] w-12 h-12 glass rounded-2xl flex items-center justify-center text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={cn(
          "fixed left-0 top-0 h-screen bg-navy-900 border-r border-white/5 transition-all duration-300 z-[80] flex flex-col",
          isCollapsed ? "w-20" : "w-64",
          "max-lg:translate-x-[-100%] max-lg:w-72",
          isMobileOpen && "max-lg:translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-neon-teal flex items-center justify-center shrink-0 shadow-neon-green">
              <Film className="w-6 h-6 text-navy-950" />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="overflow-hidden whitespace-nowrap">
                <h1 className="text-lg font-black tracking-tighter text-white">PARTH</h1>
                <p className="text-[10px] font-bold text-neon-teal uppercase tracking-[0.2em]">Production</p>
              </div>
            )}
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-zinc-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group",
                  isActive 
                    ? "bg-gradient-to-r from-neon-teal/20 to-transparent text-neon-teal font-black shadow-[inset_4px_0_0_0_#00d4ff]" 
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-neon-teal" : "group-hover:text-white")} />
                {(!isCollapsed || isMobileOpen) && <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 flex flex-col gap-2">
          <Link 
            href="/settings"
            className={cn(
              "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group",
              pathname === '/settings' ? "bg-white/10 text-white font-black" : "text-zinc-500 hover:text-white hover:bg-white/5"
            )}
          >
            <Settings className="w-5 h-5" />
            {(!isCollapsed || isMobileOpen) && <span className="text-xs font-black uppercase tracking-widest">Settings</span>}
          </Link>
          <button 
            onClick={() => signOut()}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-black text-xs uppercase tracking-widest"
          >
            <LogOut className="w-5 h-5" />
            {(!isCollapsed || isMobileOpen) && <span>Logout</span>}
          </button>
        </div>

        {/* Desktop Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-navy-800 border border-white/10 rounded-full hidden lg:flex items-center justify-center text-zinc-500 hover:text-white hover:border-neon-teal transition-all shadow-xl"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
        </button>
      </aside>
    </>
  )
}
