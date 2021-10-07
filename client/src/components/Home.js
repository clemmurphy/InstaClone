import React from 'react'
import { Link } from 'react-router-dom'
import homeImage from '../images/timeline-mockup.png'

function Home() {
  return (
    <div className="home-page">
      <div className="homepage-content-wrapper">
        <div className="homepage-content">
          <img className="home-image" src={homeImage} alt="people" />
        </div>
        <div className="homepage-content">
          <h1>InstaClone</h1>
          <p>Follow your friends, like their content and share your photos with the world</p>
          { window.localStorage.token ?
            <button className="btn btn-lg hp-login"><Link to="/t">Let's go</Link></button>
            :
            <>
              <button className="btn btn-lg hp-login"><Link to="/login">Log In</Link></button>
              <button className="btn btn-lg hp-register"><Link to="/register">Register</Link></button>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Home
