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

const sendInstantBookingEmail = async ({ service, date, time, name, email, phone, message }) => {
  const dateStr = new Date(date).toDateString()

  await transporter.sendMail({
    from,
    to: ADMIN_EMAIL,
    subject: `New Appointment Request — ${name || 'Guest'}`,
    html: `
      <h2>New Appointment Request</h2>
      ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
      <p><strong>Date:</strong> ${dateStr}</p>
      ${time    ? `<p><strong>Time:</strong> ${time}</p>`                              : ''}
      ${name    ? `<p><strong>Name:</strong> ${name}</p>`                              : ''}
      ${email   ? `<p><strong>Email:</strong> ${email}</p>`                            : ''}
      ${phone   ? `<p><strong>Phone:</strong> ${phone}</p>`                            : ''}
      ${message ? `<p><strong>Message:</strong></p><blockquote>${message}</blockquote>` : ''}
    `,
  })
}

const sendBookingConfirmationToClient = async ({ service, date, time, name, email, phone, message }) => {
  const dateStr = new Date(date).toDateString()

  await transporter.sendMail({
    from,
    to: email,
    subject: 'Your Appointment Request — Velvet Rouge Salon Suites',
    html: `
      <h2>Thank you, ${name || 'valued client'}!</h2>
      <p>We have received your appointment request at <strong>Velvet Rouge Salon Suites</strong>. We will confirm your booking shortly.</p>
      <hr/>
      <h3>Appointment Details</h3>
      ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
      <p><strong>Requested Date:</strong> ${dateStr}</p>
      ${time    ? `<p><strong>Requested Time:</strong> ${time}</p>` : ''}
      ${phone   ? `<p><strong>Phone:</strong> ${phone}</p>`         : ''}
      ${message ? `<p><strong>Your Message:</strong></p><blockquote>${message}</blockquote>` : ''}
      <hr/>
      <p>If you have any questions, feel free to reply to this email or contact us directly.</p>
      <p>— The Velvet Rouge Team</p>
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

const sendAppointmentConfirmedEmail = async ({ name, email, service, date, time }) => {
  const dateStr = new Date(date).toDateString()

  await transporter.sendMail({
    from,
    to: email,
    subject: 'Appointment Confirmed — Velvet Rouge Salon Suites',
    html: `
      <h2>Your Appointment is Confirmed!</h2>
      <p>Dear ${name || 'valued client'},</p>
      <p>We are pleased to confirm your appointment at <strong>Velvet Rouge Salon Suites</strong>.</p>
      <hr/>
      <h3>Appointment Details</h3>
      ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
      <p><strong>Date:</strong> ${dateStr}</p>
      ${time ? `<p><strong>Time:</strong> ${time}</p>` : ''}
      <hr/>
      <p>We look forward to seeing you! If you need to reschedule or have any questions, please contact us.</p>
      <p>— The Velvet Rouge Team</p>
    `,
  })
}

const sendWelcomeEmail = async ({ email }) => {
  await transporter.sendMail({
    from,
    to: email,
    subject: 'Welcome to Velvet Rouge Salon Suites!',
    html: `
      <h2>Welcome to the Velvet Rouge Family!</h2>
      <p>Thank you for subscribing to <strong>Maison Letters</strong>.</p>
      <p>You will now receive exclusive invitations and beauty insights straight to your inbox.</p>
      <br/>
      <p>— The Velvet Rouge Team</p>
    `,
  })
}

module.exports = { sendContactNotification, sendInstantBookingEmail, sendBookingConfirmationToClient, sendAppointmentConfirmedEmail, sendOtpEmail, sendWelcomeEmail }
