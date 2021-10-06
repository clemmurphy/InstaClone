import React from 'react'

function CommentForm() {
  return (
    <form className="d-flex justify-content-between">
      <textarea className="form-control flex-grow-1"></textarea>
      <button style={{ marginLeft: '10px'}} className="btn btn-dark btn-lg"><i className="far fa-comment"></i></button>
    </form>
  )
}

export default CommentForm
