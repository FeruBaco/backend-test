const jwt = require('jsonwebtoken')

exports.decodeJwt = (token) => {
  try {
    const decodedToken = jwt.decode(token)
    return decodedToken
  } catch (error) {
    console.error('JWT Decode error', error)
  }
}
