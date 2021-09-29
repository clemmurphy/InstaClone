import express from 'express'
import { addComment, deleteComment, getAllComments } from '../controllers/comments.js'
import { getAllPosts, addPost, updatePost, getSinglePostById, deletePost } from '../controllers/posts.js'

const router = express.Router()
// Post Routes
router.route('/p')
  .get(getAllPosts)
  .post(addPost)
router.route('/p/:id')
  .get(getSinglePostById)
  .put(updatePost)
  .delete(deletePost)

// Comment Routes
router.route('/c')
  .get(getAllComments)
  .post(addComment)
router.route('/c/:id')
  .delete(deleteComment)
  


export default router