import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import { Leaf } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/how-it-works', label: 'How It Works' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 rounded-2xl transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border border-emerald-600/15 py-3 shadow-[0_12px_40px_-6px_rgba(2,44,34,0.12)]'
          : 'bg-[#faf8f2]/70 backdrop-blur-md border border-emerald-600/10 py-4.5 shadow-sm'
      }`}
    >
      <div className="flex justify-between items-center px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/images/eco wood.png"
            alt="Eco Wood Logo"
            className="w-10 h-10 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-lg md:text-xl font-black tracking-tight font-display bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-700 bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
            Eco Wood Industry
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-2">
            {navLinks.map((l) => {
              const active = location.pathname === l.to
              return (
                <li key={l.to} className="relative py-2 px-4 flex items-center justify-center">
                  <Link
                    to={l.to}
                    className={`text-sm font-bold relative z-10 transition-colors duration-300 ${
                      active ? 'text-emerald-900' : 'text-zinc-650 hover:text-emerald-900'
                    }`}
                  >
                    {l.label}
                  </Link>
                  {active && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-600/10 rounded-xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </li>
              )
            })}
          </ul>
          <Link
            to="/buy-wood"
            className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 hover:from-emerald-750 hover:to-teal-650 text-white text-xs md:text-sm px-6 py-2.5 rounded-xl font-bold tracking-wide transition-all duration-300 hover:shadow-[0_4px_15px_rgba(6,78,59,0.2)] hover:-translate-y-0.5 active:translate-y-0"
          >
            Sell Scrap Wood
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl bg-white/60 border border-emerald-600/10 shadow-sm"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-zinc-700 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-zinc-700 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-zinc-700 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 mx-4 px-4 py-5 flex flex-col gap-4 bg-white/95 border border-emerald-600/15 rounded-xl backdrop-blur-xl shadow-xl overflow-hidden"
          >
            {navLinks.map((l) => {
              const active = location.pathname === l.to
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`text-base font-bold py-2 px-3 rounded-lg transition-colors ${
                    active ? 'text-emerald-850 bg-emerald-500/5' : 'text-zinc-650 hover:text-emerald-850 hover:bg-zinc-100'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
            <Link
              to="/buy-wood"
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-750 hover:to-teal-700 text-white py-3 rounded-xl font-bold text-center tracking-wide transition-all duration-300 shadow-md mt-2"
            >
              Sell Scrap Wood
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
