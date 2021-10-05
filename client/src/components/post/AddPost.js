import React from 'react'
import defaultImage from '../../images/default-profile.jpg'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function AddPost( { timeLine, setTimeLine}) {
  const history = useHistory()
  const [postData, setPostData] = React.useState({})
  const [postImg, setPostImg] = React.useState(undefined)

  

  const handleChange = (event) => {
    const newPostData = { ...postData, [event.target.name]: event.target.value }
    setPostData(newPostData)
  }

  React.useEffect(() => {
    console.log(postData)
  },[postData])

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
    const { data } = await axios.post( '/api/p',
        postData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage}` } }
      )
      console.log(data)
      setTimeLine([ ...timeLine, postData ])
      history.push('/t')
    } catch (err) {
      console.log('Unable to add post', err)
    }
  }
  return (
    <div className="container my-3">
        <div className="row">
          <div className="col-12 col-md-6">
              <div className="card p-2">
                <form onSubmit={handlePost}className="d-flex justify-content-between">
                  <input type="file" name="contentUrl" id="contentUrl" className="form-control-file" onChange={handleImageUrl}></input>
                  <label htmlFor="contentUrl">
                    {postImg ? <img className="rounded-circle post-img img-thumbnail mr" src={postImg} alt="post picutre" />
                    :
                    <img className="rounded-circle post-img img-thumbnail mr" src={defaultImage} alt="post picutre" />
                    }
                  </label>
                  <textarea  name="caption" onInput={handleChange} className="flex-grow-1 mr"></textarea>
                  <button className="btn btn-lg btn-dark">Add Post</button>
                </form>
              </div>
          </div>
        </div>
      </div>
  )
}

export default AddPost
