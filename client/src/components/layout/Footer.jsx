import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Phone, Mail, Globe, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0b1c13] border-t border-emerald-900/30 text-[#aec4b8] mt-auto relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <h3 className="text-white text-xl font-extrabold mb-4 font-display flex items-center gap-2.5">
            <img
              src="/images/eco wood.png"
              alt="Eco Wood Logo"
              className="w-8 h-8 object-contain rounded-md"
            />
            <span>Eco Wood</span>
          </h3>
          <p className="text-sm leading-relaxed text-[#8ca396]">
            Turning wood waste into global value. Sustainable recycling solutions engineered for a greener tomorrow.
          </p>
          <div className="flex gap-4 mt-6">
            <span className="w-8 h-8 rounded-lg bg-[#0e271a] border border-emerald-800/30 flex items-center justify-center text-sm text-emerald-400 cursor-default">
              <Leaf className="w-4 h-4" />
            </span>
            <span className="w-8 h-8 rounded-lg bg-[#0e271a] border border-emerald-800/30 flex items-center justify-center text-sm text-emerald-400 cursor-default">
              <Globe className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-extrabold mb-4 uppercase tracking-widest text-xs font-display">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {['Home', 'About Us', 'Services', 'Products', 'How It Works', 'Sell Scrap Wood'].map((link) => {
              const paths = {
                'Home': '/',
                'About Us': '/about',
                'Services': '/services',
                'Products': '/products',
                'How It Works': '/how-it-works',
                'Sell Scrap Wood': '/buy-wood'
              }
              return (
                <li key={link}>
                  <Link
                    to={paths[link]}
                    className="hover:text-emerald-300 transition-colors duration-300 flex items-center gap-1.5 text-[#aec4b8]"
                  >
                    <span className="text-[10px] text-emerald-600/60">➔</span> {link}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-extrabold mb-4 uppercase tracking-widest text-xs font-display">Contact Us</h4>
          <ul className="space-y-3.5 text-sm">
            <li>
              <a href="tel:9922887440" className="hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2 group">
                <Phone className="w-4 h-4 text-emerald-600/70 group-hover:text-emerald-300 transition-colors" /> 
                <span className="font-semibold text-white">9922887440</span>
              </a>
            </li>
            <li>
              <a href="tel:7841867440" className="hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2 group">
                <Phone className="w-4 h-4 text-emerald-600/70 group-hover:text-emerald-300 transition-colors" /> 
                <span className="font-semibold text-white">7841867440</span>
              </a>
            </li>
            <li>
              <a href="mailto:ecowoodindustries2025@gmail.com" className="hover:text-emerald-300 transition-colors duration-300 flex items-start gap-2 group break-all">
                <Mail className="w-4 h-4 text-emerald-600/70 group-hover:text-emerald-300 transition-colors mt-0.5" /> 
                <span className="text-white">ecowoodindustries2025@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="https://www.ecowoodindustries.in" target="_blank" rel="noreferrer" className="hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2 group">
                <Globe className="w-4 h-4 text-emerald-600/70 group-hover:text-emerald-300 transition-colors" /> 
                <span className="text-white">www.ecowoodindustries.in</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Our Office */}
        <div>
          <h4 className="text-white font-extrabold mb-4 uppercase tracking-widest text-xs font-display">Our Office</h4>
          <p className="text-sm leading-relaxed text-zinc-300">
            Office No. 204, A Wing, Paraiso-1,<br />
            Moshi Alandi BRT Road,<br />
            Moshi - 412105
          </p>
          <div className="mt-4 border-t border-emerald-800/20 pt-3">
            <p className="text-sm text-emerald-400 font-bold">Ramdas Dadas</p>
            <p className="text-xs text-zinc-500 font-medium">Founder & Owner</p>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Office+No+204+A+Wing+Paraiso+1+Moshi+Alandi+BRT+Road+Moshi+Maharashtra+412105"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-xs bg-[#0e271a] hover:bg-[#123120] border border-emerald-800/30 text-emerald-400 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5" /> Open in Maps →
          </a>
        </div>

        {/* Google Map */}
        <div>
          <h4 className="text-white font-extrabold mb-4 uppercase tracking-widest text-xs font-display flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> Find Us
          </h4>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl overflow-hidden border border-emerald-800/30 hover:border-emerald-600/50 shadow-xl transition-colors bg-[#0e271a]"
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=Office+No+204+A+Wing+Paraiso+1+Moshi+Alandi+BRT+Road+Moshi+Maharashtra+412105"
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <iframe
                title="Eco Wood Industries Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.123456789!2d73.8567!3d18.6820!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQwJzU1LjIiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin&q=Office+No+204+A+Wing+Paraiso+1+Moshi+Alandi+BRT+Road+Moshi+412105"
                width="100%"
                height="150"
                style={{ border: 0, display: 'block', pointerEvents: 'none', filter: 'invert(90%) hue-rotate(110deg) brightness(85%) contrast(85%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
          </motion.div>
          <p className="text-[#8ca396] text-xs mt-2 text-center italic">Click map to open Google Maps</p>
        </div>
      </div>

      <div className="border-t border-emerald-900/30 py-6 text-center text-xs text-[#5d7367] relative z-10 bg-[#07130c]">
        © 2026 Eco Wood Industries. All rights reserved. &nbsp;|&nbsp; Designed with 💚 for a sustainable future.
      </div>
    </footer>
  )
}
