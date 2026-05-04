import { Sidebar } from './Sidebar'
import { auth } from '@/lib/auth'
import { cn } from '@/lib/utils'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <div className="flex min-h-screen bg-navy-950">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 md:p-10 transition-all duration-300 overflow-x-hidden w-full">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <div className="max-lg:ml-16">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none">Management</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-neon-green" />
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Systems Active & Secured</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-2 pr-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green to-neon-teal p-[2px] shadow-neon-green group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-xl bg-navy-900 flex items-center justify-center font-black text-xl text-neon-teal">
                {session?.user?.name?.[0].toUpperCase() || 'A'}
              </div>
            </div>
            <div>
              <p className="text-sm font-black text-white leading-none mb-1">{session?.user?.name}</p>
              <p className="text-[9px] font-black text-neon-teal uppercase tracking-[0.2em] opacity-70">Administrator</p>
            </div>
          </div>
        </header>
        
        {/* Page Content Container */}
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
