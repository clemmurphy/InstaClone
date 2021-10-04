import React, { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import defaultProfile from '../../images/default-profile.jpg'

function AddPost() {
  const history = useHistory()
  const [ postData, setPostData ] = useState({
    imageUrl: '',
    caption: ''
  })
  // const [ imageUrl, setImageUrl ] = useState(undefined)

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
  const handleImageUrl = async (e) => {
    console.log('Image handler firing')
    const dataToSend = new FormData()
    dataToSend.append('file', e.target.files[0])
    dataToSend.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
    try {
      const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, dataToSend)
      postData.imageUrl(data.secure_url)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="container my-3">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="card py-2">
                <form onSubmit={handleSubmit} className="col-10 offset-1 col-md-6 offset-md-3 mt-4">
                  <h3>Add Post </h3>
                  <div className="mb-3">
                    <div className='form-control d-flex flex-column align-items-center justify-content-center'>
                      <input type="file" name="profilePicture" id="profilePicture" className="form-control-file" onChange={handleImageUrl} value={postData.imageUrl}></input>
                      <label Htmlfor="profilePicture">
                      <div className="profile-image rounded-circle mb-4 mt-2">
                        {postData.imageUrl ? <img src={postData.imageUrl} alt="User profile" className="rounded-circle w-100 h-100 img-thumbnail" />
                        :
                        <img src={defaultProfile} alt="User profile" className="rounded-circle w-100 h-100 img-thumbnail" />}
                      </div>
                      Upload a Picture
                      </label>
                    </div>
                  </div>
      
                  <div className="form-field mb-4">
                    <label htmlFor="caption">Caption</label>
                    <textarea className="form-control" onInput={handleChange} type="text" name="caption" placeholder="caption text" value={postData.caption}>
                    </textarea>
                  </div>
                  <button className="btn btn-dark btn-lg">Add Post</button>
                </form>
              </div>
            </div>
        </div>
      </div>
  )
}

export default AddPost
