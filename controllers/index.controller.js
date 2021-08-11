require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
  // Login user
  login: async function (req, res) {
    const { body } = req
    const { email, password } = body

    const user = await User.findOne({ email })

    /**
    * Check if user is not null and compare password in DB and req
    */
    const checkPassword = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && checkPassword)) {
      return res.status(401).json({
        error: 'Invalid user or password'
      })
    }

    /**
     * Generate payload for JWT
     */
    const payload = {
      id: user._id,
      email: user.email,
      type: user.type
    }
    /**
     * Generate token with payload and expires in 12 hours
     */
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 12
      }
    )

    /**
     * Save token in user document and response token
     */
    user.access_token = token
    await user.save()
    return res.status(200).send({ accessToken: token })
  },
  // Register new users
  register: async function (req, res) {
    const { body } = req
    const { name, phone, email, password } = body
    const type = 'user'

    const createdUser = await User.findOne({ email })
    if (createdUser) { return res.status(400).json({ error: 'Email already registered.' }) }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      name,
      phone,
      email,
      passwordHash,
      type,
      balance: 0
    })

    const savedUser = await user.save()
    return res.status(201).send(savedUser)
  }
}
