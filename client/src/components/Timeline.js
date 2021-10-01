import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
      {timeLine.map(tl => {
        return(
          <div key={tl._id} className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="card mb-4">
                  <div className="card-image w-100">
                    <img style={{ width: '100%'}} src={tl.contentUrl} alt='post picutre' />
                  </div>
                  <div className="card-body">
                    <p>{ tl.caption }</p>
                    <p>&hearts; <span>10000</span></p>
                    <form className="d-flex justify-content-between">
                      <textarea className="fomr-control flex-grow-1"></textarea>
                      <button style={{ marginLeft: '10px'}} className="btn btn-dark btn-lg">Comment</button>
                    </form>
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
