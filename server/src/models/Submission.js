const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  distance: { type: String, required: true },
  woodPhotos: [{ type: String }],   // Cloudinary URLs
  geoPhoto: { type: String },       // Cloudinary URL
  submittedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Submission', submissionSchema)
