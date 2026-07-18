const mongoose = require('mongoose')

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  qty: { type: String, required: true, trim: true },
  productName: { type: String, required: true, trim: true },
  submittedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Enquiry', enquirySchema)
