"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'
import { Film, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'

const Hero3D = dynamic(() => import('@/components/3d/Hero3D'), { ssr: false })

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials. Please try again.')
        toast.error('Login Failed')
      } else {
        toast.success('Welcome back!')
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-navy-950">
      <Hero3D />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="glass-strong border-white/10 shadow-glass-lg overflow-visible">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-3xl bg-gradient-to-br from-neon-green to-neon-teal p-[2px] shadow-neon-teal animate-float">
            <div className="w-full h-full rounded-3xl bg-navy-900 flex items-center justify-center">
              <Film className="w-12 h-12 text-neon-teal" />
            </div>
          </div>

          <CardBody className="pt-16 pb-10 px-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Parth Admin</h1>
              <p className="text-sm text-zinc-500 font-medium">Production Management System</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm font-bold"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-neon-teal transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@parthproduction.in"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 outline-none focus:border-neon-teal/50 focus:bg-neon-teal/5 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-neon-teal transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 outline-none focus:border-neon-teal/50 focus:bg-neon-teal/5 transition-all font-medium"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-lg shadow-neon-teal"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Access Control'
                )}
              </Button>
            </form>
          </CardBody>
        </Card>

        <p className="mt-8 text-center text-xs font-bold text-zinc-600 uppercase tracking-[0.2em]">
          © 2025 PARTH PRODUCTION. SECURE ACCESS ONLY.
        </p>
      </motion.div>
    </div>
  )
}
