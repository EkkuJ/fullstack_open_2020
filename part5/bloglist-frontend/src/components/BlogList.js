import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, handleRemove, user, handleLike }) => {

  return (
    <div>
      <h3>Posted blogs</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleRemove={handleRemove} user={user} handleLike={handleLike} />
      ))}
    </div>
  )
}

export default BlogList
