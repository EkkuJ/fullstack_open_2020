import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'

const NavigationBar = ({ user, handleLogout }) => {
  const margin = {
    marginBottom: '3em',
    marginTop: '2em',
  }

  return (
    <Navbar bg="dark" variant="dark" expand="md" style={margin}>
      <Navbar.Brand>BlogList</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav.Link as={Link} to="/">
          Blogs
        </Nav.Link>
        <Nav.Link as={Link} to="/users">
          Users
        </Nav.Link>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Logged in as {user.username}{' '}
            <Button size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
