import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = ({ users }) => {
  return (
    <div className="container">
      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Posted blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
