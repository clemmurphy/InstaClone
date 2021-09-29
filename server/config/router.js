import express from 'express'
import { getAllPosts } from '../controllers/posts.js'
import { getAllUsers, createNewUser, getSingleUser, loginUser } from '../controllers/auth.js'

const router = express.Router()

router.route('/posts')
  .get(getAllPosts)

// Get all users
router.route('/u/')
  .get(getAllUsers)

// Get single user
router.route('/u/:username')
  .get(getSingleUser)

// Login route
router.route('/login')
  .post(loginUser)

// Register Route
router.route('/register')
  .post(createNewUser)

export default router