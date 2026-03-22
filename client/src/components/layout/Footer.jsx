import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-200 pt-12 pb-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-white text-lg font-extrabold mb-3">🌿 Eco Wood Industries</h3>
          <p className="text-green-400 text-sm leading-relaxed">
            Turning Wood Waste into Global Value. Sustainable recycling for a greener tomorrow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link to="/buy-wood" className="hover:text-white transition-colors">Sell Scrap Wood</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-widest text-xs">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:9922887440" className="hover:text-white transition-colors">📞 9922887440</a>
            </li>
            <li>
              <a href="tel:7841867440" className="hover:text-white transition-colors">📞 7841867440</a>
            </li>
            <li>
              <a href="mailto:ecowoodindustries2025@gmail.com" className="hover:text-white transition-colors break-all">
                ✉️ ecowoodindustries2025@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.ecowoodindustries.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                🌐 www.ecowoodindustries.in
              </a>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-widest text-xs">Our Office</h4>
          <p className="text-sm leading-relaxed">
            Office No. 204, A Wing, Paraiso-1,<br />
            Moshi Alandi BRT Road,<br />
            Moshi - 412105
          </p>
          <p className="text-sm mt-3 text-green-400 font-medium">Ramdas Dadas</p>
          <p className="text-xs text-green-500">Founder & Owner</p>
        </div>

      </div>

      <div className="border-t border-green-700 mt-10 pt-5 text-center text-xs text-green-500">
        © 2026 Eco Wood Industries. All rights reserved. &nbsp;|&nbsp; Designed with 🌿 for a sustainable future.
      </div>
    </footer>
  )
}
