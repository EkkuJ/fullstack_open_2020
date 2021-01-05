import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleRemove, user }) => {
  const [detailView, setDetailView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const canRemove = user.username === blog.user.username

  const handleViewHide = () => {
    setDetailView(!detailView)
  }

  const handleLike = () => {
    const likedBlog = { ...blog, likes: likes + 1 }
    blogService.likeBlog(blog.id, likedBlog)
    setLikes(likes + 1)
  }

  const handleRemoveClick = () => {
    handleRemove(blog)
  }

  if (detailView) {
    return (
      <div className="blog">
        <span className="blog-title">{blog.title}</span>
        <span className="small-grey"> by {blog.author}</span>
        <button className="detail-button" onClick={handleViewHide}>
          Hide
        </button>
        <ul>
          <li>URL: {blog.url}</li>
          <li>
            Likes: {likes} <button onClick={handleLike}>Like</button>
          </li>
          <li>
            User: {blog.user.name}{' '}
            <span className="small-grey">@{blog.user.username}</span>
          </li>
          {canRemove && <button onClick={handleRemoveClick}>Remove</button>}
        </ul>
      </div>
    )
  }
  return (
    <div className="blog">
      <span className="blog-title">{blog.title}</span>
      <span className="small-grey"> by {blog.author}</span>
      <button className="detail-button" onClick={handleViewHide}>
        View
      </button>
    </div>
  )
}

export default Blog
