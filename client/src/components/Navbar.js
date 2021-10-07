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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header>
      <nav className='navbar'>
        <div className='container'>
          <div className='navbar-brand'> <Link to={ loggedIn ? '/t' : '/' }><i className="fas fa-camera-retro nav-icon"></i> InstaClone</Link></div>
          <ul className='navbar-nav flex-row align-items-center'>
          { loggedIn ?
            <>
              <li className='nav-item'><Link to={'/t'} data-toggle="tooltip" data-placement="bottom" title="Timeline"><i className="fas fa-images"></i></Link></li>
              <li className='nav-item'><button onClick={logOut} className="logout-button" data-toggle="tooltip" data-placement="bottom" title="Sign out"><i className="fas fa-sign-out-alt"></i></button></li>
              <li className='nav-item'><Link to={`/u/${username}`} data-toggle="tooltip" data-placement="bottom" title="My profile"><i className="fas fa-user"></i></Link></li>
              <li className='nav-item'><Link to={'/add-post'} data-toggle="tooltip" data-placement="bottom" title="New post"><i className="fas fa-plus-square"></i></Link></li>
            </>
            :
            <>
              <li className='nav-item'><Link to='/login' data-toggle="tooltip" data-placement="bottom" title="Log In"><i className="fas fa-sign-in-alt"></i></Link></li>
              <li className='nav-item'><Link to='/register' data-toggle="tooltip" data-placement="bottom" title="Register"><i className="fas fa-user-plus"></i></Link></li>
            </> }
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
