import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Phone, X, Check, Leaf, MessageSquare, Clipboard, Layers, HelpCircle, ArrowRight, ShieldCheck, Mail, Info } from 'lucide-react'
import Layout from '../../components/layout/Layout'

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.92 9.92 0 004.933 1.309h.005c5.505 0 9.988-4.478 9.99-9.988a9.97 9.97 0 00-2.928-7.062A9.97 9.97 0 0012.012 2zm6.277 13.79c-.277.779-1.597 1.405-2.186 1.488-.514.073-1.185.127-3.328-.755-2.738-1.127-4.509-3.905-4.646-4.087-.137-.182-1.109-1.472-1.109-2.809 0-1.337.701-1.996.95-2.257.249-.26.54-.326.72-.326h.518c.162 0 .38-.061.593.45.22.529.752 1.834.818 1.971.066.137.11.298.018.479-.092.182-.139.298-.277.46-.139.162-.292.36-.417.483-.139.137-.284.287-.123.563.162.276.719 1.186 1.542 1.916.823.73 1.519.957 1.73.1.21-.137.45-.449.673-.775.223-.326.446-.276.753-.162.307.114 1.944.916 2.277 1.082.332.166.554.249.637.39.083.141.083.818-.194 1.597z"/>
  </svg>
)

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const categories = [
  'Premium Wooden & Pallet Solutions',
  'All Products',
  'Inner Protection',
  'Outer Protection',
  'Heavy-Duty Solutions',
]

