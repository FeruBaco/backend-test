const Joi = require('joi')

const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.number().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const updateUserSchema = Joi.object({
  name: Joi.string().min(3),
  phone: Joi.string().min(8),
  email: Joi.string().email(),
  password: Joi.string()
})

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginUserSchema
}
