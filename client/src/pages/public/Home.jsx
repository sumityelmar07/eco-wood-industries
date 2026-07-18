import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Recycle, Users, History, TreeDeciduous, RefreshCw, Globe, Zap, Leaf } from 'lucide-react'
import Layout from '../../components/layout/Layout'

const taglines = [
  'Turning Wood Waste into Global Value.',
  'Recycling Wood, Protecting Nature.',
  'Eco Wood – Sustainable Wood Solutions.',
  'Giving Discarded Wood a Second Life.',
  'Saving Trees, Securing Our Future.',
]

const images = [
  '/images/wood1.jpeg',
  '/images/wood2.jpeg',
  '/images/wood3.jpeg',
  '/images/wood4.jpeg',
  '/images/wood5.jpeg',
  '/images/Product%20images/wood6.jpeg',
  '/images/Product%20images/wood7.jpeg',
  '/images/Product%20images/wood8.jpeg',
]

const iconMap = {
  recycle: Recycle,
  users: Users,
  history: History,
  tree: TreeDeciduous,
  refresh: RefreshCw,
  globe: Globe,
  zap: Zap,
  leaf: Leaf
}

const stats = [
  { label: 'Wood Recycled', target: 50000, suffix: ' Tons', icon: 'recycle', description: 'Reclaimed timber processed into circular market resources' },
  { label: 'Clients Served', target: 200, suffix: '+', icon: 'users', description: 'Industrial partnerships established across global networks' },
  { label: 'Years Experience', target: 5, suffix: '+', icon: 'history', description: 'Years of engineering sustainable resource cycles' },
  { label: 'Trees Saved', target: 2000, suffix: '+', icon: 'tree', description: 'Forest biomes preserved from industrial logging' },
]

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatCard({ label, target, suffix, icon, description }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const count = useCountUp(target, 2000, started)
  const IconComponent = iconMap[icon] || Recycle

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -10, scale: 1.03 }}
      className="glass-card rounded-3xl p-8 border border-emerald-600/10 hover:border-emerald-600/30 hover:shadow-[0_30px_60px_rgba(2,44,34,0.12)] transition-all duration-500 relative overflow-hidden group text-left"
    >
      {/* Dynamic Internal Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Visual Accent top bar and corner lighting */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-800 via-teal-500 to-amber-500" />
      <div className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse pointer-events-none" />

      <div className="flex items-center gap-4 mb-4">
        <span className="p-3 bg-emerald-50 border border-emerald-600/5 rounded-2xl group-hover:rotate-6 transition-transform duration-300 text-emerald-700">
          <IconComponent className="w-8 h-8" />
        </span>
        <div>
          <p className="text-3xl font-extrabold font-display bg-gradient-to-r from-emerald-950 to-amber-900 bg-clip-text text-transparent">
            {count.toLocaleString()}
            {suffix}
          </p>
          <p className="text-zinc-500 font-bold text-[10px] tracking-widest uppercase">{label}</p>
        </div>
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed border-t border-emerald-600/5 pt-3 mt-3 font-medium">
        {description}
      </p>
    </motion.div>
  )
}

