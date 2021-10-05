import Comment from '../models/comment.js'
import Post from '../models/post.js'

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
    const { id } = req.params
    const findPost = await Post.findById(id)
    const userId = await req.currentUser._id
    const newComment = await Comment.create(
      { content: req.body.content,
        owner: userId,
        parentPost: findPost 
      })
    findPost.comments.push(newComment.content)
    res.status(201).json(newComment)
  } catch (error) {
    console.log(error)
    console.log('couldn\'t add comment')
    return res.status(422).json(error)
  }
}

// Delete a comment
export const deleteComment = async (req,res) => {
  try {
    const { id } = req.params
    const commentToDelete = await Comment.findById(id)
    if (!commentToDelete) throw new Error()
    await commentToDelete.remove()
    console.log('Deleted comment')
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: 'comment not found' })
  }
}