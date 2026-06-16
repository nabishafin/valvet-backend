const { z } = require('zod')

const blogSchema = z.object({
  title:       z.string().min(1),
  excerpt:     z.string().optional(),
  content:     z.string().min(1),
  coverImage:  z.string().url().optional(),
  author:      z.string().optional(),
  tags:        z.array(z.string()).optional(),
  category:    z.string().optional(),
  isPublished: z.boolean().optional(),
})

const updateBlogSchema = blogSchema.partial()

module.exports = { blogSchema, updateBlogSchema }