const allProducts = [
  {
    id: 'inner-packaging',
    name: 'Inner Packaging',
    category: 'Inner Protection',
    image: '/images/Product%20images/Inner%20Pakaging.png',
    thumbnails: [
      '/images/Product%20images/Inner%20Pakaging.png',
      '/images/wood1.jpeg',
      '/images/wood2.jpeg'
    ],
    price: '₹ 80 / Square Meter',
    moq: '500 Sqm',
    description: 'High-density custom packaging profiles providing excellent cushion safety.',
    specs: {
      'Material': 'Expanded Polyethylene (EPE) Foam',
      'Thickness': '2mm to 10mm',
      'Anti-Static': 'Available on request',
      'Color Options': 'White, Pink, Grey',
      'Load Sensitivity': 'High impact buffer rating',
      'Ideal for': 'Electronics, sensitive precision instruments'
    }
  },
  {
    id: 'vci-bags',
    name: 'VCI Bags',
    category: 'Inner Protection',
    image: '/images/Product%20images/VCI%20bags.png',
    thumbnails: [
      '/images/Product%20images/VCI%20bags.png',
      '/images/wood3.jpeg',
      '/images/wood4.jpeg'
    ],
    price: '₹ 15 / Piece',
    moq: '1,000 Pieces',
    description: 'Corrosion inhibitor bags designed to arrest oxidation on polished steel parts.',
    specs: {
      'Material': 'Vapor Corrosion Inhibitor (VCI) Film',
      'Thickness': '80 to 150 microns',
      'Active Protection': 'Up to 24 months multi-metal preservation',
      'Resistant properties': 'Moisture, dust, chemical vapors',
      'Certifications': 'MIL-STD compliant chemical agents',
      'Ideal for': 'Automotive crank shafts, steel bearings, CNC tooling'
    }
  },
  {
    id: 'silica-gel',
    name: 'Silica Gel Packets',
    category: 'Inner Protection',
    image: '/images/Product%20images/Silica%20gel.png',
    thumbnails: [
      '/images/Product%20images/Silica%20gel.png',
      '/images/wood5.jpeg'
    ],
    price: '₹ 5 / Packet',
    moq: '2,000 Packets',
    description: 'High-grade desiccant packets absorbing condensation within sealed cases.',
    specs: {
      'Material': 'Synthetic amorphous silica dioxide hydrogel',
      'Weight capacity': '5g, 10g, 50g, 100g, 500g pouches',
      'Absorption Rate': 'Over 35% of its net weight in vapor',
      'Pouch Grade': 'Tyvek dust-proof heat-sealed structure',
      'Non-Toxic': '100% inert chemistry',
      'Ideal for': 'Sealed maritime containers, metal crates, export packs'
    }
  },
  {
    id: 'pe-foam',
    name: 'PE Cushioning Foam',
    category: 'Inner Protection',
    image: '/images/Product%20images/PE%20form.png',
    thumbnails: [
      '/images/Product%20images/PE%20form.png',
      '/images/wood1.jpeg'
    ],
    price: '₹ 90 / Square Meter',
    moq: '300 Sqm',
    description: 'Flexible polyethylene sheeting safeguarding surfaces from scratching and friction.',
    specs: {
      'Material': 'Low Density Polyethylene (LDPE) Foam',
      'Thickness range': '5mm to 50mm boards/rolls',
      'Density rating': '22 kg/m³ standard compliance',
      'Elastic recovery': 'Excellent elastic memory',
      'Water proof': 'Closed-cell impervious structure',
      'Ideal for': 'Corner pads, divider inserts, fragile glass edges'
    }
  },
  {
    id: 'air-pads',
    name: 'Air Pads Void Fillers',
    category: 'Inner Protection',
    image: '/images/Product%20images/AIR%20Pads.png',
    thumbnails: [
      '/images/Product%20images/AIR%20Pads.png',
      '/images/wood2.jpeg'
    ],
    price: '₹ 1.20 / Piece',
    moq: '5,000 Pieces',
    description: 'Inflatable cushion pockets designed to brace items inside heavy transport crates.',
    specs: {
      'Material': 'Linear Low Density Polyethylene (LLDPE)',
      'Dimensions': '200mm x 100mm standard puff cells',
      'Tensile properties': 'High puncture resistance polymer layers',
      'Shipment mode': 'Shipped flat, inflated on-demand at packing station',
      'Eco-Friendliness': 'Recyclable polymer structures',
      'Ideal for': 'Void packing, loose item stabilization'
    }
  },
  {
    id: 'outer-packaging',
    name: 'Outer Corrugated Shells',
    category: 'Outer Protection',
    image: '/images/Product%20images/Outer%20Pakaging.png',
    thumbnails: [
      '/images/Product%20images/Outer%20Pakaging.png',
      '/images/wood3.jpeg'
    ],
    price: '₹ 150 / Piece',
    moq: '200 Pieces',
    description: 'Double-wall corrugated shipping boxes providing rigid stacking stability.',
    specs: {
      'Material': 'Virgin kraft paper liners + recycled corrugation cores',
      'Board Grade': '5-Ply double wall heavy industrial grade',
      'Stacking strength': 'Tested up to 350 kg compression',
      'Moisture shield': 'Water resistant exterior sizing option',
      'Joint structure': 'Stitched wire seams for maximum side rigidity',
      'Ideal for': 'Finished machine goods, component parts shipping'
    }
  },
  {
    id: 'stretch-films',
    name: 'Stretch Wrap Films',
    category: 'Outer Protection',
    image: '/images/Product%20images/Stretch%20Film.png',
    thumbnails: [
      '/images/Product%20images/Stretch%20Film.png',
      '/images/wood4.jpeg'
    ],
    price: '₹ 220 / Roll',
    moq: '50 Rolls',
    description: 'High-stretch elastic recovery wrapping designed to consolidate pallets cleanly.',
    specs: {
      'Material': 'Linear Low Density Polyethylene (LLDPE) cast film',
      'Width standard': '500 mm hand & machine application roll sheets',
      'Gauge thickness': '23 microns thick industrial wrap',
      'Elongation rate': 'Up to 300% stretch expansion capacity',
      'Cling index': 'Double sided high stick retention',
      'Ideal for': 'Consolidating cargo stacks, securing palletised products'
    }
  },
  {
    id: 'air-bubble-rolls',
    name: 'Air Bubble Rolls',
    category: 'Outer Protection',
    image: '/images/Product%20images/AIR%20bubble%20roles.png',
    thumbnails: [
      '/images/Product%20images/AIR%20bubble%20roles.png',
      '/images/wood5.jpeg'
    ],
    price: '₹ 850 / Roll',
    moq: '10 Rolls',
    description: 'Shock-dampening bubble wraps suitable for component separation.',
    specs: {
      'Material': 'Low Density Polyethylene (LDPE) composite film',
      'Roll dimensions': '1.0 meter width x 100 meters length',
      'Bubble diameter': '10 mm standard circular domes',
      'Puncture shield': 'Reinforced co-extruded air barrier layer',
      'Insulation value': 'Provides light thermal shielding',
      'Ideal for': 'Furniture wrapping, logistics glass safety cushions'
    }
  },
  {
    id: 'pet-strapping',
    name: 'PET Strapping Bands',
    category: 'Outer Protection',
    image: '/images/Product%20images/Pet%20Strapping.png',
    thumbnails: [
      '/images/Product%20images/Pet%20Strapping.png',
      '/images/wood1.jpeg'
    ],
    price: '₹ 950 / Roll',
    moq: '20 Rolls',
    description: 'Heavy duty polyester bands serving as a steel replacement on timber logs.',
    specs: {
      'Material': 'Polyester (Polyethylene Terephthalate) compound',
      'Strap dimensions': '15 mm width x 0.8 mm thickness x 1000m rolls',
      'Break resistance': 'Tested to withstand up to 450 kg tension',
      'Safety factors': 'No sharp metal edge cuts, remains tight on load shifting',
      'Corrosion proof': 'Rust proof strapping alternative',
      'Ideal for': 'Securing heavy export pallets, log bundles, crates'
    }
  },
  {
    id: 'edge-protectors',
    name: 'V-Board Edge Protectors',
    category: 'Outer Protection',
    image: '/images/Product%20images/EDGE%20Protector.png',
    thumbnails: [
      '/images/Product%20images/EDGE%20Protector.png',
      '/images/wood2.jpeg'
    ],
    price: '₹ 18 / Meter',
    moq: '500 Meters',
    description: 'Pressed cardboard edge boards preventing strap tension cuts on pallet sides.',
    specs: {
      'Material': 'Multi-ply recycled kraft paper board and water adhesives',
      'Caliper size': '4.0 mm wall thickness standard',
      'Leg sizes': '50 mm x 50 mm corner bracket dimensions',
      'Compression limit': 'Resists vertical box buckling',
      'Reusability': '100% recyclable paper board',
      'Ideal for': 'Bracing cardboard box corners on loaded shipping pallets'
    }
  },
  {
    id: 'wooden-box-packing',
    name: 'Wooden Box Packing',
    category: 'Heavy-Duty Solutions',
    image: '/images/Product%20images/Woodden%20Box%20Pakaging.png',
    thumbnails: [
      '/images/Product%20images/Woodden%20Box%20Pakaging.png',
      '/images/Product%20images/wood6.jpeg',
      '/images/Product%20images/wood7.jpeg'
    ],
    price: '₹ 2,500 / Box',
    moq: '20 Boxes',
    description: 'Engineered heavy-duty pine wood cases for machinery and automotive export.',
    specs: {
      'Material': 'Reclaimed structural Pine wood and mixed hardwoods',
      'Load Capacity': 'Up to 2,000 kg structural loading limit',
      'ISPM-15 Treatment': 'Heat Treated and certified for global maritime shipping',
      'Base Structure': 'Heavy 4-Way fork lift entry block runners',
      'Base deck': 'Solid wood planks with metal fastener bolts',
      'Ideal for': 'CNC lathe machines, heavy motors, automotive parts'
    }
  },
  {
    id: 'vacuum-packaging',
    name: 'Vacuum Barrier Packaging',
    category: 'Heavy-Duty Solutions',
    image: '/images/Product%20images/Vaccume%20Pakagging%20.png',
    thumbnails: [
      '/images/Product%20images/Vaccume%20Pakagging%20.png',
      '/images/Product%20images/wood8.jpeg'
    ],
    price: '₹ 450 / Package',
    moq: '50 Packages',
    description: 'Hermetically sealed barrier bags creating moisture-free zones in cargo.',
    specs: {
      'Material': 'Multi-layer aluminum foil laminates and barrier films',
      'Thickness': '120 to 185 microns foil wrap',
      'Vapor Transmission': 'Under 0.01 g/m² per 24 hours',
      'Damp protection': 'Prevents moisture, oxidation, salt fog damage',
      'Sealing mechanism': 'Heavy-duty thermic heat impulse tools',
      'Ideal for': 'Marine deck cargo, long-haul moisture isolation'
    }
  },
  {
    id: 'sea-worthy-packaging',
    name: 'Sea Worthy Packaging',
    category: 'Heavy-Duty Solutions',
    image: '/images/Product%20images/Sea%20worthly%20pakaging.png',
    thumbnails: [
      '/images/Product%20images/Sea%20worthly%20pakaging.png',
      '/images/Product%20images/wood6.jpeg'
    ],
    price: '₹ 3,200 / Box',
    moq: '10 Boxes',
    description: 'Reinforced chemical and weather resistant containers for sea freight.',
    specs: {
      'Material': 'Pre-treated marine plywood and treated solid wood framing',
      'Moisture control': 'Inner VCI liner and silica gel arrays pre-staged',
      'Certification': 'IPPC certified ISPM-15 export marks applied',
      'Reinforcement': 'Zinc plated corner steel straps',
      'Entry frame': '2-Way / 4-Way heavy entry log runners',
      'Ideal for': 'Sea vessel transit deck loading, high humidity ports'
    }
  },
  {
    id: 'on-site-packing',
    name: 'On-Site Packing Services',
    category: 'Heavy-Duty Solutions',
    image: '/images/Product%20images/On%20Site%20pakaging.png',
    thumbnails: [
      '/images/Product%20images/On%20Site%20pakaging.png',
      '/images/Product%20images/wood7.jpeg'
    ],
    price: 'On Request (Custom Quote)',
    moq: '1 Project / Contract',
    description: 'Professional packing crew deployed at your factory to containerize cargo.',
    specs: {
      'Service Location': 'At client production floors / export warehouses',
      'Crew Strength': 'Experienced packing engineers and rigging technicians',
      'Equipment': 'Pneumatic nailers, strapping machines, heat sealers',
      'Scope': 'Rigging, timber boxing, VCI barrier wrap, lashing',
      'Insurance': 'Fully bonded cargo protection handlers',
      'Ideal for': 'Out-of-gauge industrial machinery, industrial relocations'
    }
  },
  {
    id: 'heavy-duty-wooden-boxes',
    name: 'Heavy Duty Wooden Boxes',
    category: 'Premium Wooden & Pallet Solutions',
    image: '/images/Product%20images/Heavy%20duty%20wooden%20boxes.png',
    thumbnails: [
      '/images/Product%20images/Heavy%20duty%20wooden%20boxes.png',
      '/images/Product%20images/wood8.jpeg'
    ],
    price: '₹ 3,500 / Box',
    moq: '10 Boxes',
    description: 'Custom-engineered reinforced heavy box structures supporting high load weights.',
    specs: {
      'Material': 'Premium structural softwood framing and plywood panels',
      'Load Capacity': 'Up to 5,000 kg structural loads',
      'Treatment': 'ISPM-15 certified heat treated logs',
      'Closing system': 'Heavy gauge steel latches or screw patterns',
      'Dimensions': 'Completely custom fabricated to equipment size',
      'Ideal for': 'Oversized equipment, turbines, heavy generators'
    }
  },
  {
    id: 'ispm-15-pine-boxes',
    name: 'ISPM-15 Certified Pine Wood Boxes',
    category: 'Premium Wooden & Pallet Solutions',
    image: '/images/Product%20images/ISPM%2015.png',
    thumbnails: [
      '/images/Product%20images/ISPM%2015.png',
      '/images/Product%20images/wood6.jpeg'
    ],
    price: '₹ 2,800 / Box',
    moq: '15 Boxes',
    description: 'Heat-treated pine cases meeting strict international phytosanitary compliance.',
    specs: {
      'Material': 'Radiata Pine Wood boards',
      'Certification': 'Certified HT (Heat Treated) to core temperature 56°C',
      'IPPC Stamp': 'Official stamp registered with plant quarantine control',
      'Target Regions': 'USA, European Union, Australia, China, UK',
      'Moisture Rating': 'Below 18% kiln-dried timber standards',
      'Ideal for': 'Global food containers, pharmaceuticals, raw steel machinery'
    }
  },
  {
    id: 'plywood-boxes',
    name: 'Premium Plywood Boxes',
    category: 'Premium Wooden & Pallet Solutions',
    image: '/images/Product%20images/PlY%20wood%20boxes.png',
    thumbnails: [
      '/images/Product%20images/PlY%20wood%20boxes.png',
      '/images/Product%20images/wood7.jpeg'
    ],
    price: '₹ 1,800 / Box',
    moq: '20 Boxes',
    description: 'Lighter shipping boxes made from high-strength structural plywood.',
    specs: {
      'Material': 'Hardwood Core plywood sheet panels + Pine frame lines',
      'Thickness range': '9 mm to 18 mm thick plywood sides',
      'Weight factor': 'Up to 35% lighter than solid wood boxes',
      'Pest immunity': 'Inert composition, bypasses quarantine delays',
      'Joint structure': 'Metal clip closures or wire nails',
      'Ideal for': 'Air freight cargo, high value consumer appliances'
    }
  },
  {
    id: 'euro-pallets',
    name: 'Standard Euro Pallets',
    category: 'Premium Wooden & Pallet Solutions',
    image: '/images/Product%20images/Ero%20pallets.png',
    thumbnails: [
      '/images/Product%20images/Ero%20pallets.png',
      '/images/Product%20images/wood8.jpeg'
    ],
    price: '₹ 1,200 / Pallet',
    moq: '50 Pallets',
    description: 'EPAL standards compliant heavy pallets built for automated warehouse rails.',
    specs: {
      'Pallet Material': 'Solid European Pine and Spruce timber boards',
      'Wood Type': 'Radiata Pine / Spruce',
      'Treatment': 'ISPM-15 Heat Treated',
      'Pallet Size': '1200mm x 800mm x 144mm standard EUR specs',
      'Entry Type': '4-Way Entry / EPAL Block structure',
      'Load Capacity': '1,500 kg dynamic load / 4,000 kg static load limit',
      'Destination Region': 'Europe, USA, Middle East, Asia'
    }
  },
  {
    id: 'recycled-wooden-boards',
    name: 'Recycled Wooden Boards',
    category: 'Premium Wooden & Pallet Solutions',
    image: '/images/Product%20images/Recycle%20wood%20Boards.png',
    thumbnails: [
      '/images/Product%20images/Recycle%20wood%20Boards.png',
      '/images/Product%20images/wood6.jpeg'
    ],
    price: '₹ 450 / Board',
    moq: '100 Boards',
    description: 'Circular composite boards upcycled from salvaged factory timber remnants.',
    specs: {
      'Material': 'Reclaimed Pine and mixed timber fragments',
      'Thickness': '18 mm to 25 mm sheets',
      'Surface finish': 'Planed on both sides, sanded smooth options',
      'Density index': 'Standard wood board grading parameters',
      'Resin rating': 'Low chemical emission eco-binding glue',
      'Ideal for': 'Warehouse partitioning, custom crates decking'
    }
  },
  {
    id: 'wooden-packing-crates',
    name: 'Wooden Packing Crates',
    category: 'Premium Wooden & Pallet Solutions',
    image: '/images/Product%20images/Woodden%20Paking%20creates.png',
    thumbnails: [
      '/images/Product%20images/Woodden%20Paking%20creates.png',
      '/images/Product%20images/wood7.jpeg'
    ],
    price: '₹ 1,400 / Crate',
    moq: '40 Crates',
    description: 'Open-slatted ISPM-15 compliant packing crates for ventilated logistics.',
    specs: {
      'Material': 'Kiln dried reclaimed Pine planks',
      'Load Limit': 'Up to 1,000 kg distributed load weights',
      'Ventilation factor': 'Open slate design prevents moisture buildup',
      'ISPM-15 Stamp': 'Kiln HT stamp applied on block runners',
      'Entry Mode': '2-Way / 4-Way forklift entries',
      'Ideal for': 'Fresh produce exports, pumps, heavy castings'
    }
  },
  {
    id: 'recycled-wooden-planks',
    name: 'Recycled Wooden Planks',
    category: 'Premium Wooden & Pallet Solutions',
    image: '/images/Product%20images/Recycle%20woodden%252520planks.png',
    thumbnails: [
      '/images/Product%20images/Recycle%20woodden%20planks.png',
      '/images/Product%20images/wood8.jpeg'
    ],
    price: '₹ 250 / Plank',
    moq: '200 Planks',
    description: 'Graded construction planks salvaged and re-milled for general fabrication.',
    specs: {
      'Material': 'Graded reclaimed structural Pine and mixed softwoods',
      'Size standard': '75 mm to 150 mm width x 20 mm thickness x custom lengths',
      'Moisture index': 'Kiln dried below 15% moisture ratio',
      'Quality grading': 'Metal detected, planed, graded visual surface appearance',
      'Preservative': 'Eco chemical protective dip (optional)',
      'Ideal for': 'Furniture builds, pallet fabrication, framing lumber'
    }
  }
]

