const express = require('express')
const router = express.Router()

const validation = require('../middleware/validation-schema')
const IndexController = require('../controllers/index.controller')

// Middleware
const {
  createUserSchema,
  loginUserSchema
} = require('../utils/schemas/user')

router.post('/login', validation(loginUserSchema), IndexController.login)
router.post('/register', validation(createUserSchema), IndexController.register)

module.exports = router
