const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('⚠️  MONGO_URI is not set. Database operations will be bypassed.')
      return
    }
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    console.warn('⚠️  Running server without active database connection.')
  }
}

module.exports = connectDB
