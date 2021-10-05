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
    <form onSubmit={handleComment} className="d-flex justify-content-between">
      <textarea onInput={handleChange} name="comment" className="fomr-control flex-grow-1"></textarea>
      <button style={{ marginLeft: '10px'}} className="btn btn-dark btn-lg">Comment</button>
    </form>
  )
}

export default CommentForm
