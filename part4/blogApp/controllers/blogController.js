const router = require('express').Router()
const Blog = require('../models/blogDB');
const User = require('../models/userDB')

router.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user')
  response.json(allBlogs)
})

router.post('/', async (request, response) => {
  const user = await User.find({})

  const newBlog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user[0]
  })
  
  const savedBlog = await newBlog.save()
  console.log(savedBlog);
  console.log(`${savedBlog.title} by ${savedBlog.author} successfully saved!`)
  console.log('ZERO', user[0]._doc);
  const updatedUser = await User.findByIdAndUpdate(
    user[0].id,
    // { id: user[0].id, name: user[0].name, username: user[0].username, blogs: [...user[0].blogs, savedBlog.id] },
    { ...user[0]._doc, blogs: [...user[0]._doc.blogs, savedBlog.id] },
    { new: true, runValidators: false, context: 'query' }
  )
  console.log(updatedUser);
  response.status(201).json(savedBlog).end()
  
})

router.delete('/:id', async (request, response) => {
  const id = request.params.id
  const deletedBlog = await Blog.findByIdAndDelete(id)
  response.status(200).json(deletedBlog)
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