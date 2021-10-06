import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CommentForm from './post/CommentForm'

function Timeline() {
  const [timeLine, setTimeLine] = useState([])

  useEffect(()=> {
    const getTimeLine = async () => {
      const { data } =  await axios('/api/p')
      setTimeLine(data)
    }
    getTimeLine()

  },[])

  return (
    <div className="timeline-wrapper d-flex flex-column align-items-center mt-5">
      {timeLine.map(tl => {
        const postDate = new Date(tl.createdAt)
        return(
          <div key={tl._id} className="row col-12 col-md-6">
            <div className="card mb-4 post-wrapper">
              <div className="card-header post-user">
              { tl.owner && 
                <>
                  <Link to={`/u/${tl.owner.username}`} className="post-username d-flex align-items-center">
                    <img src={tl.owner.profilePicture} alt={tl.owner.username} className="img-thumbnail rounded-circle h-100" />
                    <p>{tl.owner.username}</p>
                  </Link>
                </>
              }
              </div>
              <div className="post-image-container card-image">
                <img style={{ width: '100%'}} src={tl.contentUrl} alt={tl.caption} />
              </div>
              <div className="card-body post-content-wrapper">
                <p className="post-likes-text"><span>{tl.likes.length}</span> likes</p>
                <p><span className="inline-username"><Link to={`/u/${tl.owner.username}`}>{tl.owner.username}</Link></span> { tl.caption }</p>
                <CommentForm />
                { timeLine.comments && timeLine.comments.map(comment => {
                  return <p>{comment.content}</p>
                })}
                <Link to={`/p/${tl._id}`} className="post-date"><p>{postDate.toLocaleTimeString()} {postDate.toLocaleDateString()}</p></Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
