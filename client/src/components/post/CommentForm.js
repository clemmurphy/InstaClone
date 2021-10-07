import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios' 

function CommentForm() {
  const { id } = useParams()
  const [comment, setComment] = React.useState('')

  const handleChange = (event) => {
    const newComment = { [event.target.name]: event.target.value }
    setComment(newComment)
  }

const handleComment = async (e) => {
  e.preventDefault()
  try {
    const { data } =  await axios.post(`/api/p/${id}/comment`)
    setComment(data)
    console.log( data)
  } catch (error) {
    console.log(error)
  }
}
console.log(comment)
  return (
    <form className="comment-form d-flex justify-content-between" onSubmit={handleComment}>
      <input className="form-control" placeholder="Add a comment..." onInput={handleChange}></input>
      <button className="comment-button btn btn-dark"><i className="far fa-comment"></i></button>
    </form>
  )
}

export default CommentForm
