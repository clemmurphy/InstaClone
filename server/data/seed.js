import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import User from '../models/user.js'
import Post from '../models/post.js'
import Comment from '../models/comment.js'
import postData from './db/posts.js'
import userData from './db/users.js'
import commentData from './db/comments.js'

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.dbURI)
    console.log('⚡ Connected to the database')

    await mongoose.connection.db.dropDatabase()
    console.log('👋 Dropped all data')

    const users = await User.create(userData)
    console.log(`🧑 Created ${users.length} new users`)

    const posts = await Post.create(postData)
    await Post.updateMany({ owner: users[0] })
    console.log(`✍ Created ${posts.length} new posts`)

    const comments = await Comment.create(commentData)
    console.log(`✍ Created ${comments.length} new comments`)

    await mongoose.connection.close()
    console.log('✌ All done now. Byeee!')
  } catch (err) {
    console.log('🆘 Something went wrong')
    console.log(err)

    await mongoose.connection.close()
    console.log('✌ All done now. Byeee!')
  }
}

seedDatabase()