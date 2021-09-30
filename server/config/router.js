import express from 'express'
import { addComment, deleteComment, getAllComments } from '../controllers/comments.js'
import { getAllPosts, addPost, updatePost, getSinglePostById, deletePost, likePost, unLikePost } from '../controllers/posts.js'
import { getAllUsers, createNewUser, getSingleUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { followUser, unfollowUser } from '../controllers/follow.js'

const router = express.Router()

// POST ROUTES
router.route('/p')
  .get(getAllPosts)
  .post(secureRoute, addPost)

router.route('/p/:id')
  .get(getSinglePostById)
  .put(secureRoute, updatePost)
  .delete(secureRoute, deletePost)


// COMMENT ROUTES
router.route('/c')
  .get(getAllComments)
  .post(secureRoute, addComment)

router.route('/c/:id')
  .delete(secureRoute, deleteComment)

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

// Like Route
router.route('/p/:id/like')
  .put(secureRoute, likePost)
  .delete(secureRoute, unLikePost)

// Follow/unfollow Route
router.route('/f/:id')
  .put(secureRoute, followUser)
  .delete(secureRoute, unfollowUser)

export default router