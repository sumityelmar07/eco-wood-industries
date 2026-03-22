import { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-green-800 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">🌿 Eco Wood Industry</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className="hover:text-green-300 transition-colors">{l.label}</Link>
          ))}
          <Link to="/buy-wood" className="bg-green-500 hover:bg-green-400 text-white px-4 py-1.5 rounded-lg font-semibold transition-colors">
            🪵 Sell Scrap Wood
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden mt-4 flex flex-col gap-3 pb-2">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className="hover:text-green-300 transition-colors py-1 border-b border-green-700">
              {l.label}
            </Link>
          ))}
          <Link to="/buy-wood" onClick={() => setOpen(false)}
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg font-semibold text-center transition-colors mt-1">
            🪵 Sell Scrap Wood
          </Link>
        </nav>
      )}
    </header>
  )
}
