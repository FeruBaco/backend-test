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

module.exports = {
  addBalanceSchema
}
