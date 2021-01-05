import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

const mockBlog = {
  author: 'EkkuJ',
  id: '5ff44d9f9517dc4b00923884',
  likes: 5,
  title: 'Using Node.js',
  url: 'https://ekkujokinen.com',
  user: {
    id: '5ff44d669517dc4b00923882',
    name: 'Ekku Jokinen',
    username: 'ekkujokinen',
  },
}
const mockUser = {
  name: 'Ekku Jokinen',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVra3Vqb2tpbmVuIiwiaWQiOiI1ZmY0NGQ2Njk1MTdkYzRiMDA5MjM4ODIiLCJpYXQiOjE2MDk4NDYyNDZ9.rkSpCkxxzaGxgW-WqlB4aQsx4LB3rRsXqTRedI16dGw',
  username: 'ekkujokinen',
}

const mockRemove = jest.fn()

const mockLike = jest.fn()

test('<Blog /> renders in title-author mode initially', () => {
  const component = render(
    <Blog
      blog={mockBlog}
      handleRemove={mockRemove}
      user={mockUser}
      handleLike={mockLike}
    />,
  )
  const blogDiv = component.container.querySelector('.blog')
  expect(blogDiv).toHaveTextContent('Using Node.js')
  expect(blogDiv).toHaveTextContent('EkkuJ')
  expect(blogDiv).not.toHaveTextContent('https://ekkujokinen.com')
  expect(blogDiv).not.toHaveTextContent('Likes')
})

test('<Blog /> renders in detail mode after "View" clicked', () => {
  const component = render(
    <Blog
      blog={mockBlog}
      handleRemove={mockRemove}
      user={mockUser}
      handleLike={mockLike}
    />,
  )
  const blogDiv = component.container.querySelector('.blog')
  const viewButton = component.container.querySelector('.detail-button')
  fireEvent.click(viewButton)

  expect(blogDiv).toHaveTextContent('Using Node.js')
  expect(blogDiv).toHaveTextContent('EkkuJ')
  expect(blogDiv).toHaveTextContent('https://ekkujokinen.com')
  expect(blogDiv).toHaveTextContent('Likes: 5')
})

test('<Blog /> like button event handler gets called', () => {
  const component = render(
    <Blog
      blog={mockBlog}
      handleRemove={mockRemove}
      user={mockUser}
      handleLike={mockLike}
    />,
  )
  const viewButton = component.container.querySelector('.detail-button')
  fireEvent.click(viewButton)
  const likeButton = component.container.querySelector('.like-button')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockLike.mock.calls).toHaveLength(2)
})
