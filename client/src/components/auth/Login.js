import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = ({ handleChange, formData, setLoggedIn }) => {

  const history = useHistory()

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
      console.log(formData)
      const { data } = await axios.post('/api/login', formData)
      console.log(data.message)
      setTokenToLocalStorage(data.token, data.id, data.username)
      setLoggedIn(true)
      history.push('/t')
    } catch (err) {
      console.log('Unable to handle form', err)
    }
  }

  return (
    <div className='login-form container d-flex flex-column align-items-center'>
      <form onSubmit={handleLogin}>
        <h2 className="mb-3">Log In</h2>
        <div className="mb-3">
          <input type="text" className="form-control" name="username" placeholder="Username" onInput={handleChange} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" name="password" placeholder="Password" onInput={handleChange} />
        </div>
        <button className='btn btn-success'>Log In</button>
      </form>
    </div>
  )
}

export default Login
