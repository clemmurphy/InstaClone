import Post from '../models/post.js'

// get all post 
export const getAllPosts = async (_req, res) => {
  try {
    const posts = await Post.find()
    console.log('All posts:', posts)
    return res.status(200).json(posts)
  } catch (err) {
    console.log('Error getting posts')
  }
}


// add new post without the user authentication and owner verification
export const addPost = async (req, res) => {
  try { 
    const newPost = await Post.create(req.body)
    res.status(201).json(newPost)
  } catch (error) {
    console.log(error)
    console.log('couldn\'t add post')
    return res.status(422).json(error)
  }
}


// get single post by ID
export const getSinglePostById = async (req,res) => {
  try {
    const { id } = req.params
    const singlePost = await Post.findById(id)
    return res.status(200).json(singlePost)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: ' post not found' })
  }
}

// TODO - add user verification

// update post without user authentication and owner verification 
export const updatePost = async (req,res) =>{
  const { id } = req.params
  try {
    const postToUpdate = await Post.findById(id)
    if (!postToUpdate) throw new Error()
    await postToUpdate.update(req.body)
    return res.status(202).json(postToUpdate)
  } catch (error) {
    console.log(error)
    console.log('could\'nt update post')
    return res.status(404).json({ message: error.message })
  }
}

// delete single post without authentication and owner verification
export const deletePost = async (req,res) => {
  try {
    const { id } = req.params
    const postToDelete = await Post.findById(id)
    if (!postToDelete) throw new Error()
    await postToDelete.remove()
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: 'post not found' })
  }
}