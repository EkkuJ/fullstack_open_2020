import React, { useState, useEffect, useRef } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import NavigationBar from './components/NavigationBar'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserView from './components/UserView'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [notification, setNotification] = useState(null)
  const [success, setSuccess] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const match = useRouteMatch('/users/:id')
  const viewedUser = match ? users.find((u) => u.id === match.params.id) : null

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

    const fetchUsers = async () => {
      try {
        const response = await userService.getAll()
        setUsers(response)
      } catch (exception) {
        setSuccess(false)
        showNotification('Was unable to get users')
      }
    }
    fetchBlogs()
    fetchUsers()
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

  const handleLike = (id, likeBlog) => {
    blogService.likeBlog(id, likeBlog)
  }

  const showNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const centerOnScreen = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25%',
  }

  const margin = { margin: '15px' }

  if (user === null) {
    return (
      <div style={centerOnScreen}>
        <Card>
          <Card.Body style={margin}>
            <Notification success={success} message={notification} />
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          </Card.Body>
        </Card>
      </div>
    )
  }

  return (
    <div className="container">
      <NavigationBar user={user} handleLogout={handleLogout} />
      <Switch>
        <Route path="/users/:id">
          <UserView user={viewedUser} />
        </Route>
        <Route path="/users">
          <UserList users={users} />
        </Route>
        <Route path="/">
          <Notification success={success} message={notification} />
          <BlogList
            blogs={blogs}
            handleRemove={handleRemove}
            user={user}
            handleLike={handleLike}
            blogFormRef={blogFormRef}
            handleBlogPost={handleBlogPost}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App
