import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

function Post() {
  const [post, setpost] = useState([])

  const { id } = useParams()
  console.log(id)
  
  useEffect(()=> {
    const getPost = async () => {
      const { data } =  await axios.get(`/api/p/${id}`)
      setpost(data)
      console.log( data)
    }
    getPost()

  },[id])

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-image w-100">
              <img style={{ width: '100%'}} src={post.contentUrl} alt='post picutre' />
            </div>
            <div className="card-body">
              <p>{ post.caption }</p>
              <p>&hearts; <span>10000</span></p>
              <CommentForm />
              <p>comment1</p>
              <p>comment2</p>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default Post
