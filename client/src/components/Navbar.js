import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <div className='navbar-brand'> <Link to='/'>InstaClone</Link></div>
          <ul className='navbar-nav flex-row'>
            <li className='nav-item ms-3'><Link to='/login'>Log In</Link></li>
            <li className='nav-item ms-3'><Link to='/register'>Register</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
