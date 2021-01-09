import React, { useState } from 'react'
//import Blog from './Blog'
import { Col, Container, Row, Button, ButtonGroup } from 'react-bootstrap'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blog = ({ blog, handleRemove, user, handleLike }) => {
  const [detailView, setDetailView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const canRemove = user.username === blog.user.username

  const detailStyle = {
    marginTop: '1em',
  }

  const handleViewHide = () => {
    setDetailView(!detailView)
  }

  const handleLikeClick = () => {
    const likedBlog = { ...blog, likes: likes + 1 }
    handleLike(blog.id, likedBlog)
    setLikes(likes + 1)
  }

  const handleRemoveClick = () => {
    const message = `Are you sure you want to remove ${blog.title} from the BlogList?`
    if(window.confirm(message)) handleRemove(blog)
  }

  if (detailView) {
    return (
      <div className="blog">
        <span className="blog-title">{blog.title}</span>
        <span className="small-grey"> by {blog.author} </span>
        <ButtonGroup size="sm">
          <Button variant="info" onClick={handleViewHide}>
            Hide
          </Button>
          {canRemove && (
            <Button variant="danger" onClick={handleRemoveClick}>
              Remove
            </Button>
          )}
        </ButtonGroup>
        <div className="container" style={detailStyle}>
          <ul>
            <li>URL: {blog.url}</li>
            <li>
              Likes: {likes}{' '}
              <Button
                variant="outline-success"
                size="sm"
                onClick={handleLikeClick}
              >
                Like
              </Button>
            </li>
            <li>
              User: {blog.user.name}{' '}
              <span className="small-grey">@{blog.user.username}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div className="blog">
      <span className="blog-title">{blog.title}</span>
      <span className="small-grey"> by {blog.author} </span>
      <ButtonGroup size="sm">
        <Button variant="info" onClick={handleViewHide}>
          View
        </Button>
        {canRemove && (
          <Button variant="danger" onClick={handleRemoveClick}>
            Remove
          </Button>
        )}
      </ButtonGroup>
    </div>
  )
}

const BlogList = ({
  blogs,
  handleRemove,
  user,
  handleLike,
  blogFormRef,
  handleBlogPost,
}) => {
  return (
    <div className="container">
      <Container>
        <Row>
          <Col xs="8">
            <h3>Posted blogs</h3>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleRemove={handleRemove}
                user={user}
                handleLike={handleLike}
              />
            ))}
          </Col>
          <Col>
            <Togglable buttonLabel="New blog post" ref={blogFormRef}>
              <BlogForm handleBlogPost={handleBlogPost} />
            </Togglable>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BlogList
