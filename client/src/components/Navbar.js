import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

function Navbar({ loggedIn, setLoggedIn }) {

  const history = useHistory()
  const username = window.localStorage.username

  const logOut = () => {
    if (window.localStorage.token) {
      window.localStorage.clear()
      setLoggedIn(false)
      console.log('Cleared login token')
      return history.push('/')
    } else {
      console.log('No token to clear!')
      return history.push('/')
    }
  }

  useEffect(() => {
    if (window.localStorage.token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [loggedIn])

  return (
    <header>
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <div className='navbar-brand'> <Link to='/'><i className="fas fa-camera-retro"></i> InstaClone</Link></div>
          <ul className='navbar-nav flex-row align-items-center'>
          { loggedIn ?
            <>
              <li className='nav-item ms-3'><Link to={`/u/${username}`}><i className="fas fa-user"></i></Link></li>
              <li className='nav-item ms-3'><button onClick={logOut} className="btn btn-primary"><i class="fas fa-sign-out-alt"></i></button></li>
            </>
            :
            <>
              <li className='nav-item ms-3'><Link to='/login'><i className="fas fa-sign-in-alt"></i> Log In</Link></li>
              <li className='nav-item ms-3'><Link to='/register'><i className="fas fa-pencil-alt"></i> Register</Link></li>
            </> }
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
