import React from 'react'

const Login = ({ handleChange, handleSubmit }) => {

  return (
    <div className='container d-flex flex-column align-items-center justify-content-center'>
      <form onSubmit={handleSubmit}>
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
