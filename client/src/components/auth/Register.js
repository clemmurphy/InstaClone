import React from 'react'
import defaultProfile from '../../images/default-profile.jpg'

const Register = ({ handleChange, handleSubmit, handleImageUrl, imageUrl }) => {
  return (
    <div className='container d-flex flex-column align-items-center justify-content-center'>
    <form onSubmit={handleSubmit}>
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
        <div className='form-control d-flex flex-column align-items-center justify-content-center'>
          <input type="file" name="profilePicture" id="profilePicture" className="form-control-file" onChange={handleImageUrl}></input>
          <label Htmlfor="profilePicture">
          <div className="profile-image rounded-circle mb-4 mt-2">
            {imageUrl ? <img src={imageUrl} alt="User profile" className="rounded-circle w-100 h-100 img-thumbnail" />
            :
            <img src={defaultProfile} alt="User profile" className="rounded-circle w-100 h-100 img-thumbnail" />}
          </div>
          Upload a Picture
          </label>
        </div>
      </div>
      <button className='btn btn-success'>Register</button>
    </form>
  </div>
  )
}

export default Register
