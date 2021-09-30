import User from '../models/user.js'

export const followUser = async (req, res) => {
  try {
    const { id } = req.params

    // Get user to follow and current user
    const userToFollow = await User.findById(id)
    const currentUser = await User.findById(req.currentUser._id)

    console.log(`current user: ${currentUser._id}`)
    console.log(`user to follow: ${userToFollow._id}`)

    // Check to see if they are already following

    // Add to followers and following
    await userToFollow.followers.push(req.currentUser._id)
    await currentUser.following.push(userToFollow._id)

    console.log(userToFollow.followers)
    console.log(currentUser.following)

    await userToFollow.save().catch(err => console.log(err))
    await currentUser.save().catch(err => console.log(err))

    res.status(200).json(`Followed ${userToFollow.username}`)
    
  } catch (err) {
    console.log('You can\'t follow that person!')
    res.status(403).json({ message: 'You can\'t follow that person!' })
  }

}

export const unfollowUser = (req, _res) => {
  console.log(req)
}