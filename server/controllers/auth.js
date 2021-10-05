import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

// Get all users
export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find()
    console.log(users)
    console.log('😃 All users successfully fetched')
    return res.status(202).json(users)
  } catch (err) {
    console.log('🚫 Error getting all users')
    return res.status(422).json('Error')
  }
  
}

// Get single user by username
export const getSingleUser = async (req, res) => {
  try {
    const { username } = req.params
    const user = await User.find({ username: username })
    console.log(user)
    console.log(`😎 User ${user.username} found`)
    return res.status(202).json(user)
  } catch (err) {
    console.log('🚫 Error getting user')
    return res.status(404).json('🤷‍♂️ User not found!')
  }
}

// Create a new user using request data
export const createNewUser = async (req, res) => {
  try {
    console.log(req.body)
    const userToCreate = await User.create(req.body)
    console.log('User created')
    return res.status(202).json({ message: `🎶 New user created! Welcome ${userToCreate.username}` })
  } catch (err) {
    console.log('🚫 Error creating new user', err)
    return res.status(422).json('Unable to create new user')
  }
}

// Log a user in by username using json web token
export const loginUser = async (req, res) => {
  try {
    const userToLogin = await User.findOne({ username: req.body.username })
    // Check if passwords match TODO - break out into two functions for better error messages
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      console.log('🚫 Passwords do not match!')
      throw new Error()
    }
    // Generate login token
    const token = jwt.sign({ sub: userToLogin._id }, process.env.secret, { expiresIn: '7 days' })
    console.log('User login token:', token)
    return res.status(200).json({
      message: `Welcome back ${userToLogin.username}`,
      token,
      id: userToLogin._id,
      username: userToLogin.username
    })
  } catch (err) {
    console.log('🚫 Error logging in')
    return res.status(422).json('Error logging in')
  }
}