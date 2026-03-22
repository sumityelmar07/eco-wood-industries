import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/public/Home.jsx'
import About from './pages/public/About.jsx'
import Services from './pages/public/Services.jsx'
import HowItWorks from './pages/public/HowItWorks.jsx'
import BuyWood from './pages/public/BuyWood.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/buy-wood" element={<BuyWood />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  )
}

export default App