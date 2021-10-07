import React from 'react'
import { Link } from 'react-router-dom'
import PostControls from './PostControls'

const InlinePost = ({ post }) => {

  const postDate = new Date(post.createdAt)

  return (
    <div key={post._id}>
      <div className="card mb-4 post-wrapper">
        <div className="card-header post-user">
        { post.owner && 
          <>
            <Link to={`/u/${post.owner.username}`} className="post-username d-flex align-items-center">
              <img src={post.owner.profilePicture} alt={post.owner.username} className="img-thumbnail rounded-circle h-100" />
              <p>{post.owner.username}</p>
            </Link>
          </>
        }
        </div>
        <div className="post-image-container card-image">
          <img style={{ width: '100%'}} src={post.contentUrl} alt={post.caption} />
        </div>
        <div className="card-body post-content-wrapper">
          <PostControls post={post} id={post._id}/>
          <Link to={`/p/${post._id}`} className="post-date"><p>{postDate.toLocaleTimeString()} {postDate.toLocaleDateString()}</p></Link>
        </div>
      </div>
    </div>
  )

}

export default InlinePost