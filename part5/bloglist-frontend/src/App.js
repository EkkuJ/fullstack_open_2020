import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [success, setSuccess] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem(
          'blog-list-logged-user',
        )
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          blogService.setToken(user.token)
          setUser(user)
        }
        const response = await blogService.getAll()
        const sortedBlogs = response.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      } catch (exception) {
        setSuccess(false)
        showNotification('Was unable to get blog posts')
      }
    }
    fetchBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('blog-list-logged-user', JSON.stringify(user))
    } catch (exception) {
      setSuccess(false)
      showNotification('Wrong username and/or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blog-list-logged-user')
    setUser(null)
    setSuccess(true)
    showNotification('Successfully logged out')
  }

  const handleBlogPost = (blogObject) => {
    try {
      blogService.postBlog(blogObject).then((response) => {
        setBlogs(blogs.concat(response))
        setSuccess(true)
        showNotification(
          `${response.title} by ${response.author} added successfully.`,
        )
      })
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setSuccess(false)
      showNotification('Was unable to post blog')
    }
  }

  const handleRemove = (blog) => {
    try {
      blogService.deleteBlog(blog.id).then(() => {
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        setSuccess(false)
        showNotification(`Removed ${blog.title} by ${blog.author}`)
      })
    } catch (exception) {
      setSuccess(false)
      showNotification(exception.toString())
    }
  }

  const showNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification success={success} message={notification} />
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        Logged in as {user.username}{' '}
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="New blog post" ref={blogFormRef}>
        <BlogForm handleBlogPost={handleBlogPost} />
      </Togglable>
      <Notification success={success} message={notification} />
      <BlogList blogs={blogs} handleRemove={handleRemove} user={user}/>
    </div>
  )
}

export default App
