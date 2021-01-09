import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const BlogForm = ({ handleBlogPost }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = () => {
    const blogPost = {
      title: title,
      author: author,
      url: url,
    }
    handleBlogPost(blogPost)
  }

  const margin = {
    marginTop: '15px',
    marginBottom: '15px',
    width: '100%'
  }

  const float = { float: 'right' }

  return (
    <div style={margin}>
      <h3>Post a blog</h3>
      <form id="blog-form" onSubmit={handleSubmit}>
        <div style={margin}>
          Title:
          <input
            id="input-title"
            type="text"
            value={title}
            name="title"
            style={float}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div style={margin}>
          Author:
          <input
            id="input-author"
            type="text"
            value={author}
            name="author"
            style={float}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div style={margin}>
          Url:
          <input
            id="input-url"
            type="text"
            value={url}
            name="url"
            style={float}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <Button id="submit-blog" type="submit" block>
          Create
        </Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleBlogPost: PropTypes.func.isRequired,
}

export default BlogForm
