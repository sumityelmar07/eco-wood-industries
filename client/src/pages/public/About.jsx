import { motion } from 'framer-motion'
import Layout from '../../components/layout/Layout'

const slogans = [
  'Turning Wood Waste into Global Value.',
  'Recycling Wood, Protecting Nature.',
  'Eco Wood – Sustainable Wood Solutions.',
]

const materialsCollected = [
  'Used wooden pallets', 'Wooden packing crates', 'Scrap wood from factories',
  'Construction wood waste', 'Old furniture wood', 'Plywood and board scraps',
  'Hardwood and softwood leftovers', 'Warehouse dismantled wood',
]

const productsExported = [
  'Recycled wooden pallets', 'Wooden packaging boxes', 'Industrial wooden crates',
  'Recycled wood planks', 'Processed wood boards', 'Biomass wood chips',
  'Sawdust briquettes', 'Wood pellets (fuel)', 'Custom recycled wood products',
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

export default function About() {
  return (
    <Layout>
      {/* Hero Banner */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={fadeIn}
        className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 py-20 text-center px-4"
      >
        <motion.p variants={fadeUp} custom={0} className="text-green-300 uppercase tracking-widest text-sm font-semibold mb-3">Who We Are</motion.p>
        <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl">
          Eco Wood Industries
        </motion.h1>
        <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap">
          {slogans.map((s) => (
            <motion.span
              key={s}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
              className="bg-white/10 border border-white/20 text-green-200 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm cursor-default transition-colors"
            >
              "{s}"
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Company Profile */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-green-600 uppercase tracking-widest text-xs font-bold mb-2">Company Profile</p>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4 leading-snug">Transforming Waste Wood into Global Value</h2>
            <div className="w-12 h-1 bg-green-500 rounded mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Eco Wood Industries is an environmentally responsible company focused on collecting, recycling, and processing waste wood into valuable eco-friendly products. Our goal is to reduce wood waste while supplying high-quality recycled wood products to industries and export markets.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect different types of used wood materials from factories, warehouses, construction sites, and packaging industries. These materials are processed and converted into useful products such as wooden pallets, packaging crates, wood chips, and biomass fuel products.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Eco Wood Industries promotes sustainability, resource efficiency, and environmental protection by transforming discarded wood into reusable materials. We aim to become a trusted supplier of recycled wood products for domestic and international markets.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '♻️', title: 'Recycling', desc: 'Turning waste into value' },
              { icon: '🌍', title: 'Global Export', desc: 'Supplying international markets' },
              { icon: '🌱', title: 'Sustainability', desc: 'Protecting our environment' },
              { icon: '🏭', title: 'Processing', desc: 'Industrial-grade production' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.15}
                whileHover={{ scale: 1.06, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
                className="bg-green-50 border border-green-100 rounded-xl p-5 text-center cursor-default transition-shadow"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="font-bold text-green-800 text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-sm border-l-4 border-green-500 p-8 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎯</span>
              <h3 className="text-2xl font-extrabold text-gray-800">Our Mission</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Reduce wood waste and support recycling.',
                'Provide eco-friendly wood products.',
                'Promote sustainable industrial practices.',
                'Supply high-quality recycled wood products for export.',
              ].map((m, i) => (
                <motion.li
                  key={m}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-2 text-gray-600"
                >
                  <span className="text-green-500 mt-1 font-bold">✓</span> {m}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            whileHover={{ scale: 1.02 }}
            className="bg-green-800 rounded-2xl shadow-sm p-8 text-white hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🔭</span>
              <h3 className="text-2xl font-extrabold">Our Vision</h3>
            </div>
            <p className="text-green-100 leading-relaxed text-lg">
              To become a leading eco-friendly wood recycling and export company that contributes to global sustainability and environmental protection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Materials Collected */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
          <p className="text-green-600 uppercase tracking-widest text-xs font-bold mb-2">Wood Collection & Recycling</p>
          <h2 className="text-3xl font-extrabold text-gray-800">Materials We Collect</h2>
          <div className="w-12 h-1 bg-green-500 rounded mx-auto mt-4" />
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {materialsCollected.map((m, i) => (
            <motion.div
              key={m}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i * 0.08}
              whileHover={{ scale: 1.05, backgroundColor: '#fde68a' }}
              className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-center text-sm font-medium text-amber-900 cursor-default transition-colors"
            >
              🪵 {m}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products We Export */}
      <section className="bg-green-900 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-green-400 uppercase tracking-widest text-xs font-bold mb-2">Export Products</p>
            <h2 className="text-3xl font-extrabold text-white">Products We Sell</h2>
            <p className="text-green-300 mt-2">Durable, eco-friendly, and cost-effective for global markets.</p>
            <div className="w-12 h-1 bg-green-400 rounded mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {productsExported.map((p, i) => (
              <motion.div
                key={p}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.08}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.25)' }}
                className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-center text-sm font-medium text-green-100 cursor-default backdrop-blur-sm transition-colors"
              >
                📦 {p}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
