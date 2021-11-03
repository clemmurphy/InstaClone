import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  content: { type: String, maxlength: 280, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  parentPost: { type: mongoose.Schema.ObjectId, ref: 'Post' }
}, { timestamps: true })

// Always populate owner when you find all posts
commentSchema.pre('find', function() {
  this.populate('owner')
})

// Always populate owner when you find all posts
commentSchema.pre('findOne', function() {
  this.populate('owner')
})

export default mongoose.model('Comment', commentSchema)