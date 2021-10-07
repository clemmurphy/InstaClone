import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import InlinePost from './InlinePost'

function Post() {
  const [ post, setPost ] = useState([])

  const { id } = useParams()
  
  useEffect(()=> {
    const getPost = async () => {
      const { data } =  await axios.get(`/api/p/${id}`)
      setPost(data)
    }
    getPost()

  }, [id])

  return (
    <div className="single-post-wrapper">
      {post._id ?
        <InlinePost post={post} />
      :
        <h3>Loading post...</h3>
      }
    </div>
  )
}

export default Post
