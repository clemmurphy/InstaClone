import User from '../models/user.js'

export const followUser = async (req, res) => {
  try {
    const { id } = req.params

    // Get user to follow and current user
    const userToFollow = await User.findById(id)
    const currentUser = await User.findById(req.currentUser._id)

    if (!userToFollow) throw new Error('User doesn\'t exist!')

    // Check to see if they are already following
    if (await userToFollow.followers.some(follower => follower.equals(currentUser._id))) throw new Error('You are already following that user!')
    console.log('Not already following')


    // Update user models with followers and following
    await User.updateOne({ _id: id }, { followers: [ ...userToFollow.followers, currentUser._id ] })
    await User.updateOne({ _id: currentUser._id }, { following: [ ...currentUser.following, userToFollow._id ] })

    res.status(200).json(`Followed ${userToFollow.username}`)
    
  } catch (err) {
    console.log(err)
    res.status(403).json({ message: 'You can\'t follow that person!' })
  }

}

export const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params

    // Get user to unfollow and current user
    const userToUnfollow = await User.findById(id)
    const currentUser = await User.findById(req.currentUser._id)

    // If there is no user found, throw an error
    if (!userToUnfollow) throw new Error('User doesn\'t exist!')

    // Check to see if they are already following
    if (!await userToUnfollow.followers.some(follower => follower.equals(currentUser._id))) throw new Error('You do not follow that user!')

    // Create updated followers and following arrays
    const updatedFollowers = userToUnfollow.followers.pull(currentUser._id)

    const updatedUserFollowing = currentUser.following.pull(id)

    // Update user models with followers and following
    await User.updateOne({ _id: id }, { followers: updatedFollowers })
    await User.updateOne({ _id: currentUser._id }, { following: updatedUserFollowing })
    

    res.status(200).json(`Unfollowed ${userToUnfollow.username}`)
    
  } catch (err) {
    console.log(err)
    res.status(403).json({ message: 'You can\'t unfollow that person!' })
  }
}