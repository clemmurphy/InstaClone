import express from 'express'
import { getAllPosts, addPost, updatePost, getSinglePostById, deletePost } from '../controllers/posts.js'

const router = express.Router()

router.route('/posts')
  .get(getAllPosts)
  .post(addPost)
router.route('/posts/:id')
  .get(getSinglePostById)
  .put(updatePost)
  .delete(deletePost)

export default router