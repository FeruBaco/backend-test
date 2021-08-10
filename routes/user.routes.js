const express = require('express')
const router = express.Router()
const validation = require('../middleware/validation-schema')
const UserController = require('../controllers/user.controller')

// Middlewares
const { isUser } = require('../middleware/auth')
const { updateUserSchema } = require('../utils/schemas/user')
const { addBalanceSchema } = require('../utils/schemas/balance')

// Route /v1/user/update - Update user info
router.patch('/update',
  validation(updateUserSchema),
  isUser,
  UserController.updateUser)
// Route /v1/user/add-balance - Add amount to user balance
router.post('/add-balance',
  validation(addBalanceSchema),
  isUser,
  UserController.addBalance)

module.exports = router
