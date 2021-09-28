import Post from '../models/post.js'

export const getAllPosts = async (_req, res) => {
  try {
    const posts = await Post.find()
    console.log('All posts:', posts)
    return res.status(200).json(posts)
  } catch (err) {
    console.log('Error getting posts')
  }
}