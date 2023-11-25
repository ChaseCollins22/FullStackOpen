import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleNewBlog = async (e) => {
    e.preventDefault()

    const blogObj = {
      title: e.target[0].value,
      author: e.target[1].value,
      url: e.target[2].value
    }

    const blog = await blogService.createBlog(blogObj)
    for (const formField of e.target) {
      formField.value = ''
    }

    setNotification(`${blog.title} by ${blog.author} successfully added`)
    fetchBlogs()

    setTimeout(() => {
      setNotification(null)
    }, 5000);
  }
  
  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const existingUser = window.localStorage.getItem('user')
    if (existingUser) {
      const user = JSON.parse(existingUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
   
    const credentials = {
      username: e.target[0].value,
      password: e.target[1].value
    }
 
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      console.log(e);
      setNotification(e.response.data.error)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  
  if (user) {
    return (
      <>
        <span>{ user.username } is logged in</span>
        <button onClick={ handleLogout }>Logout</button>
        {notification && <p className='notification success-notification'>{notification}</p>}
        <h2>Create New</h2>
        <BlogForm handleSubmit={handleNewBlog}/>
        <h2>All Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
      </>
    )
  } else {
    return (
      <>
        <h2>Login</h2>
        {notification && <p className='notification failure-notification'>{notification}</p>}
        <LoginForm handleSubmit={handleLogin} />
      </>
    )
  }
}

export default App