const nodemailer = require('nodemailer')
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = require('./index')

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  tls: { rejectUnauthorized: false },
})

transporter.verify((error) => {
  if (error) {
    console.error('SMTP connection failed:', error.message)
  } else {
    console.log('SMTP server is ready to send emails')
  }
})

module.exports = transporter
