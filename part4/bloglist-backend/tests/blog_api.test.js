const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app);
const Blog = require('../models/blogDB')
const testData = require('./test_data')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('DB cleared');

  const blogs = testData.map(blog => new Blog(blog))
  const blogPromises = blogs.map(blog => blog.save())
  await Promise.all(blogPromises)

  console.log('DB test data added');
}, 100000)

test('blogs are received as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are received', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(testData.length)
})

test("all blogs '_id' property is received as 'id'", async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('a new blog post can be added', async () => {
  const testBlog = {
    title: 'This is a test blog',
    author: 'Chase Collins',
    url: 'https://testblog.com',
    likes: 543 
  }

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(testData.length + 1)
  
  const testBlogFromDB = response.body.find(blog => blog.title === testBlog.title)
  delete testBlogFromDB.id
  expect(testBlogFromDB).toEqual(testBlog)
})

test("If 'likes' property is omitted, its value is set to default to 0", async () => {
  const testBlog = {
    title: 'This is a test blog',
    author: 'Chase Collins',
    url: 'https://testblog.com',
  }

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  const testBlogFromDB = response.body.find(blog => blog.title === testBlog.title)
  expect(testBlogFromDB.likes).toBe(0)
})

test("If 'title' property is omitted, server responds with 400 bad request", async () => {
  const testBlog = {
    author: 'Chase Collins',
    url: 'https://testblog.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(400)

}, 10000)

test("If 'url' property is omitted, server responds with 400 bad request", async () => {
  const testBlog = {
    title: 'This a blog title',
    author: 'Chase Collins',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(400)

}, 10000)

test('Delete a blog post by ID', async () => {
  const testBlog = {
    title: 'Uh oh, I am going to be deleted soon',
    author: 'Deez Nuts',
    url: 'http://getdeleted.org',
    likes: 16
  }

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await api.get('/api/blogs')
  expect(allBlogs.body).toHaveLength(testData.length + 1)

  const testBlogId = allBlogs.body.find(blog => blog.title === testBlog.title).id

  const deletedBlog = await api.delete(`/api/blogs/${testBlogId}`)
  expect(deletedBlog.status).toBe(200)
  expect({ ...testBlog, id: testBlogId }).toEqual(deletedBlog.body)
  
  const allBlogsInDb = await api.get('/api/blogs')
  expect(allBlogsInDb.body).toHaveLength(testData.length)  
})

test('Update the number of likes of an existing blog post', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]

  console.log('BLOG TO UPDATE:', firstBlog);

  const updatedBlog = await api
    .put(`/api/blogs/${firstBlog.id}`)
    .send({ 
      ...firstBlog,
      likes: 69
    })
  expect(updatedBlog.status).toBe(200)
  expect(updatedBlog.type).toBe('application/json')
  expect(updatedBlog.body).toEqual({ ...firstBlog, likes: 69 })

  console.log('EXPECTING BLOG TO HAVE 69 LIKES', updatedBlog.body);


})

afterAll(async () => {
  await mongoose.connection.close()
})