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

module.exports = {
  addBalanceSchema,
  payParkingSchema
}
