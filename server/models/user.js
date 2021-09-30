import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, maxlength: 30, unique: true },
  email: { type: String, required: true, maxlength: 50, unique: true },
  profilePicture: { type: String, required: true },
  password: { type: String, required: true },
  followers: [ { type: String, unique: true } ],
  following: [ { type: String, unique: true } ]
})

// Virtual field to verify password confirmation when password is created
userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// PRE VALIDATE
userSchema
  .pre('validate', function(next){
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Passwords don\'t match! 🚫')
    }
    next()
  })

// PRE SAVE
userSchema
  .pre('save', function(next){
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

// SAVE STAGE
userSchema.set('toJSON')

// Check plain text password from input against stored hash
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)