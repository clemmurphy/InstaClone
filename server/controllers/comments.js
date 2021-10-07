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
    if (!req.body.content) throw new Error('Please provide comment text')
    if (!req.body.owner) throw new Error('Invalid signin token!')
    const findPost = await Post.findById(req.body.parentPost)
    const newComment = await Comment.create(
      { content: req.body.content,
        owner: req.body.owner,
        parentPost: findPost
      })
    await Post.updateOne({ _id: findPost._id }, { comments: [ ...findPost.comments, newComment ] })
    res.status(201).json(newComment)
  } catch (error) {
    console.log(error)
    console.log('Couldn\'t add comment', error.message)
    return res.status(422).json(error.message)
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