"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AlertCircle, ArrowLeft, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Hero3D = dynamic(() => import('@/components/3d/Hero3D'), { ssr: false })

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-navy-950">
      <Hero3D />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center max-w-md"
      >
        <div className="w-24 h-24 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8 animate-pulse">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-7xl font-black text-white uppercase tracking-tighter mb-4">404</h1>
        <h2 className="text-xl font-black text-neon-teal uppercase tracking-[0.2em] mb-6">Sector Not Found</h2>
        <p className="text-zinc-500 font-medium mb-10 leading-relaxed uppercase text-xs tracking-widest">
          The requested navigational coordinates do not exist in the current system matrix.
        </p>

        <div className="flex flex-col gap-4">
          <Link href="/dashboard">
            <Button className="w-full h-14 shadow-neon-teal uppercase font-black tracking-widest">
              <Home className="w-5 h-5 mr-3" /> Return to Command
            </Button>
          </Link>
          <Button variant="secondary" onClick={() => window.history.back()} className="h-14 uppercase font-black tracking-widest">
            <ArrowLeft className="w-5 h-5 mr-3" /> Previous Vector
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
