import { motion } from 'framer-motion'
import { Recycle, Globe, Leaf, Factory, Target, Eye, MapPin } from 'lucide-react'
import Layout from '../../components/layout/Layout'

const slogans = [
  'Turning Wood Waste into Global Value.',
  'Recycling Wood, Protecting Nature.',
  'Eco Wood – Sustainable Wood Solutions.',
]

const materialsCollected = [
  'Used wooden pallets',
  'Wooden packing crates',
  'Scrap wood from factories',
  'Construction wood waste',
  'Old furniture wood',
  'Plywood and board scraps',
  'Hardwood and softwood leftovers',
  'Warehouse dismantled wood',
]

const productsExported = [
  'Recycled wooden pallets',
  'Wooden packaging boxes',
  'Industrial wooden crates',
  'Recycled wood planks',
  'Processed wood boards',
  'Biomass wood chips',
  'Sawdust briquettes',
  'Wood pellets (fuel)',
  'Custom recycled wood products',
]

const iconMap = {
  recycle: Recycle,
  globe: Globe,
  leaf: Leaf,
  factory: Factory,
}

const profileHighlights = [
  { icon: 'recycle', title: 'Recycling', desc: 'Upcycling waste into premium resources' },
  { icon: 'globe', title: 'Global Export', desc: 'Sourcing goods for world logistics' },
  { icon: 'leaf', title: 'Sustainability', desc: 'Lowering logging and logging waste' },
  { icon: 'factory', title: 'Industrial Scale', desc: 'Advanced timber fiber processing' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

export default function About() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative bg-gradient-to-br from-emerald-100/70 via-[#f4f2ec]/85 to-amber-100/70 py-24 rounded-3xl text-center border border-emerald-600/20 shadow-md overflow-hidden mb-16 backdrop-blur-md"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-emerald-800 uppercase tracking-widest text-xs font-bold mb-3"
          >
            Who We Are
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-6xl font-extrabold text-zinc-950 mb-6 font-display drop-shadow-sm"
          >
            About <span className="bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">Eco Wood Industries</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex flex-wrap justify-center gap-3.5 max-w-4xl mx-auto px-4"
          >
            {slogans.map((s) => (
              <motion.span
                key={s}
                whileHover={{ scale: 1.05, borderColor: 'rgba(16,185,129,0.3)', backgroundColor: 'rgba(255,255,255,0.9)' }}
                className="bg-white/80 border border-emerald-600/10 text-emerald-800 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold backdrop-blur-md cursor-default transition-all duration-300 shadow-sm"
              >
                "{s}"
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Company Profile Section */}
        <section className="py-12 mb-16">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="lg:col-span-7 space-y-6"
            >
              <p className="text-emerald-700 uppercase tracking-widest text-xs font-bold">Company Profile</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 font-display leading-tight">
                Transforming Waste Wood into Global Value
              </h2>
              <div className="w-16 h-1 bg-emerald-600 rounded" />
              <p className="text-zinc-655 leading-relaxed">
                Eco Wood Industries is an environmentally responsible organization focused on collecting, recycling, and processing discarded wood into high-value, eco-friendly assets. Our mission is to alleviate logging stress while supplying premium recycled wood products directly to industries and export channels.
              </p>
              <p className="text-zinc-655 leading-relaxed">
                We reclaim various wood waste streams from production facilities, commercial warehouses, construction operations, and packing plants. This recovered feedstock is processed and upcycled into durable pallets, heavy-duty shipping crates, biomass energy chips, and high-density heating briquettes.
              </p>
              <p className="text-zinc-655 leading-relaxed">
                By bridging the gap between waste generation and material reuse, we catalyze circular resource flow. Eco Wood Industries is your trusted supplier of certified sustainable lumber products for both domestic and global distribution.
              </p>
            </motion.div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {profileHighlights.map((item, i) => {
                const IconComponent = iconMap[item.icon]
                return (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i * 0.15}
                    whileHover={{ y: -6, borderColor: 'rgba(4,120,87,0.3)', boxShadow: '0 12px 25px rgba(2,44,34,0.06)' }}
                    className="glass-card border border-emerald-600/10 rounded-2xl p-5 text-center cursor-default transition-all duration-300 flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 bg-emerald-50 border border-emerald-600/5 rounded-2xl flex items-center justify-center text-emerald-700 mb-3">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-zinc-950 text-sm font-display">{item.title}</p>
                    <p className="text-zinc-500 text-[11px] mt-1.5 leading-relaxed font-medium">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Mission & Vision Sections */}
        <section className="py-12 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              whileHover={{ y: -4 }}
              className="glass-card rounded-3xl border-l-4 border-l-emerald-650 p-8 shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-emerald-750" />
                <h3 className="text-2xl font-extrabold text-zinc-950 font-display">Our Mission</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Eliminate clean wood landfill deposits by offering reliable recycling services.',
                  'Supply certified sustainable, custom-sized wood goods at industrial scale.',
                  'Champion green commercial practices that save forests and energy.',
                  'Facilitate reliable international trade in eco-conscious packaging.',
                ].map((m, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2.5 text-zinc-650 text-sm leading-relaxed"
                  >
                    <span className="text-emerald-700 mt-1 font-bold">✓</span>
                    <span>{m}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              whileHover={{ y: -4 }}
              className="bg-emerald-50 border border-emerald-600/15 rounded-3xl p-8 shadow-md transition-all duration-300 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-emerald-750" />
                <h3 className="text-2xl font-extrabold text-zinc-950 font-display">Our Vision</h3>
              </div>
              <p className="text-emerald-900 leading-relaxed text-lg font-medium">
                To stand as a leading, globally recognized wood fiber recycling and logistics enterprise, building circular supply systems that make sustainability an industry standard worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Materials Collected Section */}
        <section className="py-12 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-emerald-700 uppercase tracking-widest text-xs font-bold mb-2">Wood Collection & Recycling</p>
            <h2 className="text-3xl font-extrabold text-zinc-950 font-display">Materials We Reclaim</h2>
            <div className="w-12 h-1 bg-emerald-600 rounded mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {materialsCollected.map((m, i) => (
              <motion.div
                key={m}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.05}
                whileHover={{ scale: 1.03, borderColor: 'rgba(217,119,6,0.3)', backgroundColor: 'rgba(217,119,6,0.03)' }}
                className="bg-white border border-emerald-600/10 rounded-2xl px-5 py-4 text-center text-sm font-semibold text-zinc-705 cursor-default transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                <span>{m}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Products We Export Section */}
        <section className="py-16 rounded-3xl bg-[#f4f2ec] border border-emerald-600/10 shadow-md overflow-hidden mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent pointer-events-none" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12 px-6"
          >
            <p className="text-[#a16207] uppercase tracking-widest text-xs font-bold mb-2">Export Products</p>
            <h2 className="text-3xl font-extrabold text-zinc-950 font-display">Products We Distribute</h2>
            <p className="text-zinc-650 mt-2 text-sm font-semibold">Durable, circular, and certified packaging solutions for logistics.</p>
            <div className="w-12 h-1 bg-[#a16207] rounded mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto px-6 relative z-10">
            {productsExported.map((p, i) => (
              <motion.div
                key={p}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.05}
                whileHover={{ scale: 1.03, borderColor: 'rgba(16,185,129,0.3)', backgroundColor: 'rgba(255,255,255,0.7)' }}
                className="bg-white/80 border border-emerald-600/10 rounded-2xl px-5 py-4 text-center text-sm font-bold text-emerald-805 cursor-default transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>{p}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Location Section */}
        <section className="py-12 mb-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <p className="text-emerald-700 uppercase tracking-widest text-xs font-bold mb-2">Find Us</p>
              <h2 className="text-3xl font-extrabold text-zinc-950 font-display">Our Primary Facility</h2>
              <div className="w-12 h-1 bg-emerald-600 rounded mx-auto mt-4 mb-4" />
              <p className="text-zinc-650 text-sm font-semibold">
                Office No. 204, A Wing, Paraiso-1, Moshi Alandi BRT Road, Moshi – 412105
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-md border border-emerald-600/10"
            >
              <a
                href="https://www.google.com/maps/search/?api=1&query=Office+No+204+A+Wing+Paraiso+1+Moshi+Alandi+BRT+Road+Moshi+Maharashtra+412105"
                target="_blank"
                rel="noreferrer"
                className="block group"
              >
                <iframe
                  title="Eco Wood Industries Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.123456789!2d73.8567!3d18.6820!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQwJzU1LjIiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin&q=Office+No+204+A+Wing+Paraiso+1+Moshi+Alandi+BRT+Road+Moshi+412105"
                  width="100%"
                  height="450"
                  style={{
                    border: 0,
                    pointerEvents: 'none',
                    filter: 'hue-rotate(90deg) brightness(95%) contrast(85%)',
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 bg-white rounded-3xl border border-emerald-600/10 p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 border border-emerald-600/10 rounded-2xl p-4 text-emerald-700 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-extrabold text-zinc-950 text-lg font-display">Eco Wood Industries Headquarters</p>
                  <p className="text-zinc-650 text-sm mt-1 leading-relaxed font-semibold">
                    Office No. 204, A Wing, Paraiso-1,<br />
                    Moshi Alandi BRT Road, Moshi – 412105
                  </p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Office+No+204+A+Wing+Paraiso+1+Moshi+Alandi+BRT+Road+Moshi+Maharashtra+412105"
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-md"
              >
                Open in Google Maps →
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
