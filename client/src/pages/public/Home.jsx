import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/layout/Layout'

const taglines = [
  'Turning Wood Waste into Global Value.',
  'Recycling Wood, Protecting Nature.',
  'Eco Wood – Sustainable Wood Solutions.',
  'Turning Wood Waste into Global Value.',
  'Recycling Wood, Protecting Nature.',
  'Eco Wood – Sustainable Wood Solutions.',
  'Turning Wood Waste into Global Value.',
  'Recycling Wood, Protecting Nature.',
]

const images = [
  '/images/wood1.jpeg',
  '/images/wood2.jpeg',
  '/images/wood3.jpeg',
  '/images/wood4.jpeg',
  '/images/wood5.jpeg',
  '/images/wood6.jpeg',
  '/images/wood7.jpeg',
  '/images/wood8.jpeg',
]

const stats = [
  { label: 'Wood Recycled', target: 50000, suffix: ' Tons' },
  { label: 'Clients Served', target: 200, suffix: '+' },
  { label: 'Years Experience', target: 5, suffix: '+' },
  { label: 'Trees Saved', target: 2000, suffix: '+' },
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

function StatCard({ label, target, suffix }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const count = useCountUp(target, 2000, started)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="bg-white shadow-lg rounded-xl p-6">
      <p className="text-3xl font-bold text-green-700">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-gray-500 mt-1">{label}</p>
    </div>
  )
}

function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[520px] overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${src})`, opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl tracking-tight">
          Welcome to Eco Wood Industry
        </h1>
        <p className="text-xl md:text-2xl font-medium text-green-300 mb-4 tracking-wide drop-shadow-lg">
          {taglines[current]}
        </p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <svg width="120" height="12" viewBox="0 0 120 12" fill="none">
            <path d="M2 9 C20 3, 40 11, 60 6 S100 2, 118 7" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-90" />
          <svg width="120" height="12" viewBox="0 0 120 12" fill="none">
            <path d="M2 7 C20 2, 40 10, 60 5 S100 1, 118 9" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/services" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors duration-300">
            Explore Services
          </Link>
          <Link to="/buy-wood" className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 tracking-wide shadow-lg">
            🪵 Sell Scrap Wood
          </Link>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-white scale-125' : 'bg-white/50'}`}
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
      <HeroSlider />
      <section className="py-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center px-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>
      <div className="py-8 text-center">
        <p className="text-green-800 text-lg md:text-xl font-bold tracking-wide animate-pulse">
          🌳 1 Ton Recycled Wood saves 12 to 15 Trees 🌳
        </p>
      </div>

      {/* Environmental Impact */}
      <section className="py-16 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-green-600 uppercase tracking-widest text-xs font-bold mb-2">Our Promise to the Planet</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Every Piece of Wood We Recycle <span className="text-green-600">Matters</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            At <span className="font-semibold text-green-700">Eco Wood Industries</span>, we believe every discarded plank, every broken pallet, every scrap of wood tells a story — and we give it a second life. Here's what that means for our planet.
          </p>
          <div className="w-12 h-1 bg-green-500 rounded mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: '🌳',
              title: 'Forests Still Standing',
              desc: 'Every ton recycled by Eco Wood Industries means trees that never had to be cut. We are fighting deforestation, one pallet at a time.',
            },
            {
              icon: '♻️',
              title: 'Less Waste, More Life',
              desc: 'Wood that once rotted in landfills now becomes products with purpose. Eco Wood Industries turns endings into new beginnings.',
            },
            {
              icon: '🌍',
              title: 'A Cooler Planet',
              desc: 'By reducing logging and processing, Eco Wood Industries helps lower CO₂ emissions — because the Earth deserves better.',
            },
            {
              icon: '🔋',
              title: 'Energy Saved, Future Secured',
              desc: 'Recycled wood demands far less energy than new production. At Eco Wood Industries, saving energy today means a brighter tomorrow.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-green-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-base font-bold text-green-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-green-700 font-semibold mt-10 text-base italic">
          "When Eco Wood Industries recycles wood — nature breathes a little easier." 🌿
        </p>
      </section>
    </Layout>
  )
}






