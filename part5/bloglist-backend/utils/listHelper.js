const dummyFunction = (blogs) => {
  return 1
}

const getTotalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => blog.likes + totalLikes , 0);
}

const getMostPopularBlog = (blogs) => {
  return blogs.reduce((mostPopularBlog, blog) => {
    if (blog.likes > mostPopularBlog.likes) {
      mostPopularBlog = blog
    }
    return mostPopularBlog
  })
}

const getAuthorWithMostBlogs = (blogs) => {
  const authorBlogCount = {}
  blogs.forEach(blog => {
    authorBlogCount[blog.author] = authorBlogCount[blog.author] || { author: blog.author, numBlogs: 0 }
    authorBlogCount[blog.author].numBlogs += 1
  })

  return Object.values(authorBlogCount).reduce((authorWithMostBlogs, author) => {
    if (author.numBlogs > authorWithMostBlogs.numBlogs) {
      authorWithMostBlogs = author
    }
    return authorWithMostBlogs
  })
}

const getMostPopularAuthor = (blogs) => {
  const authorLikesCount = {}
  blogs.forEach(blog => {
    authorLikesCount[blog.author] = authorLikesCount[blog.author] || { author: blog.author, totalLikes: 0 }
    authorLikesCount[blog.author].totalLikes += blog.likes
  })

  return Object.values(authorLikesCount).reduce((mostPopularAuthor, author) => {
    if (author.totalLikes > mostPopularAuthor.totalLikes) {
      mostPopularAuthor = author
    }
    return mostPopularAuthor
  })
}


module.exports = { 
  dummyFunction,
  getTotalLikes,
  getMostPopularBlog,
  getAuthorWithMostBlogs,
  getMostPopularAuthor
}