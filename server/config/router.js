import express from 'express'
import { getAllPosts } from '../controllers/posts.js'

const router = express.Router()

router.route('/posts')
  .get(getAllPosts)

export default router