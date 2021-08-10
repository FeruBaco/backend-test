const express = require('express')
const router = express.Router()
const validation = require('../middleware/validation-schema')
const UserController = require('../controllers/user.controller')

// Middlewares
const { isUser } = require('../middleware/auth')
const {
  updateUserSchema
} = require('../utils/schemas/user')

router.patch('/update',
  validation(updateUserSchema),
  isUser,
  UserController.updateUser)
router.post('/add-balance', isUser, UserController.addBalance)

module.exports = router
