import React from 'react'

function CommentForm() {
  return (
    <form className="comment-form d-flex justify-content-between">
      <input className="form-control" placeholder="Add a comment"></input>
      <button className="comment-button btn btn-dark"><i className="far fa-comment"></i></button>
    </form>
  )
}

export default CommentForm
