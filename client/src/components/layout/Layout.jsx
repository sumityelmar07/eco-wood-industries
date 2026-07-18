import Header from './Header'
import Footer from './Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#faf8f2]">
      {/* Lush Organic Background Glow Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-[#dcfce7] rounded-full blur-[150px] pointer-events-none z-0 opacity-80" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[#fef3c7] rounded-full blur-[140px] pointer-events-none z-0 opacity-70" />
      <div className="absolute top-[35%] right-[-15%] w-[550px] h-[550px] bg-[#ccfbf1] rounded-full blur-[130px] pointer-events-none z-0 opacity-85" />
      <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-[#dcfce7] rounded-full blur-[150px] pointer-events-none z-0 opacity-75" />

      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1 pt-32 md:pt-36 pb-16 relative z-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
