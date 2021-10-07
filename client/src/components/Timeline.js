import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InlinePost from './post/InlinePost'

import AddPost from './post/AddPost'


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
    <div className="timeline-wrapper d-flex flex-column align-items-center">
      {timeLine.map(tl => {
        return(
          <InlinePost post={tl} key={tl._id} />
        )
      })}
    </div>
  )
}

export default Timeline
