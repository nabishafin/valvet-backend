const mongoose = require('mongoose')

const instantBookingSchema = new mongoose.Schema(
  {
    service:        { type: String, trim: true },
    teamMemberId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    teamMemberName: { type: String, trim: true },
    date:           { type: Date, required: true },
    time:           { type: String, trim: true },
    name:           { type: String, trim: true },
    email:          { type: String, lowercase: true, trim: true },
    phone:          { type: String, trim: true },
    message:        { type: String },
    status:         { type: String, enum: ['new', 'pending', 'resolved'], default: 'new' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('InstantBooking', instantBookingSchema)
