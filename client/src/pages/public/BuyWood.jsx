import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Leaf, CheckCircle2, Truck, Box, Camera, FileImage, Check, MapPin, AlertTriangle, Loader2 } from 'lucide-react'
import Layout from '../../components/layout/Layout'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' } }),
}

async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      { headers: { 'User-Agent': 'EcoWoodIndustries/1.0' } }
    )
    if (!res.ok) return { locationName: '', fullAddress: '' }
    const data = await res.json()
    const display = data.display_name || ''
    const addr = data.address || {}
    const localPart = addr.suburb || addr.neighbourhood || addr.village || addr.town || addr.city_district || addr.subdistrict || ''
    const cityPart = addr.city || addr.town || addr.county || ''
    const statePart = addr.state || ''
    const locationName = [localPart, cityPart, statePart].filter(Boolean).slice(0, 2).join(', ')
    return { locationName: locationName || 'Pune', fullAddress: display }
  } catch {
    return { locationName: '', fullAddress: '' }
  }
}

function loadMapTile(lat, lng) {
  return new Promise((resolve) => {
    const zoom = 15
    const n = Math.pow(2, zoom)
    const x = Math.floor((lng + 180) / 360 * n)
    const latRad = lat * Math.PI / 180
    const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png?cache=${Date.now()}`
  })
}

function formatDateTime(date) {
  const pad = n => String(n).padStart(2, '0')
  const day = pad(date.getDate())
  const month = pad(date.getMonth() + 1)
  const year = date.getFullYear()
  let hours = date.getHours()
  const minutes = pad(date.getMinutes())
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const offsetMins = -date.getTimezoneOffset()
  const sign = offsetMins >= 0 ? '+' : '-'
  const absOff = Math.abs(offsetMins)
  const gmtOffset = `GMT ${sign}${pad(Math.floor(absOff / 60))}:${pad(absOff % 60)}`
  return { dateStr: `${day}/${month}/${year}`, timeStr: `${pad(hours)}:${minutes} ${ampm}`, gmtOffset }
}

async function stampGeoOnImage(file, coords) {
  const lat = coords.latitude
  const lng = coords.longitude
  const now = new Date()
  const [geocoding, mapTile] = await Promise.all([reverseGeocode(lat, lng), loadMapTile(lat, lng)])
  const { dateStr, timeStr, gmtOffset } = formatDateTime(now)
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const W = img.naturalWidth, H = img.naturalHeight
      const canvas = document.createElement('canvas')
      canvas.width = W; canvas.height = H
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, W, H)
      const barH = Math.max(90, Math.floor(H * 0.13))
      const barY = H - barH
      const pad = Math.max(10, Math.floor(barH * 0.1))
      const thumbSize = barH - pad * 2
      ctx.fillStyle = 'rgba(15,15,15,0.88)'
      ctx.fillRect(0, barY, W, barH)
      const thumbX = pad, thumbY = barY + pad
      if (mapTile) {
        ctx.drawImage(mapTile, thumbX, thumbY, thumbSize, thumbSize)
        ctx.fillStyle = '#ef4444'
        ctx.beginPath()
        ctx.arc(thumbX + thumbSize / 2, thumbY + thumbSize / 2, thumbSize * 0.09, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.3)'
        ctx.lineWidth = 1.5
        ctx.strokeRect(thumbX, thumbY, thumbSize, thumbSize)
      } else {
        ctx.fillStyle = '#1e293b'
        ctx.fillRect(thumbX, thumbY, thumbSize, thumbSize)
      }
      const textX = thumbX + thumbSize + pad * 1.5
      const textMaxW = W - textX - pad
      const baseSize = Math.max(11, Math.floor(barH * 0.155))
      ctx.textAlign = 'left'; ctx.textBaseline = 'top'
      const truncate = (text, maxW) => {
        while (ctx.measureText(text).width > maxW && text.length > 4) text = text.slice(0, -4) + '…'
        return text
      }
      const lineGap = Math.floor((barH - pad * 2) / 4.2)
      ctx.font = `700 ${baseSize + 2}px Arial, sans-serif`; ctx.fillStyle = '#ffffff'
      ctx.fillText(truncate(geocoding.locationName || `${lat.toFixed(4)}, ${lng.toFixed(4)}`, textMaxW), textX, barY + pad)
      ctx.font = `400 ${baseSize}px Arial, sans-serif`; ctx.fillStyle = '#c0c0c0'
      ctx.fillText(truncate(geocoding.fullAddress || 'Address unavailable', textMaxW), textX, barY + pad + lineGap)
      ctx.fillStyle = '#ffffff'
      ctx.fillText(`Lat: ${lat.toFixed(6)}°  Long: ${lng.toFixed(6)}°`, textX, barY + pad + lineGap * 2)
      ctx.fillText(`${dateStr}  ${timeStr}  ${gmtOffset}`, textX, barY + pad + lineGap * 3)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => resolve(new File([blob], 'geo-photo.jpg', { type: 'image/jpeg' })), 'image/jpeg', 0.92)
    }
    img.src = url
  })
}

export default function BuyWood() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', distance: '' })
  const [woodPhotos, setWoodPhotos] = useState([])
  const [geoPhoto, setGeoPhoto] = useState(null)
  const [geoPreviewUrl, setGeoPreviewUrl] = useState(null)
  const [geoStatus, setGeoStatus] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [errors, setErrors] = useState({})
  const [detectingLoc, setDetectingLoc] = useState(false)
  const woodInputRef = useRef()
  const cameraInputRef = useRef()
  const geoInputRef = useRef()

  const handleDetectDistance = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.")
      return
    }
    setDetectingLoc(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude
          // Moshi, Pune coordinates
          const MOSHI_COORDS = { latitude: 18.6830, longitude: 73.8566 }
          
          // Compute Haversine distance
          const R = 6371
          const dLat = (MOSHI_COORDS.latitude - lat) * Math.PI / 180
          const dLon = (MOSHI_COORDS.longitude - lng) * Math.PI / 180
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat * Math.PI / 180) * Math.cos(MOSHI_COORDS.latitude * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
          const km = (R * c).toFixed(1)

          // Reverse geocode
          const geoData = await reverseGeocode(lat, lng)
          const localName = geoData.locationName || "Pune"
          
          const resultText = `${localName} — ${km} km from Moshi`
          setForm(prev => ({ ...prev, distance: resultText }))
          setErrors(prev => ({ ...prev, distance: '' }))
        } catch (err) {
          console.error(err)
        } finally {
          setDetectingLoc(false)
        }
      },
      () => {
        alert("Unable to retrieve location. Please check location permissions in your browser settings.")
        setDetectingLoc(false)
      },
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 60000 }
    )
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.mobile.trim() || !/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = 'Valid 10-digit mobile required'
    if (!form.distance.trim()) e.distance = 'Distance / location is required'
    if (woodPhotos.length === 0) e.woodPhotos = 'Please upload at least one wood photo'
    return e
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleWoodPhotos = (e) => {
    setWoodPhotos(Array.from(e.target.files))
    setErrors({ ...errors, woodPhotos: '' })
  }

  const handleGeoPhoto = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setGeoStatus('fetching'); setGeoPhoto(null); setGeoPreviewUrl(null)
    if (!navigator.geolocation) {
      setGeoPhoto(file); setGeoPreviewUrl(URL.createObjectURL(file)); setGeoStatus('error'); return
    }
    const timer = setTimeout(() => {
      setGeoPhoto(file); setGeoPreviewUrl(URL.createObjectURL(file)); setGeoStatus('error')
    }, 6000)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        clearTimeout(timer)
        const stamped = await stampGeoOnImage(file, pos.coords)
        setGeoPhoto(stamped); setGeoPreviewUrl(URL.createObjectURL(stamped)); setGeoStatus('done')
      },
      () => {
        clearTimeout(timer)
        setGeoPhoto(file); setGeoPreviewUrl(URL.createObjectURL(file)); setGeoStatus('error')
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setLoading(true); setServerError('')
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('mobile', form.mobile)
      formData.append('distance', form.distance)
      woodPhotos.forEach(file => formData.append('woodPhotos', file))
      if (geoPhoto) formData.append('geoPhoto', geoPhoto)
      const isLocal = window.location.hostname !== 'www.ecowoodindustries.in' && 
                      window.location.hostname !== 'ecowoodindustries.in' && 
                      !window.location.hostname.endsWith('.vercel.app')
      const endpoint = isLocal
        ? 'http://localhost:5000/api/submit'
        : 'https://ecowood-web.onrender.com/api/submit'
      const res = await fetch(endpoint, { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setSubmitted(true)
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[70vh] bg-[#faf8f2] flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 15 }}
            className="mb-8"
          >
            <img
              src="/images/eco wood.png"
              alt="Eco Wood Logo"
              className="w-24 h-24 object-contain rounded-2xl mx-auto drop-shadow-md"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl p-10 max-w-lg border border-emerald-600/15 shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-bl-full pointer-events-none" />
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-zinc-950 font-display mb-4">Request Submitted!</h2>
            <p className="text-zinc-650 text-sm leading-relaxed mb-8 font-semibold">
              Thank you, <span className="font-bold text-emerald-850">{form.name}</span>. Our yard team will review the photos and contact you at <span className="font-bold text-zinc-950">{form.mobile}</span> with our best salvage pricing.
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 shadow-md"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-emerald-100/70 via-[#f4f2ec]/85 to-amber-100/70 py-24 rounded-3xl text-center border border-emerald-600/20 shadow-md overflow-hidden mb-16 backdrop-blur-md">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 px-4">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex bg-emerald-50 border border-emerald-600/20 text-emerald-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            >
              Sell Scrap Timber
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold text-zinc-950 mb-6 font-display drop-shadow-sm"
            >
              Sell Your <span className="bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">Scrap Wood</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-zinc-650 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-semibold"
            >
              Earn competitive payouts on redundant lumber. Submit photos and site location below — we handle logistics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 mt-10 flex-wrap"
            >
              {['Fill Details', 'Upload Photos', 'Instant Quote'].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex items-center gap-2.5 bg-white/80 border border-emerald-600/10 rounded-full px-4 py-2 shadow-sm backdrop-blur-sm">
                    <span className="w-6 h-6 bg-emerald-600 text-white rounded-full text-xs font-extrabold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-zinc-700 text-sm font-semibold">{step}</span>
                  </div>
                  {i < 2 && <span className="text-emerald-600/30 text-lg">➔</span>}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Collection Policy Panels */}
        <section className="max-w-4xl mx-auto px-4 -mt-12 relative z-20 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className="flex items-start gap-4 bg-white border-l-4 border-l-emerald-600 border border-emerald-600/10 rounded-3xl p-6 shadow-md"
            >
              <div className="bg-emerald-50 border border-emerald-600/10 rounded-2xl p-4 text-emerald-700">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-extrabold text-zinc-950 text-lg font-display">1 Tonne or More</p>
                <p className="text-zinc-650 text-xs leading-relaxed mt-1.5 font-semibold">Free haulage and vehicle pickup from your warehouse site — zero logistics fees.</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className="flex items-start gap-4 bg-white border-l-4 border-l-amber-600 border border-amber-600/15 rounded-3xl p-6 shadow-md"
            >
              <div className="bg-amber-50 border border-amber-600/10 rounded-2xl p-4 text-amber-700">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <p className="font-extrabold text-zinc-950 text-lg font-display">Below 1 Tonne</p>
                <p className="text-zinc-655 text-xs leading-relaxed mt-1.5 font-semibold">Drop off scrap material directly at our Moshi recycling yard, Pune - 412105.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Submission Form */}
        <section className="max-w-3xl mx-auto px-4 mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-emerald-600/15 rounded-3xl overflow-hidden shadow-xl"
          >
            {/* Visual Header Top Bar */}
            <div className="h-2 bg-gradient-to-r from-emerald-700 via-teal-500 to-amber-500" />
            
            <div className="bg-gradient-to-r from-emerald-800 to-[#124227] border-b border-emerald-700/20 px-8 py-7">
              <h2 className="text-2xl font-extrabold text-white font-display">Wood Submission Form</h2>
              <p className="text-emerald-200 text-xs mt-1 font-medium">Provide details below to receive a payout estimation</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={fadeUp} custom={0}>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Pranav Yehale"
                    className={`premium-input ${
                      errors.name ? 'border-red-400 focus:border-red-550 focus:ring-red-500/10' : ''
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>}
                </motion.div>

                <motion.div variants={fadeUp} custom={1}>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    className={`premium-input ${
                      errors.mobile ? 'border-red-400 focus:border-red-550 focus:ring-red-500/10' : ''
                    }`}
                  />
                  {errors.mobile && <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{errors.mobile}</span>
                  </p>}
                </motion.div>
              </div>

              {/* Email */}
              <motion.div variants={fadeUp} custom={2}>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. name@company.com"
                  className={`premium-input ${
                    errors.email ? 'border-red-400 focus:border-red-550 focus:ring-red-500/10' : ''
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>}
              </motion.div>

              {/* Distance / Area */}
              <motion.div variants={fadeUp} custom={3}>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Distance / Location <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectDistance}
                    disabled={detectingLoc}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-600 disabled:opacity-50 transition-colors"
                  >
                    {detectingLoc ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Detecting...</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Use Live Location</span>
                      </>
                    )}
                  </button>
                </div>
                <input
                  type="text"
                  name="distance"
                  value={form.distance}
                  onChange={handleChange}
                  placeholder="e.g. Kothrud, Pune — 15 km from Moshi"
                  className={`premium-input ${
                    errors.distance ? 'border-red-400 focus:border-red-550 focus:ring-red-500/10' : ''
                  }`}
                />
                <p className="text-zinc-500 text-xs mt-2.5 font-medium italic flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Your industrial park/city and approximate distance from Moshi yard</span>
                </p>
                {errors.distance && <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{errors.distance}</span>
                </p>}
              </motion.div>

              {/* Divider lines */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-emerald-600/15" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-xs text-zinc-400 font-extrabold uppercase tracking-widest font-display">
                    Image Upload
                  </span>
                </div>
              </div>

              {/* Wood Photos Upload grids */}
              <motion.div variants={fadeUp} custom={4}>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                  Scrap Wood Photos <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.01, borderColor: 'rgba(16,185,129,0.3)', backgroundColor: 'rgba(4,120,87,0.03)' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => woodInputRef.current.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                      errors.woodPhotos ? 'border-red-500/35 bg-red-500/5' : 'border-emerald-600/15 bg-stone-50/50'
                    }`}
                  >
                    <FileImage className="w-10 h-10 text-emerald-700 mb-2" />
                    <p className="text-sm font-bold text-zinc-950 font-display">Photo Gallery</p>
                    <p className="text-xs text-zinc-500 mt-1">Select multiple files</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01, borderColor: 'rgba(16,185,129,0.3)', backgroundColor: 'rgba(4,120,87,0.03)' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => cameraInputRef.current.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                      errors.woodPhotos ? 'border-red-500/35 bg-red-500/5' : 'border-emerald-600/15 bg-stone-50/50'
                    }`}
                  >
                    <Camera className="w-10 h-10 text-emerald-700 mb-2" />
                    <p className="text-sm font-bold text-zinc-950 font-display">Use Camera</p>
                    <p className="text-xs text-zinc-500 mt-1">Snap active live photos</p>
                  </motion.div>
                </div>

                {woodPhotos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-600/20 rounded-xl px-4 py-3 shadow-sm"
                  >
                    <Check className="w-5 h-5 text-emerald-600" />
                    <p className="text-emerald-800 text-sm font-bold">
                      {woodPhotos.length} photo{woodPhotos.length > 1 ? 's' : ''} staged for upload
                    </p>
                  </motion.div>
                )}
                <input ref={woodInputRef} type="file" accept="image/*" multiple onChange={handleWoodPhotos} className="hidden" />
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" multiple onChange={handleWoodPhotos} className="hidden" />
                {errors.woodPhotos && <p className="text-red-500 text-xs mt-1.5 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{errors.woodPhotos}</span>
                </p>}
              </motion.div>

              {/* Geotag Photo */}
              <motion.div variants={fadeUp} custom={5}>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  📍 Location Photo <span className="text-zinc-400 font-normal normal-case">(optional)</span>
                </label>
                <p className="text-xs text-zinc-500 mb-3 italic">We will stamp exact GPS coordinates, timestamp, and address details on the map tile overlay.</p>
                
                <motion.div
                  whileHover={{ scale: 1.01, borderColor: 'rgba(245,158,11,0.3)', backgroundColor: 'rgba(245,158,11,0.02)' }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => geoInputRef.current.click()}
                  className="w-full border-2 border-dashed border-emerald-600/15 bg-stone-50/50 rounded-2xl px-4 py-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center"
                >
                  {geoStatus === 'fetching' && (
                    <div className="flex items-center justify-center gap-3.5">
                      <Loader2 className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-amber-600 text-sm font-bold">Querying GPS satellites...</p>
                    </div>
                  )}
                  {geoStatus === 'done' && <p className="text-emerald-600 text-sm font-bold flex items-center gap-1">
                    <Check className="w-5 h-5" />
                    <span>Location Metadata Stamped!</span>
                  </p>}
                  {geoStatus === 'error' && <p className="text-amber-600 text-sm font-bold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Staging photo without metadata</span>
                  </p>}
                  {!geoStatus && (
                    <div className="flex flex-col items-center gap-2">
                      <Camera className="w-10 h-10 text-emerald-700 mb-2" />
                      <p className="text-sm font-bold text-zinc-800 font-display">Take Location Verification Photo</p>
                      <p className="text-xs text-zinc-500 font-semibold">Enable location services in browser prompts</p>
                    </div>
                  )}
                </motion.div>
                <input ref={geoInputRef} type="file" accept="image/*" capture="environment" onChange={handleGeoPhoto} className="hidden" />

                {geoPreviewUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 rounded-2xl overflow-hidden border border-emerald-600/20 shadow-lg relative bg-zinc-950"
                  >
                    <img src={geoPreviewUrl} alt="Geotagged site preview" className="w-full object-contain max-h-[500px]" />
                    <div className="bg-[#0f281b] border-t border-emerald-800/20 px-4 py-3.5 flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-300" />
                      <p className="text-emerald-300 text-xs font-extrabold uppercase tracking-widest font-display">Geotag Canvas Stamped Ready</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Submit panel */}
              <motion.div variants={fadeUp} custom={6} className="pt-4">
                {serverError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 mb-5 text-red-500 text-sm text-center font-semibold flex items-center justify-center gap-1.5"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>{serverError}</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  className="w-full bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white py-4.5 rounded-2xl font-extrabold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-base font-display flex items-center justify-center gap-2 uppercase"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Files...</span>
                    </>
                  ) : (
                    <span>Submit Request</span>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </section>
      </div>
    </Layout>
  )
}
