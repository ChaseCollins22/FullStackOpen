const router = require('express').Router()
const Blog = require('../models/blogDB');

router.get('/', (request, response) => {
  return response.send('<h1>Welcome to my blog muthafucka</h1>')
})

router.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then((blogs) => response.json(blogs))
})

router.post('/api/blogs', (request, response) => {
  console.log(request.body);
  const newBlog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0 
  })

  newBlog
    .save()
    .then((blog) => {
      console.log(`${blog.title} by ${blog.author} successfully saved!`)
      response.status(201).json(blog).end()
    })
    .catch(error => response.status(400).end())
})

module.exports = router