import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Layout from '../../components/layout/Layout'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

// Stamp GPS coordinates + timestamp onto image using Canvas
function stampGeoOnImage(file, coords) {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      const text1 = `📍 Lat: ${coords.latitude.toFixed(6)}, Lng: ${coords.longitude.toFixed(6)}`
      const text2 = `🕐 ${new Date().toLocaleString('en-IN')}`
      const fontSize = Math.max(16, Math.floor(img.width / 40))

      ctx.font = `bold ${fontSize}px Arial`
      ctx.fillStyle = 'rgba(0,0,0,0.55)'
      const pad = fontSize * 0.6
      const boxH = fontSize * 3.2
      ctx.fillRect(0, img.height - boxH, img.width, boxH)

      ctx.fillStyle = '#ffffff'
      ctx.fillText(text1, pad, img.height - boxH + fontSize * 1.3)
      ctx.fillText(text2, pad, img.height - boxH + fontSize * 2.6)

      canvas.toBlob((blob) => {
        const stamped = new File([blob], 'geo-photo.jpg', { type: 'image/jpeg' })
        URL.revokeObjectURL(url)
        resolve(stamped)
      }, 'image/jpeg', 0.92)
    }
    img.src = url
  })
}

export default function BuyWood() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', distance: '' })
  const [woodPhotos, setWoodPhotos] = useState([])
  const [geoPhoto, setGeoPhoto] = useState(null)
  const [geoStatus, setGeoStatus] = useState('') // 'fetching' | 'done' | 'error'
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
    if (!form.mobile.trim() || !/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = 'Valid 10-digit mobile number is required'
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

  // When user picks/takes a geo photo, fetch location and stamp it
  const handleGeoPhoto = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setGeoStatus('fetching')
    setGeoPhoto(null)

    if (!navigator.geolocation) {
      // no geolocation support — use photo as-is
      setGeoPhoto(file)
      setGeoStatus('error')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const stamped = await stampGeoOnImage(file, pos.coords)
        setGeoPhoto(stamped)
        setGeoStatus('done')
      },
      () => {
        // user denied location — use photo without stamp
        setGeoPhoto(file)
        setGeoStatus('error')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }

    setLoading(true)
    setServerError('')

    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('mobile', form.mobile)
      formData.append('distance', form.distance)
      woodPhotos.forEach(file => formData.append('woodPhotos', file))
      if (geoPhoto) formData.append('geoPhoto', geoPhoto)

      const res = await fetch('https://eco-wood-server.onrender.com/api/submit', {
        method: 'POST',
        body: formData,
      })

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
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
            className="text-7xl mb-6">🌿</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-3xl font-extrabold text-green-800 mb-3">Request Submitted!</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-gray-500 max-w-md">
            Thank you, <span className="font-semibold text-green-700">{form.name}</span>. Our team will review your details and contact you at <span className="font-semibold">{form.mobile}</span> with the best offer.
          </motion.p>
          <motion.a href="/" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="mt-8 bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
            Back to Home
          </motion.a>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 py-16 text-center px-4">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-green-300 uppercase tracking-widest text-xs font-bold mb-3">We Buy Your Scrap</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-3">
          🪵 Sell Your Scrap Wood
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-green-200 max-w-lg mx-auto">
          Have scrap wood lying around? Don't let it go to waste. Share your details and photos — Eco Wood Industries will come to you with the best offer.
        </motion.p>
      </div>

      {/* Collection Policy Info */}
      <section className="max-w-2xl mx-auto px-6 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-2xl p-5">
            <span className="text-3xl">🚛</span>
            <div>
              <p className="font-bold text-green-800 text-sm">1 Tonne or More</p>
              <p className="text-gray-600 text-xs mt-1">We will collect the scrap wood directly from your location — no hassle, no transport cost.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <span className="text-3xl">📦</span>
            <div>
              <p className="font-bold text-amber-800 text-sm">Below 1 Tonne</p>
              <p className="text-gray-600 text-xs mt-1">You will need to deliver the scrap wood to our facility at Moshi, Pune - 412105.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-6 py-14">
        <motion.form
          initial="hidden" animate="visible"
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-6 border border-gray-100"
        >
          {/* Name */}
          <motion.div variants={fadeUp} custom={0}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="e.g. Pranav Yehale"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition ${errors.name ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp} custom={1}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="e.g. yourname@email.com"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition ${errors.email ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </motion.div>

          {/* Mobile */}
          <motion.div variants={fadeUp} custom={2}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
            <input type="tel" name="mobile" value={form.mobile} onChange={handleChange}
              placeholder="e.g. 9876543210" maxLength={10}
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition ${errors.mobile ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </motion.div>

          {/* Distance / Location */}
          <motion.div variants={fadeUp} custom={3}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Distance / Location <span className="text-red-500">*</span></label>
            <input type="text" name="distance" value={form.distance} onChange={handleChange}
              placeholder="e.g. Address - 25 km from Pune, Maharashtra"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition ${errors.distance ? 'border-red-400' : 'border-gray-200'}`} />
            <p className="text-gray-400 text-xs mt-1">Enter your approximate distance or city/area from us.</p>
            {errors.distance && <p className="text-red-500 text-xs mt-1">{errors.distance}</p>}
          </motion.div>

          {/* Wood Photos */}
          <motion.div variants={fadeUp} custom={4}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Scrap Wood Photos <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div onClick={() => woodInputRef.current.click()}
                className={`border-2 border-dashed rounded-xl px-4 py-5 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition ${errors.woodPhotos ? 'border-red-400' : 'border-gray-200'}`}>
                <p className="text-3xl mb-1">🖼️</p>
                <p className="text-sm font-medium text-gray-600">Upload from Gallery</p>
                <p className="text-xs text-gray-400 mt-1">Multiple files allowed</p>
              </div>
              <div onClick={() => cameraInputRef.current.click()}
                className={`border-2 border-dashed rounded-xl px-4 py-5 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition ${errors.woodPhotos ? 'border-red-400' : 'border-gray-200'}`}>
                <p className="text-3xl mb-1">📷</p>
                <p className="text-sm font-medium text-gray-600">Take Live Photo</p>
                <p className="text-xs text-gray-400 mt-1">Opens camera directly</p>
              </div>
            </div>
            {woodPhotos.length > 0 && <p className="text-green-600 text-xs font-semibold">✓ {woodPhotos.length} file(s) selected</p>}
            <input ref={woodInputRef} type="file" accept="image/*" multiple onChange={handleWoodPhotos} className="hidden" />
            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" multiple onChange={handleWoodPhotos} className="hidden" />
            {errors.woodPhotos && <p className="text-red-500 text-xs mt-1">{errors.woodPhotos}</p>}
          </motion.div>

          {/* Geo-tagged Photo */}
          <motion.div variants={fadeUp} custom={5}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              📍 Location Photo <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <p className="text-xs text-gray-400 mb-2">Take a photo — we'll automatically stamp your GPS coordinates on it for pickup planning.</p>
            <div onClick={() => geoInputRef.current.click()}
              className="w-full border-2 border-dashed rounded-xl px-4 py-6 text-center cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition border-gray-200">
              {geoStatus === 'fetching' && (
                <p className="text-amber-600 text-sm font-semibold animate-pulse">📡 Fetching your location...</p>
              )}
              {geoStatus === 'done' && (
                <p className="text-green-600 text-sm font-semibold">✅ Location stamped on photo!</p>
              )}
              {geoStatus === 'error' && (
                <p className="text-orange-500 text-sm font-semibold">⚠️ Photo saved without location (permission denied)</p>
              )}
              {!geoStatus && (
                <>
                  <p className="text-3xl mb-2">📸</p>
                  <p className="text-sm text-gray-500">Tap to open camera</p>
                  <p className="text-xs text-gray-400 mt-1">Allow location access when prompted</p>
                </>
              )}
            </div>
            <input ref={geoInputRef} type="file" accept="image/*" capture="environment" onChange={handleGeoPhoto} className="hidden" />
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeUp} custom={6}>
            {serverError && <p className="text-red-500 text-sm text-center mb-3">{serverError}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-xl font-bold text-base hover:bg-green-600 active:scale-95 transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? '⏳ Submitting...' : 'Submit Request 🌿'}
            </button>
          </motion.div>
        </motion.form>
      </section>
    </Layout>
  )
}
