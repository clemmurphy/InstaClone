import express from 'express'
import { addComment, deleteComment, getAllComments } from '../controllers/comments.js'
import { getAllPosts, addPost, updatePost, getSinglePostById, deletePost } from '../controllers/posts.js'
import { getAllUsers, createNewUser, getSingleUser, loginUser } from '../controllers/auth.js'

const router = express.Router()

// POST ROUTES
router.route('/p')
  .get(getAllPosts)
  .post(addPost)

router.route('/p/:id')
  .get(getSinglePostById)
  .put(updatePost)
  .delete(deletePost)

// COMMENT ROUTES
router.route('/c')
  .get(getAllComments)
  .post(addComment)

router.route('/c/:id')
  .delete(deleteComment)

// USER ROUTES
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