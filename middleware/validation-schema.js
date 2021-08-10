
function validateSchema (data, schema) {
  const { error } = schema.validate(data)
  return error
}

function schemaValidationMiddleware (schema, check = 'body') {
  return (req, res, next) => {
    const error = validateSchema(req[check], schema)
    console.log('Schema Validation', error)
    error
      ? res.status(401).json({ error: error.message })
      : next()
  }
}

module.exports = schemaValidationMiddleware
