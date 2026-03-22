import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-green-800 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">🌿 Eco Wood Industry</Link>
      <nav className="flex gap-6">
        <Link to="/" className="hover:text-green-300">Home</Link>
        <Link to="/about" className="hover:text-green-300">About</Link>
        <Link to="/services" className="hover:text-green-300">Services</Link>
        <Link to="/how-it-works" className="hover:text-green-300">How It Works</Link>
        <Link to="/buy-wood" className="bg-green-500 hover:bg-green-400 text-white px-4 py-1.5 rounded-lg font-semibold transition-colors">🪵 Sell Scrap Wood</Link>
      </nav>
    </header>
  )
}
