import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

function Navbar({ loggedIn, setLoggedIn }) {

  const history = useHistory()

  const logOut = () => {
    if (localStorage.token) {
      localStorage.removeItem('token')
      console.log('Cleared login token')
      setLoggedIn(false)
      return history.push('/')
    } else {
      console.log('No token to clear!')
      return history.push('/')
    }
  }


  return (
    <header>
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <div className='navbar-brand'> <Link to='/'>InstaClone</Link></div>
          <ul className='navbar-nav flex-row'>
          {
            loggedIn ?
            <li className='nav-item ms-3'><button onClick={logOut} className="btn btn-primary">Log Out</button></li>
            :
            <>
              <li className='nav-item ms-3'><Link to='/login'>Log In</Link></li>
              <li className='nav-item ms-3'><Link to='/register'>Register</Link></li>
            </>
          }
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
