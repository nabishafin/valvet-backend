const transporter = require('../config/email')
const { SMTP_USER, ADMIN_EMAIL } = require('../config')

const from = `"Velvet Rouge" <${SMTP_USER}>`

const sendContactNotification = async ({ name, email, phone, message }) => {
  await transporter.sendMail({
    from,
    to: ADMIN_EMAIL,
    subject: `New Contact Message from ${name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <blockquote>${message}</blockquote>
    `,
  })
}

const sendInstantBookingEmail = async ({ service, date, name, email, phone, message }) => {
  const dateStr = new Date(date).toDateString()

  await transporter.sendMail({
    from,
    to: ADMIN_EMAIL,
    subject: `Instant Booking Request — ${service}`,
    html: `
      <h2>New Instant Booking Request</h2>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${dateStr}</p>
      ${name  ? `<p><strong>Name:</strong> ${name}</p>`   : ''}
      ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
      ${phone   ? `<p><strong>Phone:</strong> ${phone}</p>`                         : ''}
      ${message ? `<p><strong>Message:</strong></p><blockquote>${message}</blockquote>` : ''}
    `,
  })
}

const sendOtpEmail = async ({ email, otp }) => {
  await transporter.sendMail({
    from,
    to: email,
    subject: 'Password Reset OTP — Velvet Rouge',
    html: `
      <h2>Password Reset Request</h2>
      <p>Your OTP code is:</p>
      <h1 style="letter-spacing:8px;">${otp}</h1>
      <p>This code expires in <strong>10 minutes</strong>.</p>
      <p>If you didn't request this, ignore this email.</p>
      <br/><p>— The Velvet Rouge Team</p>
    `,
  })
}

module.exports = { sendContactNotification, sendInstantBookingEmail, sendOtpEmail }
