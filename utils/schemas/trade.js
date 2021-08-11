const Joi = require('joi')

const addBalanceSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  amount: Joi.number()
    .positive()
    .min(0)
    .required()
})

const payParkingSchema = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  amount: Joi.number()
    .positive()
    .min(0)
    .required(),
  parkingId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
})

const userTradesSchema = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
})

const tradeReportSchema = Joi.object({
  initialDate: Joi.date()
    .required(),
  finalDate: Joi.date()
    .required(),
  parkingId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
})

module.exports = {
  addBalanceSchema,
  payParkingSchema,
  userTradesSchema,
  tradeReportSchema
}
