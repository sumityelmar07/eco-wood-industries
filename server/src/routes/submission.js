const express = require('express')
const router = express.Router()
const { upload } = require('../config/cloudinary')
const Submission = require('../models/Submission')
const transporter = require('../config/mailer')

// multer fields: woodPhotos (multiple) + geoPhoto (single)
const uploadFields = upload.fields([
  { name: 'woodPhotos', maxCount: 10 },
  { name: 'geoPhoto', maxCount: 1 },
])

router.post('/', (req, res) => {
  uploadFields(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err)
      return res.status(500).json({ error: 'Image upload failed' })
    }

    try {
      const { name, email, distance } = req.body

      if (!name || !email || !distance) {
        return res.status(400).json({ error: 'Name, email and distance are required' })
      }

      // collect uploaded image URLs from Cloudinary
      const woodPhotos = (req.files?.woodPhotos || []).map(f => f.path)
      const geoPhoto = req.files?.geoPhoto?.[0]?.path || null

      // save to MongoDB
      const submission = await Submission.create({
        name, email, distance, woodPhotos, geoPhoto,
      })

      // build email HTML
      const woodImgTags = woodPhotos.map((url, i) =>
        `<p><strong>Wood Photo ${i + 1}:</strong><br/>
         <a href="${url}"><img src="${url}" width="300" style="border-radius:8px;margin-top:6px;" /></a></p>`
      ).join('')

      const geoImgTag = geoPhoto
        ? `<p><strong>Geo-Tagged Photo:</strong><br/>
           <a href="${geoPhoto}"><img src="${geoPhoto}" width="300" style="border-radius:8px;margin-top:6px;" /></a></p>`
        : '<p>No geo-tagged photo provided.</p>'

      const mailOptions = {
        from: `"Eco Wood Industries" <${process.env.GMAIL_USER}>`,
        to: process.env.FOUNDER_EMAIL,
        subject: `📦 New Scrap Wood Submission from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
            <div style="background:#166534;padding:24px;text-align:center;">
              <h1 style="color:white;margin:0;font-size:22px;">🌿 Eco Wood Industries</h1>
              <p style="color:#86efac;margin:6px 0 0;">New Scrap Wood Submission</p>
            </div>
            <div style="padding:24px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px;color:#555;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
                <tr style="background:#f9f9f9;"><td style="padding:8px;color:#555;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding:8px;color:#555;font-weight:bold;">Distance / Location</td><td style="padding:8px;">${distance}</td></tr>
                <tr style="background:#f9f9f9;"><td style="padding:8px;color:#555;font-weight:bold;">Submitted At</td><td style="padding:8px;">${new Date().toLocaleString('en-IN')}</td></tr>
              </table>
              <hr style="margin:20px 0;border:none;border-top:1px solid #eee;" />
              <h3 style="color:#166534;">📸 Scrap Wood Photos</h3>
              ${woodImgTags || '<p>No wood photos uploaded.</p>'}
              <h3 style="color:#166534;">📍 Geo-Tagged Photo</h3>
              ${geoImgTag}
            </div>
            <div style="background:#f0fdf4;padding:16px;text-align:center;font-size:12px;color:#888;">
              This is an automated submission report from ecowoodindustries.in
            </div>
          </div>
        `,
      }

      await transporter.sendMail(mailOptions)

      res.status(201).json({
        success: true,
        message: 'Submission received. Email sent to founder.',
        id: submission._id,
      })

    } catch (error) {
      console.error('Submission error:', error)
      res.status(500).json({ error: 'Something went wrong. Please try again.' })
    }
  })
})

module.exports = router