function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[620px] overflow-hidden rounded-3xl border border-emerald-600/10 shadow-[0_25px_60px_rgba(2,44,34,0.14)]">
      {/* Background Slides */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-[1.03]"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === current ? 1 : 0,
            transform: i === current ? 'scale(1)' : 'scale(1.03)',
          }}
        />
      ))}
      {/* Tint Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      {/* Main Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-5 backdrop-blur-sm shadow-md flex items-center gap-1.5"
        >
          <Leaf className="w-3.5 h-3.5 text-emerald-300" />
          <span>Certified Circular Forestry Operations</span>
        </motion.span>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight font-display drop-shadow-2xl max-w-4xl leading-tight">
          Welcome to <span className="text-gradient !from-emerald-300 !via-teal-200 !to-amber-300">Eco Wood Industry</span>
        </h1>

        <div className="h-10 md:h-12 overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg md:text-2xl font-semibold text-emerald-100 tracking-wide drop-shadow"
            >
              {taglines[current % taglines.length]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-emerald-400/50 rounded-full" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute" />
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-emerald-400/50 rounded-full" />
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link to="/services" className="btn-primary flex items-center gap-2">
            <span>Explore Services</span>
            <span className="text-sm">➔</span>
          </Link>
          <Link
            to="/buy-wood"
            className="btn-secondary flex items-center gap-2"
          >
            <span>Sell Scrap Wood</span>
          </Link>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3.5 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'bg-emerald-400 w-8 h-2' : 'bg-white/40 w-2 h-2 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Slider Component */}
        <HeroSlider />

        {/* Counters Widget Grid */}
        <section className="py-20 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10 px-4 flex-wrap gap-4">
            <div>
              <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-widest">Global Activity metrics</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 font-display mt-1">Impact at a Glance</h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-50 border border-emerald-600/10 text-emerald-800 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Reporting
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </section>

        {/* Pulse Impact Alert Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20 text-center"
        >
          <div className="bg-[#f0fdf4] border border-emerald-600/15 backdrop-blur-md rounded-3xl py-8 px-6 shadow-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-transparent to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <p className="text-emerald-800 text-lg md:text-xl font-extrabold tracking-wide flex items-center justify-center gap-3">
              <Leaf className="w-5 h-5 text-emerald-600 animate-bounce" />
              <span>1 Ton of Recycled Wood Saves 12 to 15 Trees</span>
              <Leaf className="w-5 h-5 text-emerald-600 animate-bounce" />
            </p>
          </div>
        </motion.div>

        {/* Environmental Promise Section */}
        <section className="py-20 rounded-3xl bg-[#f4f2ec]/65 border border-emerald-600/15 shadow-sm relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center mb-16 px-6 relative z-10">
            <p className="text-emerald-700 uppercase tracking-widest text-xs font-bold mb-3">Our Promise to the Planet</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950 font-display leading-tight">
              Every Piece of Wood We Recycle <span className="text-gradient">Matters</span>
            </h2>
            <p className="text-zinc-650 mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              At <span className="font-semibold text-emerald-900">Eco Wood Industries</span>, we believe discarded planks, broken pallets, and industrial offcuts tell a story — and we give them a second life. Here's how we protect the biosphere together.
            </p>
            <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6 relative z-10">
            {[
              {
                icon: 'tree',
                title: 'Forest Conservation',
                desc: 'Every ton recycled by Eco Wood Industries keeps forest systems standing intact, fighting deforestation one cargo load at a time.',
              },
              {
                icon: 'recycle',
                title: 'Circular Ecosystems',
                desc: 'Landfill-destined scrap becomes dynamic export goods. Eco Wood Industries translates industrial endings into clean beginnings.',
              },
              {
                icon: 'globe',
                title: 'Low Carbon Impact',
                desc: 'By avoiding wood incineration and decay, we trap carbon structure and minimize logging emissions. The planet breathes easier.',
              },
              {
                icon: 'zap',
                title: 'Efficient Logistics',
                desc: 'Processing recycled fibers consumes a fraction of raw timber energy. Preserving resource power helps build a circular tomorrow.',
              },
            ].map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Recycle
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="glass-card rounded-3xl p-6 border border-emerald-600/10 hover:border-emerald-600/25 shadow-md transition-all duration-300 text-center relative overflow-hidden group"
                >
                  {/* Dynamic Internal Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Visual accents in cards */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600/40 to-teal-500/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-12 h-12 mx-auto mb-4 bg-emerald-50 border border-emerald-600/5 rounded-2xl flex items-center justify-center text-emerald-700 transform group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 font-display mb-2">{item.title}</h3>
                  <p className="text-zinc-650 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center text-emerald-800 font-bold mt-16 text-sm md:text-base italic px-6 relative z-10 flex items-center justify-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-700" />
            <span>"When Eco Wood Industries recycles wood — nature breathes a little easier."</span>
            <Leaf className="w-4 h-4 text-emerald-700" />
          </div>
        </section>
      </div>
    </Layout>
  )
}
