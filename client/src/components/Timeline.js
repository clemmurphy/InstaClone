import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentForm from './post/CommentForm'

import AddPost from './post/AddPost'

function Timeline() {
  const [timeLine, setTimeLine] = useState([])

  useEffect(()=> {
    const getTimeLine = async () => {
      const { data } =  await axios('/api/p')
      setTimeLine(data)
      console.log( data)
    }
    getTimeLine()

  },[])
  return (
    <>
      <AddPost />
      {timeLine.map(tl => {
        return(
          <div key={tl._id} className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="card mb-4">
                  <div className="card-image">
                    <img style={{ width: '100%'}} src={tl.contentUrl} alt='post picutre' />
                  </div>
                  <div className="card-body">
                    <p>{ tl.caption }</p>
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
      })}
    </>
  )
}

export default Timeline
