const bcrypt = require('bcrypt')
const axios = require('axios')
const jwtUtils = require('../utils/jwt')
const User = require('../models/User')
const Trade = require('../models/Trade')

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
      return res.status(400).json({
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
      return res.status(200).send(updatedUser)
    } catch (error) {
      return res.status(400).json({
        error: 'Error in updating "User" data.'
      })
    }
  },
  // Add amount to user balance
  addBalance: async function (req, res) {
    const { id, amount } = req.body
    try {
      const user = await User.findOne({ _id: id })
      const newBalance = user.balance + amount
      await User.updateOne({ _id: id }, { balance: newBalance })
      const updatedUser = await User.findOne({ _id: id })
      return res.status(200).send(updatedUser)
    } catch (error) {
      return res.status(400).json({
        error: 'Error adding new balance.'
      })
    }
  },
  // Retrieve parking list
  getParkings: async function (req, res) {
    try {
      const parkings = await axios.get('https://dev.parcoapp.com/api/Parkings')
      return res.status(200).send(parkings.data)
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        error: 'Error getting parking list.'
      })
    }
  },
  // Retrieve parking list with status 0
  getActiveParkings: async function (req, res) {
    try {
      const parkings = await axios.get('https://dev.parcoapp.com/api/Parkings')
      const activeParkings = parkings.data.filter(obj => {
        return obj.status === 0
      })
      return res.status(200).send(activeParkings)
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        error: 'Error getting parking list.'
      })
    }
  },
  // Pay parking
  payParking: async function (req, res) {
    const { userId, amount, parkingId } = req.body
    // Generate ticket for test purpose
    const ticket = Math.random().toString(6).substr(2, 6)
    try {
      /**
       * Validate if parking has status 0
       */
      const parkings = await axios.get('https://dev.parcoapp.com/api/Parkings')
      const parkingData = parkings.data.find((obj) => {
        if (obj.id === parkingId && obj.status === 0) { return obj }
        return null
      })
      if (!parkingData) {
        return res.status(200).json({
          error: 'Invalid parking id.'
        })
      }
      /**
       * Validate if user has sufficient funds
       */
      const user = await User.findOne({ _id: userId })
      const userBalance = user.balance
      if (amount > userBalance) {
        return res.status(200).json({
          error: 'Insufficient funds.'
        })
      }
      const newBalance = userBalance - amount
      console.log(newBalance)
      await User.updateOne({ _id: userId }, { balance: newBalance })
      const trade = new Trade({
        total: amount,
        ticket: ticket,
        user: userId,
        parking: parkingId
      })
      const savedTrade = await trade.save()
      return res.status(200).send(savedTrade)
    } catch (error) {
      return res.status(400).json({
        error: 'Error in transaction.'
      })
    }
  },
  // Retrieve trades from especific user
  getTrades: async function (req, res) {
    const { userId } = req.body
    try {
      const trades = await Trade.find({ user: userId })
      return res.status(200).send(trades)
    } catch (error) {
      return res.status(400).json({
        error: 'Error adding new balance.'
      })
    }
  }
}
