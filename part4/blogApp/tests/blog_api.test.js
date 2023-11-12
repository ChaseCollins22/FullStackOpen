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