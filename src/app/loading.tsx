"use client"
import { motion } from 'framer-motion'
import { Film } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy-950 p-6">
      <div className="relative">
        {/* Animated Glow Rings */}
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-neon-teal/20 blur-2xl"
        />
        
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-neon-green to-neon-teal p-[2px] shadow-neon-green"
        >
          <div className="w-full h-full rounded-3xl bg-navy-950 flex items-center justify-center">
            <Film className="w-10 h-10 text-neon-teal" />
          </div>
        </motion.div>
      </div>
      
      <div className="mt-12 text-center space-y-2">
        <h2 className="text-[10px] font-black text-white uppercase tracking-[0.6em]">System Synchronizing</h2>
        <div className="flex gap-1 justify-center">
          {[1,2,3].map(i => (
            <motion.div 
              key={i}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-1 h-1 rounded-full bg-neon-teal"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
