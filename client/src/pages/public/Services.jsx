import { motion } from 'framer-motion'
import Layout from '../../components/layout/Layout'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  }),
}

const materials = [
  { icon: '🪵', name: 'Used Wooden Pallets', desc: 'Recovered from warehouses and logistics chains.' },
  { icon: '📦', name: 'Wooden Packing Crates', desc: 'Industrial crates given a second life.' },
  { icon: '🏭', name: 'Scrap Wood from Factories', desc: 'Manufacturing offcuts rescued from waste.' },
  { icon: '🏗️', name: 'Construction Wood Waste', desc: 'Site timber repurposed with purpose.' },
  { icon: '🪑', name: 'Old Furniture Wood', desc: 'Discarded furniture transformed into value.' },
  { icon: '🗂️', name: 'Plywood & Board Scraps', desc: 'Sheet material salvaged and reprocessed.' },
  { icon: '🌲', name: 'Hardwood & Softwood Leftovers', desc: 'Premium offcuts too good to waste.' },
  { icon: '🏚️', name: 'Warehouse Dismantled Wood', desc: 'Structural timber reclaimed and renewed.' },
]

const coreServices = [
  { icon: '♻️', title: 'Wood Collection & Recycling', desc: 'We collect and recycle wood waste from factories, warehouses, construction sites, and packaging industries — turning what others discard into what the world needs.' },
  { icon: '📦', title: 'Wood Trading', desc: 'Buy and sell quality recycled wood at competitive prices. Our marketplace connects suppliers and buyers across domestic and international markets.' },
  { icon: '🧠', title: 'Consultation', desc: 'Expert advice on sustainable wood sourcing, recycling strategy, and eco-friendly usage tailored to your business needs.' },
  { icon: '🚚', title: 'Delivery', desc: 'Reliable, on-time delivery of wood materials straight to your location — wherever you are.' },
]

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 py-20 text-center px-4"
      >
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-green-300 uppercase tracking-widest text-xs font-bold mb-3">
          What We Do
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl mb-4">
          Our Services
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-green-200 text-lg max-w-xl mx-auto">
          From collection to delivery — Eco Wood Industries handles every step of the wood recycling journey.
        </motion.p>
      </motion.div>

      {/* Core Services */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center mb-12">
          <p className="text-green-600 uppercase tracking-widest text-xs font-bold mb-2">Core Offerings</p>
          <h2 className="text-3xl font-extrabold text-gray-800">Everything You Need, Under One Roof</h2>
          <div className="w-12 h-1 bg-green-500 rounded mx-auto mt-4" />
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {coreServices.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i * 0.1}
              whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-2xl p-7 border-l-4 border-green-500 shadow-sm cursor-default transition-shadow"
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Materials We Collect */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12">
            <p className="text-amber-600 uppercase tracking-widest text-xs font-bold mb-2">Raw Materials</p>
            <h2 className="text-3xl font-extrabold text-gray-800">Materials We Collect</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              No wood is too worn, too broken, or too forgotten. If it's wood — <span className="font-semibold text-amber-700">we want it.</span>
            </p>
            <div className="w-12 h-1 bg-amber-400 rounded mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {materials.map((m, i) => (
              <motion.div
                key={m.name}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.08}
                whileHover={{ scale: 1.05, backgroundColor: '#fef3c7' }}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-amber-100 cursor-default transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{m.icon}</div>
                <p className="font-bold text-amber-900 text-sm mb-1">{m.name}</p>
                <p className="text-gray-400 text-xs">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="py-16 text-center px-4"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4">
          Have wood waste to recycle or looking to buy?
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Eco Wood Industries is ready to help. Let's turn your waste into value — together.
        </p>
        <a href="/how-it-works"
          className="inline-block bg-green-700 text-white px-10 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 shadow-lg">
          See How It Works →
        </a>
      </motion.section>
    </Layout>
  )
}
