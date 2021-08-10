const bcrypt = require('bcrypt')
const jwtUtils = require('../utils/jwt')
const User = require('../models/User')

module.exports = {
  // Update user data
  updateUser: async function (req, res) {
    const { access_token: accessToken } = req.query
    const { name, phone, email, password } = req.body

    /**
     * JWT Validation if has user _id
     */
    const payload = jwtUtils.decodeJwt(accessToken)
    if (!payload.id) {
      res.status(400).json({
        error: 'Error in payload ID'
      })
    }
    /**
     * Check if email already exist
     */
    const createdUser = await User.findOne({ email })
    if (createdUser) { return res.status(400).json({ error: 'Email already exist.' }) }

    /**
     * Assign new data for update user
     */
    const updateQuery = {}
    if (name) { updateQuery.name = name }
    if (phone) { updateQuery.phone = phone }
    if (email) { updateQuery.email = email }
    if (password) {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      updateQuery.passwordHash = passwordHash
    }
    /**
     * Update user data and retrieve
     */
    try {
      await User.findOneAndUpdate({ _id: payload.id }, updateQuery)
      const updatedUser = await User.findOne({ _id: payload.id })
      res.status(200).send(updatedUser)
    } catch (error) {
      res.status(400).json({
        error: 'Error in updating "User" data'
      })
    }
  },
  // Add money to user account
  addBalance: async function (req, res) {

  }
}
