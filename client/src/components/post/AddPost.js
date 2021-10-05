import React from 'react'
import defaultImage from '../../images/default-profile.jpg'

function AddPost() {
  const [postData, setPostData] = React.useState({
    caption:'',
    postImg:undefined
  })
  const handleImg = () => {
    setPostData(...postData, )
  }
  const handleCaption = () => {
    setPostData(...postData, postData.caption)
  }
  return (
    <div className="container my-3">
        <div className="row">
          <div className="col-12 col-md-6">
              <div className="card p-2">
                <form className="d-flex justify-content-between">
                  <input type="file" name="postImg" id="postImg" className="form-control-file" onChange={handleImg}></input>
                  <label htmlFor="postImg">
                    {postData.postImg ? <img className="rounded-circle post-img img-thumbnail mr" src={postData.postImg} alt="post picutre" />
                    :
                    <img className="rounded-circle post-img img-thumbnail mr" src={defaultImage} alt="post picutre" />
                    }
                  </label>
                  <textarea  onInput="handleCaption" value={postData.caption} className="flex-grow-1 mr"></textarea>
                  <button className="btn btn-lg btn-dark">Add Post</button>
                </form>
              </div>
          </div>
        </div>
      </div>
  )
}

export default AddPost
