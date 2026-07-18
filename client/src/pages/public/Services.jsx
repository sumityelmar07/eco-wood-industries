import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Recycle, Package, Clipboard, Truck, Layers, Box, Factory, Hammer, Home, Trees, Warehouse } from 'lucide-react'
import Layout from '../../components/layout/Layout'

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' },
  }),
}

const iconMap = {
  recycle: Recycle,
  package: Package,
  consultation: Clipboard,
  logistics: Truck,
  pallet: Layers,
  crate: Box,
  factory: Factory,
  construction: Hammer,
  furniture: Home,
  board: Layers,
  forest: Trees,
  warehouse: Warehouse,
}

const materials = [
  { icon: 'pallet', name: 'Used Wooden Pallets', desc: 'Recovered from warehouses and logistics chains.' },
  { icon: 'crate', name: 'Wooden Packing Crates', desc: 'Industrial crates upcycled for a second lifecycle.' },
  { icon: 'factory', name: 'Scrap Wood from Factories', desc: 'Manufacturing timber remnants salvaged from disposal.' },
  { icon: 'construction', name: 'Construction Wood Waste', desc: 'Site framing lumber reclaimed and repurposed.' },
  { icon: 'furniture', name: 'Old Furniture Wood', desc: 'Discarded furniture wood processed for raw fiber.' },
  { icon: 'board', name: 'Plywood & Board Scraps', desc: 'Laminated board pieces gathered and re-milled.' },
  { icon: 'forest', name: 'Hardwood & Softwood Leftovers', desc: 'Premium forest logging fragments saved.' },
  { icon: 'warehouse', name: 'Warehouse Dismantled Wood', desc: 'Structural beams salvaged, graded, and renewed.' },
]

const coreServices = [
  {
    icon: 'recycle',
    title: 'Wood Collection & Recycling',
    desc: 'We salvage and recycle discarded lumber from manufacturing facilities, commercial depots, building sites, and packaging plants — transforming discarded fiber into premium market assets.',
  },
  {
    icon: 'package',
    title: 'Timber Trading & Sourcing',
    desc: 'Acquire and trade processed, high-grade recycled wood at competitive pricing. Our distribution channel supports buyers and sellers across regional and global trade networks.',
  },
  {
    icon: 'consultation',
    title: 'Sourcing Consultation',
    desc: 'Custom audits on supply chain circularity, wood reclamation optimization, and eco-certified packaging integration designed for modern ESG compliance.',
  },
  {
    icon: 'logistics',
    title: 'Integrated Logistics',
    desc: 'Reliable, on-time haulage and delivery options for reclaimed feedstock and processed products directly to your factory doors.',
  },
]

export default function Services() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-emerald-100/70 via-[#f4f2ec]/85 to-amber-100/70 py-24 rounded-3xl text-center border border-emerald-600/20 shadow-md overflow-hidden mb-16 backdrop-blur-md"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-800 uppercase tracking-widest text-xs font-bold mb-3"
          >
            What We Do
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-extrabold text-zinc-950 mb-6 font-display drop-shadow-sm"
          >
            Our <span className="bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-zinc-655 text-base md:text-lg max-w-2xl mx-auto px-4 leading-relaxed font-semibold"
          >
            From raw collection to structured product distribution — Eco Wood Industries covers every step of the circular wood ecosystem.
          </motion.p>
        </motion.div>

        {/* Core Services Section */}
        <section className="py-12 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-emerald-700 uppercase tracking-widest text-xs font-bold mb-2">Core Solutions</p>
            <h2 className="text-3xl font-extrabold text-zinc-950 font-display">Integrated Timber Operations</h2>
            <div className="w-12 h-1 bg-emerald-600 rounded mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {coreServices.map((s, i) => {
              const IconComponent = iconMap[s.icon]
              return (
                <motion.div
                  key={s.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i * 0.15}
                  whileHover={{ y: -6, borderColor: 'rgba(4,120,87,0.3)', boxShadow: '0 15px 30px rgba(2,44,34,0.06)' }}
                  className="glass-card rounded-3xl p-8 border border-emerald-600/10 shadow-md transition-all duration-300 relative overflow-hidden group flex flex-col items-start"
                >
                  {/* Dynamic Internal Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-600/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-600/5 rounded-2xl flex items-center justify-center text-emerald-700 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950 font-display mb-3">{s.title}</h3>
                  <p className="text-zinc-650 text-sm leading-relaxed font-semibold">{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Materials We Collect Section */}
        <section className="py-16 rounded-3xl bg-[#f4f2ec] border border-emerald-600/10 shadow-md relative overflow-hidden mb-16">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-16"
            >
              <p className="text-amber-700 uppercase tracking-widest text-xs font-bold mb-2">Reclamation Streams</p>
              <h2 className="text-3xl font-extrabold text-zinc-950 font-display">Feedstock We Accept</h2>
              <p className="text-zinc-650 mt-3 text-sm max-w-xl mx-auto">
                No wood is too worn, too split, or too weathered. If it can be processed — <span className="font-semibold text-emerald-700">we upcycle it.</span>
              </p>
              <div className="w-12 h-1 bg-amber-600 rounded mx-auto mt-4" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {materials.map((m, i) => {
                const IconComponent = iconMap[m.icon]
                return (
                  <motion.div
                    key={m.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i * 0.06}
                    whileHover={{ y: -6, borderColor: 'rgba(16,185,129,0.3)', backgroundColor: 'rgba(255,255,255,0.7)' }}
                    className="bg-white/80 border border-emerald-600/10 rounded-2xl p-5 text-center shadow-sm transition-all duration-300 group flex flex-col items-center justify-between min-h-[170px] relative overflow-hidden"
                  >
                    {/* Dynamic Internal Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="w-12 h-12 bg-emerald-50 border border-emerald-600/5 rounded-2xl flex items-center justify-center text-emerald-755 mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-bold text-zinc-950 text-sm mb-1.5 font-display">{m.name}</p>
                      <p className="text-zinc-500 text-xs leading-relaxed font-semibold">{m.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="py-16 text-center max-w-4xl mx-auto px-6 border border-emerald-600/10 rounded-3xl bg-white shadow-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-transparent to-amber-600/5 pointer-events-none" />
          <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-950 mb-4 font-display leading-tight">
            Have Scrap Wood to Sell or Sourcing Needs?
          </h2>
          <p className="text-zinc-655 mb-8 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-semibold">
            Eco Wood Industries offers quick valuation, structured logistics, and certified circular supply loops. Let's build a greener infrastructure.
          </p>
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 hover:shadow-md"
          >
            <span>See How It Works</span>
            <span className="text-sm">➔</span>
          </Link>
        </motion.section>
      </div>
    </Layout>
  )
}
