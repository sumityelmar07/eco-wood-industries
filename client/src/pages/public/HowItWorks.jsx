import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FileText, Phone, Truck, CreditCard, Layers, Search, Settings, Globe, Leaf } from 'lucide-react'
import Layout from '../../components/layout/Layout'

const iconMap = {
  fileText: FileText,
  phone: Phone,
  truck: Truck,
  card: CreditCard,
  layers: Layers,
  search: Search,
  settings: Settings,
  globe: Globe,
}

const sellSteps = [
  { icon: 'fileText', title: 'Submit Details', desc: 'Fill out our online contact form with wood quantities, photos, and pick-up area. Takes less than 2 minutes.' },
  { icon: 'phone', title: 'We Contact You', desc: 'Our evaluation desk reviews photos and calls you within 24 hours to present a competitive payout quote.' },
  { icon: 'truck', title: 'Schedule Transport', desc: '1 ton or more? We coordinate free truck pick-up. Below 1 ton? Drop it off directly at our Moshi sorting yard.' },
  { icon: 'card', title: 'Instant Settlement', desc: 'Once cargo is unloaded and verified at our yard scale, payment is processed instantly via bank transfer.' },
]

const processSteps = [
  { icon: 'layers', title: 'Sorting & Grading', desc: 'Raw reclaimed lumber is graded by quality, density, and size for processing lines.' },
  { icon: 'search', title: 'Metal Extraction', desc: 'Feedstock is scanned via industrial separators to extract nails, plates, and fasteners.' },
  { icon: 'settings', title: 'Fabrication', desc: 'Clean timber fibers are re-milled, heat-treated (ISPM-15), and built into pallets and custom crates.' },
  { icon: 'globe', title: 'Global Delivery', desc: 'Upcycled products are dispatched, reducing harvesting logs and closing material loops.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: (i) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { delay: i * 0.18, duration: 0.6, ease: 'easeOut' } 
  }),
}

function StepCard({ icon, title, desc, index, color }) {
  const IconComponent = iconMap[icon] || FileText
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      whileHover={{ y: -8, borderColor: 'rgba(4,120,87,0.3)', boxShadow: '0 25px 50px rgba(2,44,34,0.08)' }}
      className={`glass-card relative flex flex-col items-center text-center p-8 rounded-3xl border border-emerald-600/10 shadow-sm transition-all duration-500 z-10 group ${color}`}
    >
      {/* Dynamic Internal Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

      <div className="w-16 h-16 bg-emerald-50 border border-emerald-600/5 rounded-2xl flex items-center justify-center text-emerald-700 mb-4 transform group-hover:scale-110 transition-transform duration-500 relative z-10">
        <IconComponent className="w-7 h-7" />
      </div>
      
      {/* Centered Large Opaque Badge to Block the Connector Line */}
      <div 
        style={{ top: '-24px' }}
        className="absolute left-1/2 -translate-x-1/2 bg-white border-2 border-emerald-600 text-emerald-800 font-black text-base w-12 h-12 rounded-full flex items-center justify-center shadow-md font-display z-30 group-hover:bg-emerald-50 transition-colors"
      >
        {index + 1}
      </div>
      
      <h3 className="text-lg font-bold text-zinc-950 mb-2 font-display relative z-10">{title}</h3>
      <p className="text-zinc-655 text-xs leading-relaxed font-semibold relative z-10">{desc}</p>
    </motion.div>
  )
}

export default function HowItWorks() {
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-800 uppercase tracking-widest text-xs font-bold mb-3"
          >
            Transparent Framework
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-extrabold text-zinc-950 mb-6 font-display drop-shadow-sm"
          >
            How It <span className="bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">Works</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-zinc-650 max-w-xl mx-auto text-sm md:text-base px-4 leading-relaxed font-semibold"
          >
            From scrap timber at your warehouse floor to finished products shipped globally — here is our complete processing lifecycle.
          </motion.p>
        </motion.div>

        {/* Sell Your Scrap Section */}
        <section className="py-12 mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 px-6"
          >
            <span className="inline-block bg-emerald-50 border border-emerald-600/10 text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">For Sellers</span>
            <h2 className="text-3xl font-extrabold text-zinc-950 font-display">How to Sell Your Wood Waste</h2>
            <div className="w-12 h-1 bg-emerald-600 rounded mx-auto mt-4" />
          </motion.div>

          {/* Connected Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {/* Flow Connector Line with Laser Dot - Explicitly z-0 */}
            <div className="absolute top-[18px] left-[12%] right-[12%] h-[2px] bg-emerald-600/15 hidden lg:block pointer-events-none z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 relative"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              >
                <motion.div
                  className="absolute w-3.5 h-3.5 bg-amber-500 rounded-full -top-[6px] shadow-[0_0_12px_#f59e0b] border-2 border-white"
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>

            {sellSteps.map((s, i) => (
              <StepCard key={i} {...s} index={i} color="bg-white/85" />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/buy-wood"
              className="inline-flex items-center bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 hover:shadow-md"
            >
              <span>Sell Your Scrap Wood</span>
            </Link>
          </motion.div>
        </section>

        {/* Separator */}
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="border-t border-emerald-600/10" />
        </div>

        {/* Our Process Section */}
        <section className="py-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 px-6"
          >
            <span className="inline-block bg-amber-50 border border-amber-600/15 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">Our Operations</span>
            <h2 className="text-3xl font-extrabold text-zinc-950 font-display">Recycling & Upcycling Flow</h2>
            <p className="text-zinc-655 mt-2 text-sm max-w-xl mx-auto font-semibold">Reclaimed logs go through rigid cleaning and fabrication before export dispatch.</p>
            <div className="w-12 h-1 bg-amber-600 rounded mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {/* Flow Connector Line with Laser Dot - Explicitly z-0 */}
            <div className="absolute top-[18px] left-[12%] right-[12%] h-[2px] bg-amber-600/20 hidden lg:block pointer-events-none z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-600 relative"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              >
                <motion.div
                  className="absolute w-3.5 h-3.5 bg-emerald-500 rounded-full -top-[6px] shadow-[0_0_12px_#10b981] border-2 border-white"
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>

            {processSteps.map((s, i) => (
              <StepCard key={i} {...s} index={i} color="bg-white/85" />
            ))}
          </div>
        </section>

        {/* Dynamic Impact Banner */}
        <section className="py-16 rounded-3xl bg-[#f4f2ec] border border-emerald-600/10 shadow-sm relative overflow-hidden mb-8 text-center px-6">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-transparent to-amber-600/5 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-emerald-700 text-xs uppercase tracking-widest font-bold mb-3">Environmental Stewardship</p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-950 mb-4 font-display leading-tight flex items-center justify-center gap-2">
              <Leaf className="w-6 h-6 text-emerald-750 animate-bounce" />
              <span>Every Ton of Reclaimed Lumber Saves 12 to 15 Trees</span>
            </h2>
            <p className="text-zinc-600 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-semibold">
              By collecting and fabricating waste pallets instead of landfill burying, we capture carbon reserves and prevent logging operations.
            </p>
            <Link
              to="/buy-wood"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 hover:shadow-md"
            >
              <span>Get Started Selling</span>
            </Link>
          </motion.div>
        </section>
      </div>
    </Layout>
  )
}
