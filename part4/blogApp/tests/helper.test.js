const listHelper = require('../utils/listHelper')

const multipleBlogList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

test('dummy fn returns one', () => {
  const blogs = []

  const result = listHelper.dummyFunction(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const singleBlogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ];

  test('when blog list has only one blog, total likes are equal to the number likes in that blog', () => {
    const result = listHelper.getTotalLikes(singleBlogList)
    expect(result).toBe(5)
  })

  test('when blog list is empty, total likes should be 0', () => {
    const result = listHelper.getTotalLikes([])
    expect(result).toBe(0)
  })

  test('when there are > 1 blog posts in list, total should be the sum of all their likes', () => {
    const result = listHelper.getTotalLikes(multipleBlogList)
    expect(result).toBe(36)
  })
})

describe('most popular blog', () => {
  test('multiple blogs in list, should return the blog obj with the most likes', () => {
    const result = listHelper.getMostPopularBlog(multipleBlogList)
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})

describe('Author with most blog posts', () => {
  test('Blog list with > 1 blog posts; blog list with > 1 diferent authors; should return obj containing author with the most blog posts', () => {
    const result = listHelper.getAuthorWithMostBlogs(multipleBlogList)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      numBlogs: 3
    })
  })
})

describe('Author with most likes', () => {
  test('Blog list > 1 blog posts; blog list > 1 different authors; should return obj containing the most popular author and their total number of likes', () => {
    const result = listHelper.getMostPopularAuthor(multipleBlogList)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      totalLikes: 17
    })
  })
})