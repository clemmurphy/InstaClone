import React, { useState } from 'react'
import axios from 'axios'

function CommentForm({ id, newCommentAdded, setNewCommentAdded }) {

  const [ comment, setComment ] = useState('')

  const handleChange = (event) => {
    const newComment = { [event.target.name]: event.target.value, owner: window.localStorage.currentUserId, parentPost: id }
    setComment(newComment)
  }

  const handleComment = async (e) => {
    e.preventDefault()
    try {
      const token = window.localStorage.token
      const config = { headers: { Authorization: `Bearer ${token}` }}
      await axios.post(`/api/p/${id}/comment`, comment, config)
      setNewCommentAdded(true)
      e.target.content.value = ''
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="comment-form d-flex justify-content-between" onSubmit={handleComment}>
      <input className="form-control" placeholder="Add a comment..." name="content" onInput={handleChange} autoComplete="off" ></input>
      <button className="comment-button btn btn-dark"><i className="far fa-comment"></i></button>
    </form>
  )
}

export default CommentForm
