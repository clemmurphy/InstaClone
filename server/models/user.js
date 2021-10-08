import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, maxlength: 30, unique: true },
  email: { type: String, required: true, maxlength: 50, unique: true },
  profilePicture: { type: String, required: true },
  password: { type: String, required: true },
  followers: [ { type: mongoose.Schema.ObjectId, ref: 'User' } ],
  following: [ { type: mongoose.Schema.ObjectId, ref: 'User' } ],
  isVerified: { type: Boolean, default: false }
})

// Virtual field to verify password confirmation when password is created
userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// Remove password from the populated user object
userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json){ // first argument is the doc, which we're not using, second is the json which mirrors the doc, but isn't the doc
    delete json.password
    return json
  }
})

// PRE VALIDATE
// check password matches passwordConfirmation
userSchema
  .pre('validate', function(next){
    console.log('Verifying password confirmation')
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Passwords don\'t match! 🚫')
    }
    next()
  })

// PRE SAVE
// Create a hash password by passing in our password field and a salt
userSchema
  .pre('save', function(next){
    console.log('Hashing password')
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
      console.log('Password hashed')
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