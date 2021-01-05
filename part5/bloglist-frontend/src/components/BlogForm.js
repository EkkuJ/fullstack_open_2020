import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleBlogPost }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = () => {
    const blogPost =
      {
        title: title,
        author: author,
        url: url
      }
    handleBlogPost(blogPost)
  }

  return (
    <div>
      <h3>Post a blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          title:{' '}
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleBlogPost: PropTypes.func.isRequired
}

export default BlogForm
