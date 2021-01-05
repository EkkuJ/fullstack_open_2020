import React, { useState } from 'react'

const Blog = ({ blog, handleRemove, user, handleLike }) => {
  const [detailView, setDetailView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const canRemove = user.username === blog.user.username

  const handleViewHide = () => {
    setDetailView(!detailView)
  }

  const handleLikeClick = () => {
    const likedBlog = { ...blog, likes: likes + 1 }
    handleLike(blog.id, likedBlog)
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
            Likes: {likes} <button className="like-button" onClick={handleLikeClick}>Like</button>
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
