import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import { Link } from 'react-router-dom'
import { Collapse } from 'react-bootstrap'

const PostControls = ({ post, id }) => {

  const [ likedByUser, setLikedByUser ] = useState(false)
  const [ postLikes, setPostLikes ] = useState(post.likes.length)
  const [ newCommentAdded, setNewCommentAdded ] = useState(false)
  const [ postComments, setPostComments ] = useState(post.comments)
  const [ commentsOpen, setCommentsOpen ] = useState(false)

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
      setPostComments(data.comments)
    }
    setData()
  }, [likedByUser, newCommentAdded, post._id])

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
            <CommentForm id={id} newCommentAdded={newCommentAdded} setNewCommentAdded={setNewCommentAdded} />
            </div>
            <div className="first-comment" onClick={() => {setCommentsOpen(!commentsOpen)}} aria-controls="comment-feed" aria-expanded={commentsOpen}>
              { postComments.length > 0 && <div className="comment-wrapper">
                <Link to={`/u/${postComments[0].owner.username}`}>{postComments[0].owner.username}</Link><span> {postComments[0].content}</span><i className="fas fa-ellipsis-h comment-dots"></i>
              </div> }
            </div>
            <div className="comment-feed" id="comment-feed">
              { postComments.length > 0 && postComments.map((comment, index) => {
                if (index) return (
                  <Collapse in={commentsOpen}>
                    <div className="comment-wrapper" key={comment._id}>
                      <Link to={`/u/${comment.owner.username}`}>{comment.owner.username}</Link><span> {comment.content}</span>
                    </div>
                  </Collapse>)
              })}
            </div>
          </>
        :
          <h3>Loading post...</h3>
      }
    </>
  )
}

export default PostControls