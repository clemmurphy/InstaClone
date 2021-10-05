import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
        return(
          <div key={tl._id} className="row col-12 col-md-6">
            <div className="card mb-4">
              <div className="card-image mt-3">
                <img style={{ width: '100%'}} src={tl.contentUrl} alt='post picutre' />
              </div>
              <div className="card-body">
                <p>{ tl.caption }</p>
                <p>&hearts; <span>{tl.likes.length}</span></p>
                <CommentForm />
                { timeLine.comments && timeLine.comments.map(comment => {
                  return <p>{comment.content}</p>
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
