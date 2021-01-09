import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  const margin = {
    marginTop: '20px',
    marginBottom: '20px'
  }

  const marginBottom = {
    marginBottom: '30px'
  }

  const paddingRight = {
    paddingRight: '2em',
  }
  const float = { float: 'right' }

  return (
    <form onSubmit={handleLogin}>
      <h3 style={marginBottom}>Log In</h3>
      <div style={margin}>
        <label style={paddingRight}>Userame: </label>
        <input
          id="input-username"
          type="text"
          value={username}
          name="Username"
          style={float}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div style={margin}>
        <label style={paddingRight}>Password: </label>
        <input
          id="input-password"
          type="password"
          value={password}
          name="Password"
          style={float}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button block id="login-button" type="submit">
        Log In
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
