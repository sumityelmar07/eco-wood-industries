import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Layout from '../../components/layout/Layout'

const sellSteps = [
  { icon: '📋', title: 'Submit Your Request', desc: 'Fill out the form with your details, location, and photos of your scrap wood. Takes less than 2 minutes.' },
  { icon: '📞', title: 'We Contact You', desc: 'Our team reviews your submission and calls you within 24 hours with a fair price quote.' },
  { icon: '🚛', title: 'Pickup or Drop-off', desc: '1 tonne or more? We come to you. Below 1 tonne? Drop it at our Moshi facility — simple and hassle-free.' },
  { icon: '💰', title: 'Get Paid', desc: 'Once the wood is received and verified, payment is processed immediately. No delays.' },
]

const processSteps = [
  { icon: '🪵', title: 'Collection', desc: 'Scrap wood is collected from sellers across Pune and nearby regions.' },
  { icon: '🔍', title: 'Sorting & Grading', desc: 'Wood is sorted by type, quality, and size for optimal processing.' },
  { icon: '⚙️', title: 'Processing', desc: 'Wood is cleaned, cut, and prepared into export-ready products like pallets and packaging material.' },
  { icon: '🌍', title: 'Export', desc: 'Finished products are exported globally, giving scrap wood a second life and saving trees.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
}

function StepCard({ icon, title, desc, index, color }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className={`relative flex flex-col items-center text-center p-6 rounded-2xl border ${color} shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white border-2 border-green-600 text-green-700 font-extrabold text-xs w-8 h-8 rounded-full flex items-center justify-center shadow">
        {index + 1}
      </div>
      <h3 className="text-base font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 py-16 text-center px-4">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-green-300 uppercase tracking-widest text-xs font-bold mb-3">Simple & Transparent</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-3">
          How It Works
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-green-200 max-w-lg mx-auto text-sm">
          From scrap wood at your doorstep to export-ready products — here's exactly how Eco Wood Industries operates.
        </motion.p>
      </div>

      {/* Sell Your Scrap */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-3">For Sellers</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">How to Sell Your Scrap Wood</h2>
          <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">4 easy steps to turn your waste wood into cash.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sellSteps.map((s, i) => (
            <StepCard key={i} {...s} index={i} color="bg-green-50 border-green-100" />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }} className="text-center mt-10">
          <Link to="/buy-wood"
            className="inline-block bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-lg">
            Sell Your Scrap Wood 🪵
          </Link>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-gray-100" />
      </div>

      {/* Our Process */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-3">Our Process</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">What Happens to Your Wood</h2>
          <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">Every piece of scrap wood goes through a careful process before reaching global markets.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((s, i) => (
            <StepCard key={i} {...s} index={i} color="bg-amber-50 border-amber-100" />
          ))}
        </div>
      </section>

      {/* Impact Banner */}
      <section className="bg-green-800 py-12 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-green-300 text-xs uppercase tracking-widest font-bold mb-2">Environmental Impact</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Every Tonne of Scrap Wood Saves 12–15 Trees 🌳</h2>
          <p className="text-green-200 text-sm max-w-lg mx-auto mb-6">
            By recycling scrap wood instead of burning or dumping it, we reduce deforestation and carbon emissions — one pickup at a time.
          </p>
          <Link to="/buy-wood"
            className="inline-block bg-white text-green-800 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors shadow">
            Start Selling Today
          </Link>
        </motion.div>
      </section>
    </Layout>
  )
}
