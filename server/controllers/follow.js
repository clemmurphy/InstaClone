import User from '../models/user.js'

export const followUser = async (req, res) => {
  try {
    const { id } = req.params

    // Get user to follow and current user
    const userToFollow = await User.findById(id)
    const currentUser = await User.findById(req.currentUser._id)

    console.log(`current user: ${currentUser}`)
    console.log(`user to follow: ${userToFollow}`)

    // Check to see if they are already following
    console.log(await User.find({ followers: [ currentUser ] }))
    if (await User.find({ followers: [ currentUser ] }).length > 0) {
      console.log('You\'re already following them')
      throw new Error('User already followed')
    }
    console.log('Not already following')
    // Add to followers and following
    userToFollow.followers.push(currentUser._id)
    currentUser.following.push(userToFollow._id)

    console.log(userToFollow.followers)
    console.log(currentUser.following)

    userToFollow.save()
    currentUser.save()

    res.status(200).json(`Followed ${userToFollow.username}`)
    
  } catch (err) {
    console.log('You can\'t follow that person!')
    res.status(403).json({ message: 'You can\'t follow that person!' })
  }

}

export const unfollowUser = (req, _res) => {
  console.log(req)
}