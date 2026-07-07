import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

        {/* Brand */}
        <div className="md:col-span-1">
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
            <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link to="/buy-wood" className="hover:text-white transition-colors">Sell Scrap Wood</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-widest text-xs">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:9922887440" className="hover:text-white transition-colors">📞 9922887440</a></li>
            <li><a href="tel:7841867440" className="hover:text-white transition-colors">📞 7841867440</a></li>
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

        {/* Our Office */}
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-widest text-xs">Our Office</h4>
          <p className="text-sm leading-relaxed">
            Office No. 204, A Wing, Paraiso-1,<br />
            Moshi Alandi BRT Road,<br />
            Moshi - 412105
          </p>
          <p className="text-sm mt-3 text-green-400 font-medium">Ramdas Dadas</p>
          <p className="text-xs text-green-500">Founder & Owner</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Office+No+204+A+Wing+Paraiso+1+Moshi+Alandi+BRT+Road+Moshi+Maharashtra+412105"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-xs text-green-300 hover:text-white border border-green-600 hover:border-green-400 px-3 py-1.5 rounded-lg transition-colors"
          >
            Open in Maps →
          </a>
        </div>

        {/* Google Map */}
        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-widest text-xs">📍 Find Us</h4>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Office+No+204+A+Wing+Paraiso+1+Moshi+Alandi+BRT+Road+Moshi+Maharashtra+412105"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl overflow-hidden border border-green-700 hover:border-green-400 transition-colors"
          >
            <iframe
              title="Eco Wood Industries Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.123456789!2d73.8567!3d18.6820!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQwJzU1LjIiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin&q=Office+No+204+A+Wing+Paraiso+1+Moshi+Alandi+BRT+Road+Moshi+412105"
              width="100%"
              height="160"
              style={{ border: 0, display: 'block', pointerEvents: 'none' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>
          <p className="text-green-500 text-xs mt-1.5 text-center">Click map to open in Google Maps</p>
        </div>

      </div>

      <div className="border-t border-green-700 py-5 text-center text-xs text-green-500">
        © 2026 Eco Wood Industries. All rights reserved. &nbsp;|&nbsp; Designed with 🌿 for a sustainable future.
      </div>
    </footer>
  )
}
