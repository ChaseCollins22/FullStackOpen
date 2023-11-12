const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: Number 
})

blogSchema.set('toJSON', {
  transform: (doc, blog) => {
    const id = String(blog._id)
    delete blog.__v
    delete blog._id
    return {
      id,
      ...blog
    }
  }
})

module.exports = mongoose.model('Blog', blogSchema)