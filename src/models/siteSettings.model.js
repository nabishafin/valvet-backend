const mongoose = require('mongoose')

const siteSettingsSchema = new mongoose.Schema(
  {
    name:    { type: String, trim: true },
    tagline: { type: String, trim: true },
    logo:    { type: String, trim: true },

    founder: {
      name:  { type: String, trim: true },
      role:  { type: String, trim: true },
      image: { type: String, trim: true },
    },

    contact: {
      phone:    { type: String, trim: true },
      email:    { type: String, trim: true },
      whatsapp: { type: String, trim: true },
      address:  { type: String, trim: true },
    },

    socials: {
      instagram: { type: String, trim: true },
      facebook:  { type: String, trim: true },
      twitter:   { type: String, trim: true },
      whatsapp:  { type: String, trim: true },
    },

    openingHours: {
      weekdays: { type: String, trim: true },
      saturday: { type: String, trim: true },
      sunday:   { type: String, trim: true },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('SiteSettings', siteSettingsSchema)
