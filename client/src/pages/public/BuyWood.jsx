import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Layout from '../../components/layout/Layout'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
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
    const parts = display.split(',').map(s => s.trim()).filter(Boolean)
    return { locationName: parts.slice(-3).join(', '), fullAddress: display }
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
    img.src = `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`
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
  const woodInputRef = useRef()
  const cameraInputRef = useRef()
  const geoInputRef = useRef()

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
      const res = await fetch('https://ecowood-web.onrender.com/api/submit', { method: 'POST', body: formData })
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-8xl mb-6">🌿</motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-10 max-w-md border border-green-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-3xl font-extrabold text-green-800 mb-3">Request Submitted!</h2>
            <p className="text-gray-500 mb-6">
              Thank you, <span className="font-semibold text-green-700">{form.name}</span>. Our team will contact you at <span className="font-semibold text-gray-700">{form.mobile}</span> with the best offer.
            </p>
            <motion.a href="/" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-block bg-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg">
              Back to Home
            </motion.a>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 py-20 text-center px-4 overflow-hidden">
        <motion.div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
          animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 10, repeat: Infinity }} />
        <div className="relative z-10">
          <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-white/10 border border-white/20 text-green-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            We Buy Your Scrap
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl mb-4">
            🪵 Sell Your Scrap Wood
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-green-200 text-lg max-w-xl mx-auto leading-relaxed">
            Have scrap wood lying around? Share your details and photos — we'll come to you with the best offer.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            {['Fill Details', 'Upload Photos', 'Get Best Offer'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                  <span className="w-6 h-6 bg-green-400 rounded-full text-xs font-bold text-green-900 flex items-center justify-center">{i + 1}</span>
                  <span className="text-white text-sm font-medium">{step}</span>
                </div>
                {i < 2 && <span className="text-green-400 text-lg">→</span>}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Collection Policy */}
      <section className="max-w-3xl mx-auto px-6 -mt-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02, y: -2 }}
            className="flex items-start gap-4 bg-white rounded-2xl shadow-lg border-l-4 border-green-500 p-5">
            <div className="bg-green-100 rounded-xl p-3 text-2xl">🚛</div>
            <div>
              <p className="font-bold text-green-800">1 Tonne or More</p>
              <p className="text-gray-500 text-sm mt-1">Free pickup from your location — no hassle, no transport cost.</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02, y: -2 }}
            className="flex items-start gap-4 bg-white rounded-2xl shadow-lg border-l-4 border-amber-400 p-5">
            <div className="bg-amber-100 rounded-xl p-3 text-2xl">📦</div>
            <div>
              <p className="font-bold text-amber-800">Below 1 Tonne</p>
              <p className="text-gray-500 text-sm mt-1">Deliver to our facility at Moshi, Pune - 412105.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-8 py-6">
            <h2 className="text-xl font-extrabold text-white">Submit Your Wood Details</h2>
            <p className="text-green-200 text-sm mt-1">Fill in the form below and we'll get back to you</p>
          </div>
          <motion.form initial="hidden" animate="visible" onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">

            {/* Name + Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.div variants={fadeUp} custom={0}>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="e.g. Pranav Yehale"
                  className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors bg-gray-50 focus:bg-white ${errors.name ? 'border-red-400' : 'border-gray-200'}`} />
                {errors.name && <p className="text-red-500 text-xs mt-1">⚠ {errors.name}</p>}
              </motion.div>
              <motion.div variants={fadeUp} custom={1}>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input type="tel" name="mobile" value={form.mobile} onChange={handleChange}
                  placeholder="e.g. 9876543210" maxLength={10}
                  className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors bg-gray-50 focus:bg-white ${errors.mobile ? 'border-red-400' : 'border-gray-200'}`} />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">⚠ {errors.mobile}</p>}
              </motion.div>
            </div>

            {/* Email */}
            <motion.div variants={fadeUp} custom={2}>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="e.g. yourname@email.com"
                className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors bg-gray-50 focus:bg-white ${errors.email ? 'border-red-400' : 'border-gray-200'}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">⚠ {errors.email}</p>}
            </motion.div>

            {/* Distance */}
            <motion.div variants={fadeUp} custom={3}>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Distance / Location <span className="text-red-500">*</span>
              </label>
              <input type="text" name="distance" value={form.distance} onChange={handleChange}
                placeholder="e.g. Kothrud, Pune — 15 km from Moshi"
                className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors bg-gray-50 focus:bg-white ${errors.distance ? 'border-red-400' : 'border-gray-200'}`} />
              <p className="text-gray-400 text-xs mt-1">📍 Your area/city and approximate distance from us</p>
              {errors.distance && <p className="text-red-500 text-xs mt-1">⚠ {errors.distance}</p>}
            </motion.div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs text-gray-400 font-semibold uppercase tracking-wider">Upload Photos</span>
              </div>
            </div>

            {/* Wood Photos */}
            <motion.div variants={fadeUp} custom={4}>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Scrap Wood Photos <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => woodInputRef.current.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${errors.woodPhotos ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-green-400 hover:bg-green-50'}`}>
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-sm font-semibold text-gray-700">Gallery</p>
                  <p className="text-xs text-gray-400 mt-0.5">Multiple files</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => cameraInputRef.current.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${errors.woodPhotos ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-green-400 hover:bg-green-50'}`}>
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-sm font-semibold text-gray-700">Camera</p>
                  <p className="text-xs text-gray-400 mt-0.5">Live photo</p>
                </motion.div>
              </div>
              {woodPhotos.length > 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                  <span className="text-green-600 text-lg">✅</span>
                  <p className="text-green-700 text-sm font-semibold">{woodPhotos.length} photo{woodPhotos.length > 1 ? 's' : ''} selected</p>
                </motion.div>
              )}
              <input ref={woodInputRef} type="file" accept="image/*" multiple onChange={handleWoodPhotos} className="hidden" />
              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" multiple onChange={handleWoodPhotos} className="hidden" />
              {errors.woodPhotos && <p className="text-red-500 text-xs mt-1">⚠ {errors.woodPhotos}</p>}
            </motion.div>

            {/* Geo Photo */}
            <motion.div variants={fadeUp} custom={5}>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                📍 Location Photo <span className="text-gray-400 font-normal normal-case">(optional)</span>
              </label>
              <p className="text-xs text-gray-400 mb-3">We'll stamp GPS coordinates on the photo for pickup planning.</p>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                onClick={() => geoInputRef.current.click()}
                className="w-full border-2 border-dashed rounded-2xl px-4 py-5 text-center cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-all border-gray-200">
                {geoStatus === 'fetching' && (
                  <div className="flex items-center justify-center gap-2">
                    <motion.div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                    <p className="text-amber-600 text-sm font-semibold">Fetching GPS location...</p>
                  </div>
                )}
                {geoStatus === 'done' && <p className="text-green-600 text-sm font-semibold">✅ GPS location stamped!</p>}
                {geoStatus === 'error' && <p className="text-orange-500 text-sm font-semibold">⚠️ Saved without location</p>}
                {!geoStatus && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-4xl">📸</div>
                    <p className="text-sm font-semibold text-gray-600">Tap to take location photo</p>
                    <p className="text-xs text-gray-400">Allow location access when prompted</p>
                  </div>
                )}
              </motion.div>
              <input ref={geoInputRef} type="file" accept="image/*" capture="environment" onChange={handleGeoPhoto} className="hidden" />
              {geoPreviewUrl && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl overflow-hidden border-2 border-green-300 shadow-xl">
                  <img src={geoPreviewUrl} alt="Geotagged preview" className="w-full" />
                  <div className="bg-green-600 px-4 py-2.5 flex items-center justify-center gap-2">
                    <span className="text-white text-sm">📍</span>
                    <p className="text-white text-xs font-bold">Geotagged photo ready</p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeUp} custom={6} className="pt-2">
              {serverError && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-red-600 text-sm text-center">
                  ⚠️ {serverError}
                </motion.div>
              )}
              <motion.button type="submit" disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-green-700 to-emerald-600 text-white py-4 rounded-2xl font-bold text-base hover:from-green-600 hover:to-emerald-500 transition-all duration-300 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                    Submitting...
                  </span>
                ) : 'Submit Request 🌿'}
              </motion.button>
            </motion.div>

          </motion.form>
        </motion.div>
      </section>
    </Layout>
  )
}
