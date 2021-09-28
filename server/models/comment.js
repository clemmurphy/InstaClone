import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  content: { type: String, maxlength: 280, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  parentPost: { type: mongoose.Schema.ObjectId, ref: 'Post' }
}, { timestamps: true })

export default mongoose.model('Comment', commentSchema)