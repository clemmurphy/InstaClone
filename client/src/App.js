import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Navbar from './components/Navbar'
import Register from './components/auth/Register'
import Post from './components/post/Post'
import AddPost from './components/post/AddPost'
import Timeline from './components/Timeline'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route path='/p/:id' component={Post} />
        <Route path='/add-post' component={AddPost} />
        <Route path='/t' component={Timeline} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
