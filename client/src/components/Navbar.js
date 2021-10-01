import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <div className="navbar-brand"> <Link to='/'>Insta Clone</Link></div>
      <nav>
        <ul>
          <li><Link to='/login'>login</Link></li>
          <li><Link to='/register'>register</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
