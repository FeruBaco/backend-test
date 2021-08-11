const express = require('express')
const router = express.Router()
const validation = require('../middleware/validationSchema')
const AdminController = require('../controllers/admin.controller')

// Middlewares
const { isAdmin } = require('../middleware/auth')
const { tradeReportSchema } = require('../utils/schemas/trade')

// Route /v1/admin/trade-report - Retrieve trade report
router.get('/trade-report',
  validation(tradeReportSchema),
  isAdmin,
  AdminController.tradeReport)
// Route /v1/admin/trade-report - Retrieve trade report test
router.get('/trade-test',
  isAdmin,
  AdminController.tradeReportTest)

module.exports = router
