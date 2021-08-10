const express = require('express')
const router = express.Router()
const validation = require('../middleware/validation-schema')
const UserController = require('../controllers/user.controller')

// Middlewares
const { isUser } = require('../middleware/auth')
const { updateUserSchema } = require('../utils/schemas/user')
const {
  addBalanceSchema,
  payParkingSchema
} = require('../utils/schemas/trade')

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

// Route /v1/user/parkings - Retrieve parking list
router.get('/parkings',
  isUser,
  UserController.getParkings)

// Route /v1/user/parkings - Retrieve parking list with status 0
router.get('/active-parkings',
  isUser,
  UserController.getActiveParkings)

// Route /v1/user/pay-parking - Pay parking
router.post('/pay-parking',
  validation(payParkingSchema),
  isUser,
  UserController.payParking)

module.exports = router
