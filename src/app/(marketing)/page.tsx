"use client"
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { 
  Lightbulb, 
  Volume2, 
  Monitor, 
  Zap, 
  Truck, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Film,
  Instagram,
  Twitter,
  Linkedin,
  ChevronDown
} from 'lucide-react'
import { useRef } from 'react'
import { cn } from '../../lib/utils'

const Hero3D = dynamic(() => import('../../components/3d/Hero3D'), { ssr: false })

export default function HomePage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-navy-950 selection:bg-neon-teal selection:text-navy-950 overflow-x-hidden">
      {/* 3D Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <Hero3D />
      </div>

      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-strong px-8 py-4 rounded-3xl border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-neon-teal flex items-center justify-center shadow-neon-green">
              <Film className="w-6 h-6 text-navy-950" />
            </div>
            <div>
              <h4 className="text-sm font-black tracking-tighter text-white leading-none">PARTH</h4>
              <p className="text-[8px] font-black text-neon-teal uppercase tracking-[0.2em]">Production</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {['Services', 'Portfolio', 'Experience', 'Contact'].map(link => (
              <Link key={link} href="#" className="text-[10px] font-black text-zinc-400 hover:text-white uppercase tracking-[0.3em] transition-colors">{link}</Link>
            ))}
          </div>
          <Link href="/login">
            <Button variant="outline" className="px-8 border-neon-teal/30 text-neon-teal hover:bg-neon-teal hover:text-navy-950">
              Admin Access
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center z-10 px-6">
        <motion.div style={{ opacity, scale }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 text-neon-teal text-[10px] font-black uppercase tracking-[0.5em] mb-10 backdrop-blur-md">
              Cinematic Event Engineering
            </span>
            <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter text-white mb-8 uppercase leading-[0.8] mix-blend-difference">
              PARTH <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-teal to-neon-purple neon-text-teal">
                PRODUCTION
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-2xl text-zinc-500 font-medium mb-12 leading-relaxed px-4">
              We don’t just host events. We engineer immersive atmospheres 
              using world-class lighting and sonic precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="h-20 px-12 text-xl font-black rounded-full shadow-neon-green group">
                Start Your Journey
                <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-navy-950 bg-zinc-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="flex flex-col justify-center ml-4 text-left">
                  <div className="text-xs font-black text-white">500+ Projects</div>
                  <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-white">Delivered in 2024</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-700 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] font-black uppercase tracking-[0.4em]">Scroll Down</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* Services - Scroll Revealed */}
      <section className="relative py-40 px-6 z-10 bg-navy-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter mb-8">
                Mastering the <br/> <span className="text-neon-teal">Technical Art</span>
              </h2>
              <p className="text-xl text-zinc-500 font-medium max-w-lg">
                Our inventory is curated for professionals who demand zero compromise 
                on quality and performance.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex justify-end gap-10"
            >
              <div className="text-center">
                <div className="text-5xl font-black text-white mb-2 tracking-tighter uppercase leading-none">12K+</div>
                <div className="text-[10px] font-black text-neon-green uppercase tracking-[0.3em]">Assets in Stock</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-white mb-2 tracking-tighter uppercase leading-none">24/7</div>
                <div className="text-[10px] font-black text-neon-teal uppercase tracking-[0.3em]">Field Support</div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Intelligent Lighting', icon: Lightbulb, color: 'from-amber-400 to-orange-600', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30' },
              { title: 'Acoustic Precision', icon: Volume2, color: 'from-blue-400 to-indigo-600', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad' },
              { title: 'LED Architecture', icon: Monitor, color: 'from-neon-teal to-blue-600', img: 'https://images.unsplash.com/photo-1514525253361-5582669a0a7d' },
              { title: 'Power Grids', icon: Zap, color: 'from-yellow-400 to-red-600', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa' },
              { title: 'Fleet Logistics', icon: Truck, color: 'from-zinc-400 to-zinc-600', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d' },
              { title: 'Special FX', icon: Sparkles, color: 'from-pink-400 to-purple-600', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b' },
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -20 }}
                className="group relative h-[500px] rounded-[40px] overflow-hidden glass border-white/5 cursor-pointer"
              >
                <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-2xl", service.color)}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter leading-none">{service.title}</h3>
                  <p className="text-sm font-medium text-zinc-400 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                    Industry leading hardware deployed by master technicians.
                  </p>
                  <Link href="#" className="inline-flex items-center text-neon-teal font-black text-[10px] uppercase tracking-[0.3em] gap-3">
                    Configure Solution <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative py-32 px-6 z-10 border-t border-white/5 bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
            <div className="col-span-1 lg:col-span-2">
               <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-green to-neon-teal flex items-center justify-center shadow-neon-green">
                  <Film className="w-8 h-8 text-navy-950" />
                </div>
                <h4 className="text-3xl font-black tracking-tighter text-white uppercase">Parth Production</h4>
              </div>
              <p className="text-xl text-zinc-500 font-medium max-w-sm mb-10">
                Crafting the future of event production through engineering excellence.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <Link key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-neon-teal/20 transition-all">
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-10">Solutions</h5>
              <div className="flex flex-col gap-6">
                {['Live Concerts', 'Corporate Galas', 'Royal Weddings', 'Digital Studios'].map(item => (
                  <Link key={item} href="#" className="text-sm font-bold text-zinc-500 hover:text-neon-teal transition-colors uppercase tracking-widest">{item}</Link>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-10">HQ Location</h5>
              <p className="text-sm font-bold text-zinc-500 leading-relaxed uppercase tracking-widest">
                Parth Complex, <br/>
                Media Circle, <br/>
                Ahmedabad, Gujarat <br/>
                380001
              </p>
            </div>
          </div>
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em]">© 2025 PARTH PRODUCTION. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-10">
              <Link href="#" className="text-[10px] font-black text-zinc-700 hover:text-white uppercase tracking-[0.2em] transition-colors">Privacy Protocol</Link>
              <Link href="#" className="text-[10px] font-black text-zinc-700 hover:text-white uppercase tracking-[0.2em] transition-colors">Usage Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
