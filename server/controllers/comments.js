import Comment from '../models/comment.js'

// get all comments 
export const getAllComments = async (_req, res) => {
  try {
    const comments = await Comment.find()
    console.log('All comment:', comments)
    return res.status(200).json(comments)
  } catch (err) {
    console.log('something went wrong could\'nt get comment ')
  }
}


// add new comment
export const addComment = async (req, res) => {
  try { 
    const newComment = await Comment.create(req.body)
    res.status(201).json(newComment)
  } catch (error) {
    console.log(error)
    console.log('couldn\'t add comment')
    return res.status(422).json(error)
  }
}