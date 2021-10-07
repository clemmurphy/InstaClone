import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import { Link } from 'react-router-dom'

const PostControls = ({ post }) => {

  const [ likedByUser, setLikedByUser ] = useState(false)
  const [ postLikes, setPostLikes ] = useState(post.likes.length)

  const likePost = async () => {
    if (!window.localStorage.currentUserId) throw new Error('You need to log in to like that post!')
    try {
      const token = window.localStorage.token
      const config = { headers: { Authorization: `Bearer ${token}` }}
      await axios.put(`/api/p/${post._id}/like`, '', config)
      setLikedByUser(true)
    } catch (err) {
      console.log(err.request.response)
      console.log('🚫 Couldn\'t like post')
    }
  }

  const unlikePost = async () => {
    try {
      const token = window.localStorage.token
      const config = { headers: { Authorization: `Bearer ${token}` }}
      await axios.delete(`/api/p/${post._id}/like`, config)
      setLikedByUser(false)
    } catch (err) {
      console.log(err.request.response)
      console.log('🚫 Couldn\'t unlike post')
    }
  }

  useEffect(() => {
    const getLikeStatus = () => {
      const currentUserId = window.localStorage.currentUserId
      if (post.likes.includes(currentUserId)) {
        setLikedByUser(true)
      } else {
        setLikedByUser(false)
      }
    }
    getLikeStatus()
  }, [post])

  useEffect(() => {
    async function setData() {
      const { data } = await axios.get(`/api/p/${post._id}`)
      setPostLikes(data.likes.length)
    }
    setData()
  }, [likedByUser, post._id])

  return (
    <>
      { post._id ? 
        <>
          <div className="post-stats">
            <p className="post-likes-text"><span>{postLikes}</span> likes</p>
            <p className="post-caption"><span className="inline-username"><Link to={`/u/${post.owner.username}`}>{post.owner.username}</Link></span> { post.caption }</p>
          </div>
          <div className="post-controls">
            <div className="like-button">
              { likedByUser ? <i className="fas fa-heart liked-heart" onClick={unlikePost}></i> : <i className="far fa-heart unliked-heart" onClick={likePost}></i>}
            </div>
            <CommentForm />
          </div>
        </>
      :
        <h3>Loading post...</h3>
      }
    </>
  )
}

export default PostControls