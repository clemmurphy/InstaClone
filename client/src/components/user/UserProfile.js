import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const UserProfile = ({ loggedIn }) => {

  // Get user id from URL params
  const { username } = useParams()

  // Store user profile details in state
  const [ userDetails, setUserDetails ] = useState(null)
  let currentUserId = window.localStorage.currentUserId
  const [ userPosts, setUserPosts ] = useState([])

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(`/api/u/${username}`)
      console.log(userDetails)
      setUserDetails(data[0])
    } catch (err) {
      console.log(err)
      console.log('🚫 Couldn\'t get user info')
    }
  }

  const followUser = async () => {
    try {
      const token = window.localStorage.token
      const config = { headers: { Authorization: `Bearer ${token}` }}
      const userToFollow = userDetails._id
      await axios.put(`/api/f/${userToFollow}`, '', config)
      console.log(`Successfully followed ${userDetails.username}`)
      getUserDetails()
    } catch (err) {
      console.log(err)
      console.log('🚫 Couldn\'t follow user')
    }
  }

  const unfollowUser = async () => {
    try {
      const token = window.localStorage.token
      const config = { headers: { Authorization: `Bearer ${token}` }}
      const userToUnfollow = userDetails._id
      await axios.delete(`/api/f/${userToUnfollow}`, config)
      console.log(`Successfully unfollowed ${userDetails.username}`)
      getUserDetails()
    } catch (err) {
      console.log(err)
      console.log('🚫 Couldn\'t unfollow user')
    }
  }

  const getUserPosts = async () => {
    try {
      const userToFetchPosts = userDetails._id
      const { data } = await axios.get(`/api/p/by/${userToFetchPosts}`)
      console.log(data)
      setUserPosts(data.posts)
    } catch (err) {
      console.log(err)
    }
  }

  const displayFollowButtons = () => {
    if (userDetails.followers.includes(currentUserId) && loggedIn === true) {
      return (<button className="btn btn-danger btn-sm" onClick={unfollowUser}>Unfollow</button>)
    } else if (loggedIn === true) {
      return (<button className="btn btn-outline-success btn-sm" onClick={followUser}>Follow</button>)
    } else {
      return (<p>You must log in to follow!</p>)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  useEffect(() => {
    getUserPosts()
  }, [userDetails])

  return (
    <div className="user-profile-wrapper d-flex flex-column align-items-center mt-3">
      { userDetails ? 
      <>
        <div className="user d-flex align-items-center flex-column mb-4">
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column mt-2">
              <div className="profile-image rounded-circle">
                <img src={userDetails.profilePicture} alt={userDetails.username} className="rounded-circle img-fluid w-100 h-100" />
              </div>
            </div>
            <div className="user-stats d-flex flex-row ms-2 align-items-center">
              <div className="followers user-stat d-flex flex-column align-items-center ms-2">
                <p><strong>{userDetails.followers.length}</strong></p>
                <p className="user-stat-text">Followers</p>
              </div>
              <div className="following user-stat d-flex flex-column align-items-center ms-2">
                <p><strong>{userDetails.following.length}</strong></p>
                <p className="user-stat-text">Following</p>
              </div>
              <div className="posts user-stat d-flex flex-column align-items-center ms-2">
                <p><strong>{userPosts.length}</strong></p>
                <p className="user-stat-text">Posts</p>
              </div>
            </div>
          </div>
          <h2 className="profile-username mt-2">{userDetails.username}</h2>
          <div className="follow-button">
            {displayFollowButtons()}
          </div>
        </div>
        <div className="user-posts d-flex flex-wrap">
          { userPosts.length > 0 ? 
            userPosts.map(post => {
              return ( 
                <div key={post._id} className="post-thumbnail">
                  <img src={post.contentUrl} alt={post.caption} />
                </div>
              )
            })
          :
            <div className="d-flex justify-content-center w-100"><p>No posts to display!</p></div>
        }
        </div>
      </>
      :
      <div className="warning">No user found!</div>
    }
    </div>
  )

}

export default UserProfile