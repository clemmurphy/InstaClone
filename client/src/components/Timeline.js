import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InlinePost from './post/InlinePost'

function Timeline() {
  const [ timeLine, setTimeLine ] = useState([])
  const [ active, setActive ] = useState('chron')
  
  const getChronTimeline = async () => {
    const { data } =  await axios.get('/api/p/chron')
    setTimeLine(data)
    setActive('chron')
  }

  const getFollowingTimeline = async () => {
    const config = { headers: { Authorization: `Bearer ${window.localStorage.token}` }}
    const { data } = await axios.get(`/api/p/f/${window.localStorage.currentUserId}`, config)
    setTimeLine(data.posts)
    setActive('following')
  }

  const getPopularTimeline = async () => {
    const { data } =  await axios.get('/api/p/pop')
    setTimeLine(data)
    setActive('popular')
  }

  useEffect(()=> {
    getChronTimeline()
  },[])

  return (
    <>
      <div className="timeline-wrapper d-flex flex-column align-items-center">
        <div className="timeline-controls">
          <div className={`chron timeline-button ${ active === 'chron' ? "active" : "" } `} onClick={getChronTimeline} data-toggle="tooltip" data-placement="bottom" title="Most recent posts"><i className="fas fa-stopwatch"></i></div>
          { window.localStorage.token && <div className={`following timeline-button ${ active === 'following' ? "active" : "" } `} onClick={getFollowingTimeline} data-toggle="tooltip" data-placement="bottom" title="Posts from people you follow"><i className="fas fa-user-friends"></i></div> }
          <div className={`popular timeline-button ${ active === 'popular' ? "active" : "" } `} onClick={getPopularTimeline} data-toggle="tooltip" data-placement="bottom" title="Hottest posts"><i className="fas fa-fire-alt"></i></div>
        </div>
        { !timeLine.length ? <><h3 className="no-posts-to-display">No posts to display!</h3><p>You may need to follow some more users</p></> : timeLine.map(tl => {
          return(
            <InlinePost post={tl} key={tl._id} />
          )
          })}
      </div>
    </>
  )
}

export default Timeline
