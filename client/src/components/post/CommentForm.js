import React from 'react'

function CommentForm() {
  return (
    <form className="d-flex justify-content-between">
      <textarea className="fomr-control flex-grow-1"></textarea>
      <button style={{ marginLeft: '10px'}} className="btn btn-dark btn-lg">Comment</button>
    </form>
  )
}

export default CommentForm
