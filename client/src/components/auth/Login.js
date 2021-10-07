import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'

const Login = ({ handleChange, formData, setLoggedIn }) => {

  const history = useHistory()
  const [ loginError, setLoginError ] = useState('')

  // Setting authentication token to login
  const setTokenToLocalStorage = (token, id, username) => {
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('currentUserId', id)
    window.localStorage.setItem('username', username)
  }

  // Handle form submissions
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      console.log(data.message)
      setTokenToLocalStorage(data.token, data.id, data.username)
      setLoggedIn(true)
      history.push('/t')
    } catch (err) {
      console.log('Unable to log in')
      const errorMessage = err.request.response.replace(/['"]+/g, '')
      setLoginError(errorMessage)
    }
  }

  useEffect(() => {
    setLoginError('')
  },[])

  return (
    <div className='login-form container d-flex flex-column align-items-center'>
      <form onSubmit={handleLogin}>
        <h2 className="mb-3">Log In</h2>
        <div className="mb-3">
          <input type="text"
            className="form-control"
            name="username"
            placeholder="Username"
            onInput={handleChange}
            autoComplete="off"
            autoFocus={true} />
        </div>
        <div className="mb-3">
          <input type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            onInput={handleChange}
            autoComplete="off" />
        </div>
        <button className='btn btn-success login-button'>Log In</button>
        { loginError && <ErrorMessage title='Error logging in' content={loginError} /> }
      </form>
    </div>
  )
}

export default Login
