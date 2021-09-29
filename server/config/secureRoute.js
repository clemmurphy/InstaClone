import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config
import User from '../models/user.js'

export const secureRoute = async (req, res, next) => {
  try {
    // Check for auth headers
    if (!req.headers.authorization) throw new Error('Missing headers')

    // Remove bearer and space from start of header
    const token = req.headers.authorization.replace('Bearer ', '')

    // Verify token using jwt sign
    const payload = jwt.verify(token, process.env.secret)

    // Query user model by id in payload
    const userToVerify = await User.findById(payload.sub)
    if (!userToVerify) throw new Error('User not found')

    req.currentUser = userToVerify

    // If it passes all tests, pass through
    next()

  } catch (err) {
    console.log('🚫 Not allowed')
    console.log(err)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}