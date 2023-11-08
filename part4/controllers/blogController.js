const router = require('express').Router()
const Blog = require('../models/blogDB');

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
    likes: request.body.likes
  })

  newBlog
    .save()
    .then((blog) => {
      console.log(`${blog.title} by ${blog.author} successfully saved!`)
      response.json(blog).end()
    })
    .catch(error => console.log(error))
})

module.exports = router