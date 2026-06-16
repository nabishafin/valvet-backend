const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    slug:        { type: String, unique: true, required: true, lowercase: true, trim: true },
    title:       { type: String, required: true, trim: true },
    excerpt:     { type: String, trim: true },
    content:     { type: String, required: true },
    coverImage:  { type: String },
    author:      { type: String, trim: true, default: 'Velvet Rouge Team' },
    tags:        { type: [String], default: [] },
    category:    { type: String, trim: true },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Blog', blogSchema)
