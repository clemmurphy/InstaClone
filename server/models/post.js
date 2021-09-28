import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  contentUrl: { type: String, required: true },
  caption: { type: String, maxlength: 280, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: [ { type: mongoose.Schema.ObjectId, ref: 'Comment' } ],
  likes: [ { type: mongoose.Schema.ObjectId, ref: 'User' } ]
},
{ timestamps: true })

// Populate users and comments into individual post?

export default mongoose.model('Post', postSchema)