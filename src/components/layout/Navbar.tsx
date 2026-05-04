"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Film, Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-6 py-4 md:py-8",
      isScrolled ? "py-2 md:py-4" : "py-4 md:py-8"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-2 md:py-4 rounded-2xl md:rounded-[2rem] border transition-all duration-500",
        isScrolled 
          ? "glass-strong border-white/10 shadow-2xl" 
          : "bg-navy-950/20 backdrop-blur-sm border-white/5"
      )}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-neon-green to-neon-teal flex items-center justify-center shadow-neon-green group-hover:scale-110 transition-transform">
            <Film className="w-5 h-5 md:w-6 md:h-6 text-navy-950" />
          </div>
          <div>
            <h4 className="text-xs md:text-sm font-black tracking-tighter text-white leading-none uppercase">PARTH</h4>
            <p className="text-[6px] md:text-[8px] font-black text-neon-teal uppercase tracking-[0.2em]">Production</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-black text-zinc-400 hover:text-white uppercase tracking-[0.3em] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" size="sm" className="px-6 border-neon-teal/30 text-neon-teal hover:bg-neon-teal hover:text-navy-950 rounded-full">
              Admin Access
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 z-[90] md:hidden"
          >
            <div className="glass-strong rounded-[2rem] border border-white/10 p-8 shadow-2xl">
              <div className="flex flex-col gap-6">
                {navLinks.map(link => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-black text-white uppercase tracking-[0.2em] border-b border-white/5 pb-4"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full h-14 rounded-2xl shadow-neon-teal">
                    Admin Access
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
