import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Post from './components/post/Post'
import AddPost from './components/post/AddPost'
import Timeline from './components/Timeline'

function App() {

  // Use History
  const history = useHistory()

  // Form data state
  const [ formData, setFormData ] = useState({})
  const [ imageUrl, setImageUrl ] = useState(undefined)

  // Form input setter
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  
  // Handle form submissions
  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormData({
      ...formData,
      profilePicture: imageUrl
    })
    try {
      const { data } = await axios.post('API URL GOES HERE', formData)
      setTokenToLocalStorage(data.token)
      history.push('/')
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }

  // Handle image upload
  const handleImageUrl = async (e) => {
    console.log('Image handler firing')
    const dataToSend = new FormData()
    dataToSend.append('file', e.target.files[0])
    dataToSend.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
    try {
      const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, dataToSend)
      setImageUrl(data.secure_url)
    } catch (err) {
      console.log(err)
    }
  }

  // Track form data for dev purposes
  useEffect(() => {
    console.log(formData)
  }, [formData])

  useEffect(() => {
    console.log(imageUrl)
  }, [imageUrl])

  // Setting authentication token to login
  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/login'>
          <Login
            handleChange={handleChange}
            handleSubmit={handleSubmit} 
          />
        </Route>
        <Route path='/register'>
          <Register
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleImageUrl={handleImageUrl}
            imageUrl={imageUrl}
          />
        </Route>
        <Route path='/p/:id'>
          <Post />
        </Route>
        <Route path='/add-post'>
          <AddPost />
        </Route>
        <Route path='/t'>
        <Timeline />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
