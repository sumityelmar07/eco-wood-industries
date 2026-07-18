const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

let storage
const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                    process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
                    process.env.CLOUDINARY_CLOUD_NAME.trim() !== '' &&
                    process.env.CLOUDINARY_API_KEY &&
                    process.env.CLOUDINARY_API_SECRET

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'eco-wood-submissions',
      resource_type: 'image',
    },
  })
} else {
  console.warn('⚠️  Cloudinary credentials missing or default. Falling back to local disk storage.')
  const uploadDir = path.join(__dirname, '../../uploads')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
  
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
  })
}

const upload = multer({ storage })

module.exports = { cloudinary, upload }
