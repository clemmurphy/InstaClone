import React from 'react'
import defaultProfile from '../../images/default-profile.jpg'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Register = ({ handleChange, handleImageUrl, imageUrl, formData }) => {

  const history = useHistory()

  // Handle form submissions
  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/register', formData)
      console.log(data)
      history.push('/login')
    } catch (err) {
      console.log('Unable to handle form', err)
    }
  }

  return (
    <div className='login-form container d-flex flex-column align-items-center'>
    <form onSubmit={handleRegister}>
      <h2 className="mb-3">Register</h2>
      {/* Username */}
      <div className="mb-3">
        <input type="text" className="form-control" name="username" placeholder="Username" onInput={handleChange} />
      </div>
      {/* Email */}
      <div className="mb-3">
        <input type="email" className="form-control" name="email" placeholder="Email" onInput={handleChange} />
      </div>
      {/* Password */}
      <div className="mb-3">
        <input type="password" className="form-control" name="password" placeholder="Password" onInput={handleChange} />
      </div>
      <div className="mb-3">
        <input type="password" className="form-control" name="passwordConfirmation" placeholder="Confirm Password" onInput={handleChange} />
      </div>
      {/* Profile Picture Upload */}
      <div className="mb-3">
        <div className='form-control d-flex flex-column align-items-center'>
          <input type="file" name="profilePicture" id="profilePicture" className="form-control-file" onChange={handleImageUrl}></input>
          <label htmlFor="profilePicture d-flex flex-column align-items-center justify-content-center">
            <div className="registration-image rounded-circle mb-4 mt-2">
              {/* If image uploaded, display it on the screen. Could break this out into function for post form */}
              {imageUrl ? <img src={imageUrl} alt="User profile" className="rounded-circle w-100 h-100 img-thumbnail" />
              :
              <img src={defaultProfile} alt="User profile" className="rounded-circle w-100 h-100 img-thumbnail" />}
            </div>
          </label>
          <div>Upload a Picture</div>
        </div>
      </div>
      <button className='btn btn-success btn-block register-button'><i class="fas fa-pencil-alt"></i> Register</button>
    </form>
  </div>
  )
}

export default Register
