import React from 'react'
import { Table } from 'react-bootstrap'

const UserView = ({ user }) => {
  if (!user) return null
  const marginBottom= { marginBottom: '30px' }
  return (
    <div className="container">
      <h2 style={marginBottom}>Blogs added by {user.name}</h2>
      <Table>
        <thead>
          <tr>
            <th>Blog</th>
            <th>Author</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>{blog.url}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserView
