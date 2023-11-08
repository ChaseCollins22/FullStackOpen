const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
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