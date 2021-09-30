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
    const postWithOwner = { ...req.body, owner: req.currentUser._id  }
    const newPost = await Post.create(postWithOwner)
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

// update post without user authentication and owner verification 
export const updatePost = async (req,res) =>{
  const { id } = req.params
  try {
    const postToUpdate = await Post.findById(id)
    if (!postToUpdate) throw new Error()
    if (!postToUpdate.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await postToUpdate.update(req.body)
    return res.status(202).json(postToUpdate)
  } catch (error) {
    console.log(error)
    console.log('could\'nt update post')
    return res.status(404).json({ message: error.message })
  }
}
export const likePost = async (req,res) => {

  const { id } = req.params
  try {
    const postToLike = await Post.findById(id)
    console.log('post to like', postToLike)
    
    if (!postToLike) throw new Error()
    if (postToLike.likes.some(like => like.equals(req.currentUser._id))) throw new Error('you already liked this post')
    await Post.updateOne(postToLike, { likes: [...postToLike.likes, req.currentUser._id] } )

    return res.status(200).json(`${req.currentUser._id} just liked post with an ${postToLike._id}`)
  
  } catch (err) {
    console.log('🆘 like not added')
    console.log(err)
  }
}


export const unLikePost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id) 
    if (!post) throw new Error('post not found') 
    if (!await post.likes.some(like => like.equals(req.currentUser._id))) throw new Error('you dont like that post')

    const updatedLikesArr = post.likes.pull(req.currentUser._id)
    console.log('new likes arr :', updatedLikesArr)
    await Post.updateOne({ _id: post._id }, { likes: updatedLikesArr })
    return res.sendStatus(204)

  } catch (err) {
    console.log('🆘  couldn\'nt unlike')
    console.log(err.message)
    return res.status(404).json(err.message)
  }
}

// delete single post without authentication and owner verification
export const deletePost = async (req,res) => {
  try {
    const { id } = req.params
    const postToDelete = await Post.findById(id)
    if (!postToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    if (!postToDelete) throw new Error()
    await postToDelete.remove()
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: 'post not found' })
  }
}