// Fallback image path fix for URL encoding issue
allProducts.forEach(p => {
  if (p.id === 'recycled-wooden-planks') {
    p.image = '/images/Product%20images/Recycle%20woodden%20planks.png'
  }
})

function ProductDetailModal({ product, onClose }) {
  const [activeImg, setActiveImg] = useState(product.image)
  const [enquireMode, setEnquireMode] = useState(false)
  const [lead, setLead] = useState({ name: '', phone: '', qty: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Construct pre-filled WhatsApp link
  const waMessage = `Hi Eco Wood Industry, I am interested in the "${product.name}". Please provide specifications and booking details.`
  const waUrl = `https://wa.me/919922887440?text=${encodeURIComponent(waMessage)}`

  const handleEnquireSubmit = async (e) => {
    e.preventDefault()
    if (!lead.name.trim() || !lead.phone.trim() || !lead.qty.trim()) {
      setError('Please fill in all fields')
      return
    }
    setError('')
    setLoading(true)

    try {
      const isLocal = window.location.hostname !== 'www.ecowoodindustries.in' && 
                      window.location.hostname !== 'ecowoodindustries.in' && 
                      !window.location.hostname.endsWith('.vercel.app')
      const endpoint = isLocal
        ? 'http://localhost:5000/api/enquiry'
        : 'https://ecowood-web.onrender.com/api/enquiry'

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          phone: lead.phone,
          qty: lead.qty,
          productName: product.name,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry')

      setSubmitted(true)
      setLead({ name: '', phone: '', qty: '' })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Lock body scroll on mount
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative max-w-5xl w-full bg-white rounded-3xl border border-emerald-600/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10"
      >
        {/* Top header strip */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-800 via-teal-500 to-amber-500 w-full" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 p-2 rounded-full hover:bg-zinc-150 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scroll Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-6 flex flex-col gap-4">
              <div className="relative h-[280px] md:h-[380px] bg-gradient-to-br from-[#faf9f6] to-[#f4f2ec] border border-emerald-600/5 rounded-2xl p-4 flex items-center justify-center shadow-inner overflow-hidden">
                <img
                  src={activeImg}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_6px_16px_rgba(2,44,34,0.08)]"
                />
              </div>

              {/* Thumbnails row */}
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(thumb)}
                    className={`w-16 h-16 rounded-xl border p-1 bg-stone-50/50 flex-shrink-0 flex items-center justify-center overflow-hidden transition-all ${
                      activeImg === thumb ? 'border-emerald-600 ring-2 ring-emerald-500/10' : 'border-emerald-600/10 hover:border-emerald-600/30'
                    }`}
                  >
                    <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-700 py-2 border border-emerald-600/10 hover:border-emerald-600/20 bg-emerald-50/50 rounded-xl transition-all"
              >
                <span>Get More Photos via WhatsApp</span>
                <span>➔</span>
              </a>
            </div>

            {/* Right Column: Specifications & CTA */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 border border-emerald-600/10 text-emerald-800 tracking-wider mb-2">
                  {product.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 font-display mb-1.5 leading-tight">
                  {product.name}
                </h2>
                <p className="text-zinc-650 text-xs md:text-sm font-semibold mb-6">
                  {product.description}
                </p>



                {/* Specs Table */}
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2.5">Technical Specifications</h3>
                <div className="border border-emerald-600/10 rounded-2xl overflow-hidden shadow-inner mb-6">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-12 border-b border-emerald-600/5 last:border-0 text-xs">
                      <div className="col-span-5 bg-stone-50/70 p-3 text-zinc-555 font-bold border-r border-emerald-600/5 flex items-center">{key}</div>
                      <div className="col-span-7 p-3 text-zinc-800 font-bold flex items-center">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons / Contact Block */}
              <div className="space-y-3.5 border-t border-emerald-600/5 pt-6 mt-6">
                {!enquireMode ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="sm:col-span-2 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-xl font-extrabold text-sm transition-all shadow-sm hover:shadow-md"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>WhatsApp Enquiry</span>
                    </a>
                    <a
                      href="tel:9922887440"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-750 text-white py-3.5 rounded-xl font-extrabold text-sm transition-all shadow-sm hover:shadow-md"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Now</span>
                    </a>
                    <button
                      onClick={() => setEnquireMode(true)}
                      className="sm:col-span-3 w-full inline-flex items-center justify-center gap-1.5 py-3 border border-emerald-600/15 hover:bg-emerald-50/30 text-emerald-850 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all"
                    >
                      <Clipboard className="w-4 h-4" />
                      <span>Yes, I am interested!</span>
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-[#FAF9F5] border border-emerald-600/10 rounded-2xl p-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold text-emerald-850 uppercase tracking-wider">Quick Quotation Enquiry</h4>
                      <button onClick={() => setEnquireMode(false)} className="text-zinc-400 hover:text-zinc-655">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {!submitted ? (
                      <form onSubmit={handleEnquireSubmit} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={lead.name}
                            onChange={(e) => setLead({ ...lead, name: e.target.value })}
                            disabled={loading}
                            className="bg-white border border-emerald-600/10 rounded-xl px-3.5 py-2 text-xs text-zinc-800 font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                          />
                          <input
                            type="text"
                            placeholder="Mobile No."
                            value={lead.phone}
                            onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                            disabled={loading}
                            className="bg-white border border-emerald-600/10 rounded-xl px-3.5 py-2 text-xs text-zinc-800 font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                          />
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Quantity Required (e.g. 500 pcs)"
                            value={lead.qty}
                            onChange={(e) => setLead({ ...lead, qty: e.target.value })}
                            disabled={loading}
                            className="flex-1 bg-white border border-emerald-600/10 rounded-xl px-3.5 py-2 text-xs text-zinc-800 font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                          />
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-emerald-800 hover:bg-emerald-750 text-white px-5 rounded-xl font-bold text-xs uppercase transition-all shadow-sm disabled:opacity-50 min-w-[80px] flex items-center justify-center"
                          >
                            {loading ? 'Sending...' : 'Send'}
                          </button>
                        </div>
                        {error && <p className="text-[10px] text-red-500 font-bold">{error}</p>}
                      </form>
                    ) : (
                      <div className="text-center py-4 flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-600/15 flex items-center justify-center text-emerald-800">
                          <Check className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-extrabold text-emerald-850">Request Submitted Successfully!</p>
                        <p className="text-[10px] text-zinc-500 font-semibold">Our sales team will contact you shortly.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ProductCard({ product, onSelect }) {
  return (
    <motion.div
      variants={scaleIn}
      className="group bg-white rounded-3xl border border-emerald-600/5 hover:border-emerald-600/15 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
    >
      {/* Dynamic Internal Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Product Image Panel */}
      <div className="relative h-52 bg-gradient-to-br from-[#faf9f6] to-[#f4f2ec] flex items-center justify-center p-6 border-b border-emerald-600/5 overflow-hidden z-10">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain filter drop-shadow-[0_6px_12px_rgba(2,44,34,0.06)]"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase bg-white/90 border border-emerald-600/10 text-emerald-800 shadow-sm backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Info details */}
      <div className="p-6 flex-1 flex flex-col justify-between z-10 relative">
        <div>
          <h3 className="text-lg font-extrabold text-zinc-950 font-display mb-2">
            {product.name}
          </h3>
          <p className="text-zinc-650 text-xs leading-relaxed font-semibold">
            {product.description}
          </p>
        </div>

        {/* Compact stats strip */}
        <div className="border-t border-emerald-600/5 pt-4.5 mt-4.5 flex justify-end text-xs">
          <button
            onClick={() => onSelect(product)}
            className="inline-flex items-center gap-1.5 bg-emerald-55/60 border border-emerald-600/10 px-4 py-2 rounded-xl text-xs font-extrabold text-emerald-850 hover:bg-emerald-100 hover:text-emerald-900 transition-all shadow-sm"
          >
            <span>View Specifications</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Premium Wooden & Pallet Solutions')
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Fast Client-Side Search and Filter Logic
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      activeCategory === 'All Products' || product.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-emerald-100/70 via-[#f4f2ec]/85 to-amber-100/70 pt-24 pb-12 rounded-3xl text-center border border-emerald-600/20 shadow-md overflow-hidden mb-16 mx-4 backdrop-blur-md"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 px-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex bg-emerald-50 border border-emerald-600/20 text-emerald-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
            >
              Sourcing Catalogue
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-extrabold text-zinc-950 mb-6 font-display drop-shadow-sm"
            >
              Sourcing <span className="bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">Products</span>
            </motion.h1>

            <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full mx-auto mb-6" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-zinc-650 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-semibold"
            >
              Browse our complete catalog of industrial packaging materials, VCI rust guards, and kiln-dried ISPM-15 export pallets.
            </motion.p>
          </div>
        </motion.div>

        {/* Catalog Control Center */}
        <section className="mb-12 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="bg-white/80 border border-emerald-600/10 rounded-3xl p-6 md:p-8 shadow-md backdrop-blur-md relative overflow-hidden flex flex-col gap-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none" />

            {/* Search Bar Block */}
            <div className="relative w-full">
              <Search className="w-5 h-5 text-emerald-800/40 absolute left-4.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-emerald-800" />
              <input
                type="text"
                placeholder="Search catalog by name or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-emerald-600/10 rounded-2xl pl-12 pr-5 py-4 text-sm text-zinc-800 font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 focus:bg-white shadow-inner transition-all duration-300"
              />
            </div>

            {/* Category Selection Tabs */}
            <div>
              <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3.5 pl-1">Filter by category</span>
              <div className="flex flex-wrap gap-2.5">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat
                  return (
                    <motion.button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative px-5 py-3 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all duration-300 border flex items-center gap-1.5 shadow-sm ${
                        isActive
                          ? 'bg-emerald-800 border-emerald-800 text-white shadow-md'
                          : 'bg-white hover:bg-[#FAF9F5] text-zinc-650 border-emerald-600/10 hover:border-emerald-600/30'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeIndicator"
                          className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span>{cat}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Products Grid */}
        <section className="px-4">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setSelectedProduct}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-stone-50/50 border border-dashed border-emerald-600/10 rounded-3xl max-w-md mx-auto">
              <p className="text-sm font-bold text-zinc-550">No products match your search query.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All Products') }}
                className="mt-3 text-xs font-extrabold text-emerald-850 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Interactive Detail Specifications Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </Layout>
  )
}
