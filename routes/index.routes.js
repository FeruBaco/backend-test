const express = require('express')
const router = express.Router()

const IndexController = require('../controllers/index.controller')

router.post('/login', IndexController.login)
router.post('/register', IndexController.register)

module.exports = router
