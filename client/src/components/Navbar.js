import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
          <div className="navbar-brand"> <Link to='/'>Insta Clone</Link></div>
          <nav>
            <ul className="navbar-nav">
              <li className="nav-item"><Link  className="nav-link" to='/login'>login</Link></li>
              <li className="nav-item"><Link className="nav-link" to='/register'>register</Link></li>
            </ul>
          </nav>
      </div>
    </header>
  )
}

export default Navbar
