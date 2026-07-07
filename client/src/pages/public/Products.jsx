import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

// Slideshow images
const slideshowImages = [
  { src: '/images/Product%20images/Inner%20Pakaging.png', title: 'Inner Packaging', desc: 'Extra Protection for Inner Safety' },
  { src: '/images/Product%20images/Outer%20Pakaging.png', title: 'Outer Packaging', desc: 'Strong & Durable Protection' },
  { src: '/images/Product%20images/VCI%20bags.png', title: 'VCI Bags', desc: 'Protects from Rust & Corrosion' },
  { src: '/images/Product%20images/Stretch%20Film.png', title: 'Stretch Films', desc: 'High Cling & Load Stability' },
  { src: '/images/Product%20images/AIR%20bubble%20roles.png', title: 'Air Bubble Rolls', desc: 'Shock & Impact Absorption' },
  { src: '/images/Product%20images/Woodden%20Box%20Pakaging.png', title: 'Wooden Box Packing', desc: 'Strong & Durable Wooden Boxes' },
  { src: '/images/Product%20images/Recycle%20wood%20Boards.png', title: 'Recycled Wooden Boards', desc: 'Sustainably Manufactured' },
  { src: '/images/Product%20images/Pet%20Strapping.png', title: 'PET Strapping', desc: 'High Tensile Strength' },
  { src: '/images/Product%20images/EDGE%20Protector.png', title: 'Edge Protectors', desc: 'Protects Edges & Corners' },
  { src: '/images/Product%20images/Silica%20gel.png', title: 'Silica Gel', desc: 'Absorbs Moisture Effectively' },
]

function ProductSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideshowImages.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="pb-16 px-6 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-green-300 uppercase tracking-widest text-xs font-bold mb-2">
            Featured Products
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Quality Packaging Solutions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Slideshow container */}
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-50">
          {slideshowImages.map((slide, index) => (
            <motion.div
              key={slide.src}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === current ? 1 : 0,
              }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm"
            >
              {/* Full product image */}
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-contain p-6"
              />

              {/* Gradient overlay only at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Content */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: index === current ? 0 : 20,
                  opacity: index === current ? 1 : 0,
                }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">
                  {slide.title}
                </h3>
                <p className="text-green-200 text-sm md:text-base font-medium mt-1">
                  {slide.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}

          {/* Navigation dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === current
                    ? 'bg-white w-8 h-2'
                    : 'bg-white/50 w-2 h-2 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Previous/Next buttons */}
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slideshowImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Stats below slideshow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {[
            { number: '20+', label: 'Products' },
            { number: '100%', label: 'Quality' },
            { number: '24/7', label: 'Support' },
            { number: '1000+', label: 'Happy Clients' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 text-center shadow-md border border-green-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-3xl font-extrabold text-green-700">{stat.number}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// All products organized by category
const productCategories = [
  {
    title: 'Inner Protection',
    color: 'from-green-600 to-emerald-600',
    products: [
      {
        name: 'Inner Packaging',
        image: '/images/Product%20images/Inner Pakaging.png',
        features: [
          { icon: '🛡️', text: 'Extra Protection for Inner Safety' },
          { icon: '📦', text: 'Prevents Damage During Transit' },
          { icon: '💪', text: 'Strong & Durable Packaging' },
        ],
      },
      {
        name: 'VCI Bags',
        image: '/images/Product%20images/VCI bags.png',
        features: [
          { icon: '🛡️', text: 'Protects from Rust & Corrosion' },
          { icon: '⏳', text: 'Extends Product Shelf Life' },
          { icon: '♻️', text: 'Safe, Non-Toxic & Recyclable' },
        ],
      },
      {
        name: 'Silica Gel',
        image: '/images/Product%20images/Silica gel.png',
        features: [
          { icon: '💧', text: 'Absorbs Moisture Effectively' },
          { icon: '🌿', text: 'Keeps Products Dry & Fresh' },
          { icon: '🚫', text: 'Prevents Mold & Mildew' },
        ],
      },
      {
        name: 'PE Foam',
        image: '/images/Product%20images/PE form.png',
        features: [
          { icon: '🌊', text: 'Shock Absorption & Cushioning' },
          { icon: '🛡️', text: 'Protects from Scratches & Impact' },
          { icon: '🪶', text: 'Lightweight & Reusable' },
        ],
      },
      {
        name: 'Air Pads',
        image: '/images/Product%20images/AIR Pads.png',
        features: [
          { icon: '🎈', text: 'Excellent Cushioning & Protection' },
          { icon: '📉', text: 'Reduces Damage in Shipping' },
          { icon: '🪶', text: 'Lightweight & Space Saving' },
        ],
      },
    ],
  },
  {
    title: 'Outer Protection',
    color: 'from-emerald-600 to-green-700',
    products: [
      {
        name: 'Outer Packaging',
        image: '/images/Product%20images/Outer Pakaging.png',
        features: [
          { icon: '💪', text: 'Strong & Durable Protection' },
          { icon: '🔒', text: 'Secures Products from Damage' },
          { icon: '♻️', text: 'Eco-Friendly & Recyclable' },
        ],
      },
      {
        name: 'Stretch Films',
        image: '/images/Product%20images/Stretch Film.png',
        features: [
          { icon: '🔗', text: 'High Cling & Load Stability' },
          { icon: '🔒', text: 'Keeps Items Safe & Secure' },
          { icon: '💨', text: 'Dust & Moisture Resistant' },
        ],
      },
      {
        name: 'Air Bubble Rolls',
        image: '/images/Product%20images/AIR bubble roles.png',
        features: [
          { icon: '💥', text: 'Shock & Impact Absorption' },
          { icon: '🛡️', text: 'Protects Fragile Items' },
          { icon: '🪶', text: 'Lightweight & Recyclable' },
        ],
      },
      {
        name: 'PET Strapping',
        image: '/images/Product%20images/Pet Strapping.png',
        features: [
          { icon: '💪', text: 'High Tensile Strength' },
          { icon: '📦', text: 'Secures Heavy Shipments' },
          { icon: '🌱', text: 'Eco-Friendly Solution' },
        ],
      },
      {
        name: 'Edge Protectors',
        image: '/images/Product%20images/EDGE Protector.png',
        features: [
          { icon: '🛡️', text: 'Protects Edges & Corners' },
          { icon: '📦', text: 'Prevents Damage & Scratches' },
          { icon: '♻️', text: '100% Recyclable & Reusable' },
        ],
      },
    ],
  },
  {
    title: 'Heavy-Duty Solutions',
    color: 'from-green-700 to-teal-700',
    products: [
      {
        name: 'Wooden Box Packing',
        image: '/images/Product%20images/Woodden Box Pakaging.png',
        features: [
          { icon: '💪', text: 'Strong & Durable Wooden Boxes' },
          { icon: '🛡️', text: 'Protects Against Impact, Moisture & External Damage' },
          { icon: '🌍', text: 'Ideal for International Shipments' },
        ],
      },
      {
        name: 'Vacuum Packaging',
        image: '/images/Product%20images/Vaccume Pakagging .png',
        features: [
          { icon: '💧', text: 'Protects Against Moisture, Dust & Corrosion' },
          { icon: '🔒', text: 'Keeps Products Safe & Secure' },
          { icon: '⏳', text: 'Extends Product Shelf Life' },
        ],
      },
      {
        name: 'Sea Worthy Packaging',
        image: '/images/Product%20images/Sea worthly pakaging.png',
        features: [
          { icon: '🌊', text: 'Built to Withstand Sea Transport & Harsh Conditions' },
          { icon: '🛡️', text: 'Corrosion & Impact Resistant' },
          { icon: '📦', text: 'Secure Packaging for Global Deliveries' },
        ],
      },
      {
        name: 'On-Site Packing Services',
        image: '/images/Product%20images/On Site pakaging.png',
        features: [
          { icon: '👷', text: 'Professional On-site Packing at Your Location' },
          { icon: '✅', text: 'Ensures Maximum Safety During Handling' },
          { icon: '🎯', text: 'Customized Packing Solutions' },
        ],
      },
    ],
  },
  {
    title: 'Premium Wooden & Pallet Solutions',
    color: 'from-teal-700 to-green-800',
    products: [
      {
        name: 'Heavy Duty Wooden Boxes',
        image: '/images/Product%20images/Heavy%20duty%20wooden%20boxes.png',
        features: [
          { icon: '🔨', text: 'Extra Strong Construction for Heavy & Oversized Goods' },
          { icon: '💪', text: 'Reinforced Design Ensures Superior Load-Bearing Capacity' },
          { icon: '🏭', text: 'Ideal for Industrial, Automotive & Engineering Exports' },
          { icon: '📐', text: 'Custom Sizes & Specifications Available' },
        ],
      },
      {
        name: 'ISPM-15 Pine Wood Boxes',
        image: '/images/Product%20images/ISPM%2015.png',
        features: [
          { icon: '🌲', text: 'ISPM-15 Heat Treated & Certified' },
          { icon: '✅', text: 'Protects from Pests, Fungus & Contamination' },
          { icon: '🌍', text: 'Compliant with International Shipping Regulations' },
          { icon: '🔒', text: 'Trusted Choice for Safe Global Exports' },
        ],
      },
      {
        name: 'Plywood Boxes',
        image: '/images/Product%20images/PlY%20wood%20boxes.png',
        features: [
          { icon: '🌳', text: 'Made from High-Quality Plywood' },
          { icon: '💧', text: 'Moisture Resistant for Extra Protection' },
          { icon: '🪶', text: 'Lightweight Yet Strong & Durable' },
          { icon: '✈️', text: 'Perfect for Air Freight & Sea Shipment' },
        ],
      },
      {
        name: 'Euro Pallets',
        image: '/images/Product%20images/Ero%20pallets.png',
        features: [
          { icon: '🌍', text: 'Manufactured to International EPAL Standards' },
          { icon: '🔄', text: '4-Way Entry for Easy Handling' },
          { icon: '💪', text: 'Strong, Stable & Long-Lasting Performance' },
          { icon: '📦', text: 'Ideal for Global Supply Chain & Logistics' },
        ],
      },
      {
        name: 'Recycled Wooden Boards',
        image: '/images/Product%20images/Recycle wood Boards.png',
        features: [
          { icon: '♻️', text: 'Sustainably Manufactured from Reclaimed Structural Timber' },
          { icon: '📏', text: 'Standard & Custom Sizes, Versatile Application' },
          { icon: '💪', text: 'High Stability for Construction & Furniture' },
          { icon: '🌱', text: 'Eco-Friendly & Export Ready Products' },
        ],
      },
      {
        name: 'Wooden Packing Crates',
        image: '/images/Product%20images/Woodden Paking creates.png',
        features: [
          { icon: '📦', text: 'ISPM-15 Compliant, Secure & Stackable' },
          { icon: '🛡️', text: 'Designed for Maximum Protection, Security & Storage' },
          { icon: '♻️', text: 'Sustainable Materials for Eco-Friendly Shipping' },
          { icon: '🌍', text: 'Environment Friendly & Export Ready' },
        ],
      },
      {
        name: 'Recycled Wooden Planks',
        image: '/images/Product%20images/Recycle%20woodden%20planks.png',
        features: [
          { icon: '🌲', text: 'Sustainably Sourced from Premium Reclaimed Lumber' },
          { icon: '✅', text: 'ISPM-15 Compliant, Secure & Stackable' },
          { icon: '♻️', text: 'Reuse Again. Conserve Again. Build Again.' },
          { icon: '🏗️', text: 'Better Materials. Better Construction. Better Business.' },
        ],
      },
    ],
  },
]

function ProductCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      custom={index * 0.1}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-green-100 hover:border-green-400 transition-all duration-500 group relative"
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-500/20 to-transparent rounded-bl-full" />
      
      {/* Image container with overlay */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className="text-2xl font-bold text-green-900 mb-4 text-center"
          animate={{ color: isHovered ? '#15803d' : '#14532d' }}
        >
          {product.name}
        </motion.h3>

        {/* Features list */}
        <div className="space-y-3">
          {product.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 group/feature"
            >
              <motion.span
                className="text-2xl flex-shrink-0 mt-0.5"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {feature.icon}
              </motion.span>
              <p className="text-gray-700 text-sm leading-relaxed group-hover/feature:text-green-800 transition-colors">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className="h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
      />
    </motion.div>
  )
}

function CategorySection({ category, categoryIndex }) {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Category header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="text-center mb-16"
        >
          <motion.div
            className={`inline-block bg-gradient-to-r ${category.color} text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider mb-6 shadow-lg`}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
          >
            {category.title}
          </motion.div>
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.products.map((product, index) => (
            <ProductCard
              key={product.name}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Products() {
  return (
    <Layout>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 pt-24 pb-0 text-center px-4 overflow-hidden"
      >
        {/* Animated background shapes */}
        <motion.div
          className="absolute top-10 left-20 w-64 h-64 bg-green-500/30 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-80 h-80 bg-emerald-500/30 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-green-300 uppercase tracking-widest text-xs font-bold mb-4"
          >
            Complete Protection Solutions
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl mb-6"
          >
            OUR PACKAGING <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">PRODUCTS</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-green-400 to-green-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="h-0.5 w-32 bg-gradient-to-l from-transparent via-green-400 to-green-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-green-200 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light"
          >
            From inner cushioning to heavy-duty protection — discover our complete range of packaging solutions designed for every need.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white font-semibold"
          >
            <span className="text-2xl">🛡️</span>
            <span>SAFE PACKAGING. SECURE DELIVERY.</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Product Slideshow */}
      <ProductSlideshow />

      {/* Product Categories */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        {productCategories.map((category, index) => (
          <CategorySection
            key={category.title}
            category={category}
            categoryIndex={index}
          />
        ))}
      </div>


    </Layout>
  )
}
