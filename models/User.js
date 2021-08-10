const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'This field is required']
  },
  phone: String,
  email: {
    type: String,
    required: [true, 'This field is required']
  },
  passwordHash: {
    type: String,
    required: [true, 'This field is required']
  },
  balance: Number,
  type: String,
  access_token: String
},
{
  timestamps: true
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
    delete returnedObject.updatedAt
    delete returnedObject.access_token
  }
})

const User = model('User', UserSchema)

module.exports = User
