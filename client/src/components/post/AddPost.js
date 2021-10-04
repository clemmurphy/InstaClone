import React, { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'

function AddPost() {
  const history = useHistory()
  const [ postData, setPostData ] = useState({
    contentUrl:'',
    caption:''
  })
  const handleSubmit = async (e) => {
    e.preventDefualt()
    try {
      await axios.post('/api/p', postData)
      history.push('/t')
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (e) => {
    const newPostData = {...postData, [e.target.name]: e.target.value }
    setPostData(newPostData)
  }
  return (
    <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit} className="col-10 offset-1 col-md-6 offset-md-3 mt-4">
            <h3>Add Post </h3>
            <div className="form-field mb-4">
              <label htmlFor="contentUrl">image url</label>
              <input className="form-control" onInput={handleChange} type="text" name="contentUrl" placeholder="url" value={postData.contentUrl} />
            </div>
            <div className="form-field mb-4">
              <label htmlFor="caption">Caption</label>
              <input className="form-control" onInput={handleChange} type="text" name="caption" placeholder="caption text" value={postData.caption}/>
            </div>
            <button className="btn btn-dark btn-lg">Add Post</button>
          </form>
        </div>
      </div>
  )
}

export default AddPost
