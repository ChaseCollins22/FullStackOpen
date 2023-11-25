const router = require('express').Router()
const Blog = require('../models/blogDB');
const User = require('../models/userDB')
const jwt = require('jsonwebtoken')
require('express-async-errors')
require('dotenv').config()

router.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', { blogs: 0 })
  response.json(allBlogs)
})

router.post('/', async (request, response) => {
  const decodedToken = await jwt.verify(request.token, process.env.SECRET)
  
  const newBlog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: decodedToken.id
  })
  
  const savedBlog = await newBlog.save() 

  const userData = request.user

  await User
    .findByIdAndUpdate( 
      decodedToken.id,
      { 
        ...userData,
        blogs: [...userData.blogs, savedBlog.id]
      },
      { 
        new: true,
        context: 'query'
      }
    )

  response.status(201).json(savedBlog).end()
})

router.delete('/:id', async (request, response) => {
  const id = request.params.id
  const user = request.user
  const blogToDelete = await Blog.findById(id)

  if (String(blogToDelete.user) === String(user._id)) {
    const deletedBlog = await Blog.findByIdAndDelete(id)
    response.status(200).json(deletedBlog)
  } else {
    response.status(401).json('Sorry, you do not have permission to delete this blog post')
  }
})

router.put('/:id', async (request, response) => {
  const { id, title, author, url , likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updatedBlog)
})

module.exports = router