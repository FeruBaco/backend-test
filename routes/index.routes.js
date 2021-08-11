const express = require('express')
const router = express.Router()

const validation = require('../middleware/validationSchema')
const IndexController = require('../controllers/index.controller')

// Middleware
const {
  createUserSchema,
  loginUserSchema
} = require('../utils/schemas/user')

// Route /v1/login
router.post('/login', validation(loginUserSchema), IndexController.login)
// Route /v1/register
router.post('/register', validation(createUserSchema), IndexController.register)

module.exports = router
