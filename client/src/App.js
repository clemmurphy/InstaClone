import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Post from './components/post/Post'
import Timeline from './components/Timeline'
import Footer from './components/Footer'
import UserProfile from './components/user/UserProfile'
import AddPost from './components/post/AddPost'
import dotenv from 'dotenv'
dotenv.config()

function App() {

  // Logged in status
  const [ loggedIn, setLoggedIn ] = useState(false)

  // Form data state
  const [ formData, setFormData ] = useState({})
  const [ imageUrl, setImageUrl ] = useState(undefined)

  // Form input setter
  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  // Handle image upload
  const handleImageUrl = async (e) => {
    console.log('Image handler firing')
    const dataToSend = new FormData()
    dataToSend.append('file', e.target.files[0])
    dataToSend.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
    try {
      const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, dataToSend)
      console.log('Image successfully uploaded')
      setImageUrl(data.secure_url)
      const newFormData = { ...formData, profilePicture: data.secure_url }
      setFormData(newFormData)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route exact path='/'>
          <Home 
            loggedIn={loggedIn}
          />
        </Route>
        <Route path='/login'>
          <Login
            handleChange={handleChange}
            formData={formData}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Route>
        <Route path='/register'>
          <Register
            handleChange={handleChange}
            handleImageUrl={handleImageUrl}
            imageUrl={imageUrl}
            formData={formData}
          />
        </Route>
        <Route path='/p/:id'>
          <Post />
        </Route>
        <Route path='/add-post'>
          <AddPost />
        </Route>
        <Route path='/u/:username'>
          <UserProfile
            loggedIn={loggedIn}
          />
        </Route>
        <Route path='/t'>
          <Timeline />
        </Route>
      </Switch>
    <Footer />
    </BrowserRouter>
  )
}

export default App
