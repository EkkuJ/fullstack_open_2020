import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

const mockPost = jest.fn()

test('<BlogForm /> calls submit handler with correct parameters', () => {

  const component = render(<BlogForm handleBlogPost={mockPost} />)

  const titleInput = component.container.querySelector('#input-title')
  const authorInput = component.container.querySelector('#input-author')
  const urlInput = component.container.querySelector('#input-url')

  fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
  fireEvent.change(authorInput, { target: { value: 'Author Test' } })
  fireEvent.change(urlInput, { target: { value: 'http://testingblogs.com' } })

  const blogForm = component.container.querySelector('#blog-form')
  fireEvent.submit(blogForm)

  const submittedData = mockPost.mock.calls[0][0]

  expect(submittedData.title).toBe('Test Blog')
  expect(submittedData.author).toBe('Author Test')
  expect(submittedData.url).toBe('http://testingblogs.com')
})
