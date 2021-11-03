import mongoose from 'mongoose'
// import User from './user.js'

const postSchema = new mongoose.Schema({
  contentUrl: { type: String, required: true },
  caption: { type: String, maxlength: 280, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: [ { type: mongoose.Schema.ObjectId, ref: 'Comment' } ],
  likes: [ { type: mongoose.Schema.ObjectId, ref: 'User' } ]
},
{ timestamps: true, toJSON: { virtuals: true } })

// Always populate owner when you find all posts
postSchema.pre('find', function() {
  this.populate('owner')
  this.populate('comments')
})

// Always populate owner when you find all posts
postSchema.pre('findOne', function() {
  this.populate('owner')
  this.populate('comments')
})


export default mongoose.model('Post', postSchema)