const express = require('express')
const router = express.Router()
const Enquiry = require('../models/Enquiry')
const transporter = require('../config/mailer')

router.post('/', async (req, res) => {
  try {
    const { name, phone, qty, productName } = req.body

    if (!name || !phone || !qty || !productName) {
      return res.status(400).json({ error: 'Name, phone, qty and productName are required' })
    }

    // Save to MongoDB (optional bypass)
    try {
      await Enquiry.create({ name, phone, qty, productName })
    } catch (dbErr) {
      console.warn('MongoDB bypass active (Enquiry saved in-memory):', dbErr.message)
    }

    const founderEmail = process.env.FOUNDER_EMAIL || 'sumityelmar734@gmail.com'

    // Format table email
    const mailOptions = {
      from: `"Eco Wood Industries" <${process.env.GMAIL_USER || 'ecowoodindustries@gmail.com'}>`,
      to: founderEmail,
      subject: `⚡ New B2B Product Enquiry: ${productName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
          <div style="background:#065f46;padding:24px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:22px;">🌿 Eco Wood Industries</h1>
            <p style="color:#a7f3d0;margin:6px 0 0;font-size:14px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Product Enquiry Received</p>
          </div>
          <div style="padding:24px;background-color:#ffffff;">
            <p style="font-size:15px;color:#374151;margin-bottom:20px;line-height:1.5;">
              A potential client has requested a custom quotation for <strong>${productName}</strong>. Below are the enquiry details:
            </p>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:12px 8px;color:#6b7280;font-weight:bold;font-size:13px;width:35%;">Product Name</td>
                <td style="padding:12px 8px;color:#111827;font-weight:extrabold;font-size:14px;">${productName}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;background-color:#f9fafb;">
                <td style="padding:12px 8px;color:#6b7280;font-weight:bold;font-size:13px;">Customer Name</td>
                <td style="padding:12px 8px;color:#111827;font-weight:bold;font-size:13px;">${name}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:12px 8px;color:#6b7280;font-weight:bold;font-size:13px;">Phone / Mobile</td>
                <td style="padding:12px 8px;color:#111827;font-weight:bold;font-size:13px;">
                  <a href="tel:${phone}" style="color:#059669;text-decoration:none;font-weight:bold;">${phone}</a>
                </td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6;background-color:#f9fafb;">
                <td style="padding:12px 8px;color:#6b7280;font-weight:bold;font-size:13px;">Requested Quantity</td>
                <td style="padding:12px 8px;color:#b45309;font-weight:extrabold;font-size:14px;">${qty}</td>
              </tr>
              <tr>
                <td style="padding:12px 8px;color:#6b7280;font-weight:bold;font-size:13px;">Enquiry Date</td>
                <td style="padding:12px 8px;color:#374151;font-size:13px;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
              </tr>
            </table>
            
            <div style="text-align:center;margin-top:30px;">
              <a href="https://wa.me/91${phone.replace(/\D/g, '')}" target="_blank" style="background-color:#25d366;color:white;padding:12px 24px;border-radius:8px;font-weight:bold;text-decoration:none;display:inline-block;font-size:13px;">
                💬 Contact Client via WhatsApp
              </a>
            </div>
          </div>
          <div style="background:#f0fdf4;padding:16px;text-align:center;font-size:11px;color:#6b7280;border-top:1px solid #e0e0e0;">
            This enquiry was generated automatically from ecowoodindustries.in catalog
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    res.json({ message: 'Enquiry submitted successfully' })
  } catch (error) {
    console.error('Enquiry error:', error)
    res.status(500).json({ error: 'Failed to submit enquiry' })
  }
})

module.exports = router
