import React from 'react'
import defaultImage from '../../images/post-placeholder.png'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function AddPost() {
  const history = useHistory()
  const [postData, setPostData] = React.useState({})
  const [postImg, setPostImg] = React.useState(undefined)

  

  const handleChange = (event) => {
    const newPostData = { ...postData, [event.target.name]: event.target.value }
    setPostData(newPostData)
  }

  const handleImageUrl = async (e) => {
    console.log('Image handler firing')
    const dataToSend = new FormData()
    dataToSend.append('file', e.target.files[0])
    dataToSend.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
    try {
      const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, dataToSend)
      console.log('Image successfully uploaded')
      setPostImg(data.secure_url)
      const newFormData = { ...postData, contentUrl: data.secure_url }
      setPostData(newFormData)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePost= async (event) => {
    const getTokenFromLocalStorage = window.localStorage.getItem('token')
    event.preventDefault()
    try {
    await axios.post( '/api/p',
        postData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage}` } }
      )
      history.push('/t')
    } catch (err) {
      console.log('Unable to add post', err)
    }
  }
  return (
    <div className="add-post-container container">
      <h2>Add New Post</h2>
      <div className="card p-2">
        <form onSubmit={handlePost}className="d-flex flex-column justify-content-between align-items-center">
          <input type="file" name="contentUrl" id="contentUrl" className="form-control-file" onChange={handleImageUrl}></input>
          <label htmlFor="contentUrl">
            {postImg ? <img className="new-post-upload post-img" src={postImg} alt="post picutre" />
            :
            <img className="new-post-upload post-img" src={defaultImage} alt="post picutre" />
            }
          </label>
          <div className="comment-form d-flex flex-column justify-content-between">
            <textarea className="form-control" placeholder="Add a caption..." name="caption" onInput={handleChange}></textarea>
            <button className="comment-button btn btn-dark" formAction="submit"><i className="fas fa-plus-square"></i> Add Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPost
