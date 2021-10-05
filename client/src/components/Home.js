import React from 'react'
import { Link } from 'react-router-dom'
import homeImage from '../images/home-image.jpg'



function Home() {
  return (
    <div className="container flex-grow-1">
      <h1 className="my-4">Welcome to InstaClone</h1>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card">
            <img className="home-image" src={homeImage} alt="people" />
          </div>
        </div>
        <div className="col-12 col-md-6 mt-7">
          <p>connect With the rest of the world!</p>
          <button className="btn btn-lg btn-dark bmr"><Link to="/login">Login</Link></button>
          <button className="btn btn-lg btn-outline-dark"><Link to="/register">Register</Link></button>
        </div>
      </div>
    </div>
  )
}

export default Home
