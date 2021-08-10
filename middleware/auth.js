require('dotenv').config()
const jwt = require('jsonwebtoken')

function verifyToken (token) {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  if (!decodedToken.id) {
    return false
  }
  const { type: userType } = decodedToken
  return userType
}

function isAdmin (req, res, next) {
  const { access_token: accessToken } = req.query

  if (verifyToken(accessToken) === 'admin') { next() } else {
    res.status(401).json({
      error: 'Token missing or invalid'
    })
  }
}

function isUser (req, res, next) {
  const { access_token: accessToken } = req.query

  if (verifyToken(accessToken) === 'user') { next() } else {
    res.status(401).json({
      error: 'Token missing or invalid'
    })
  }
}

module.exports = {
  isAdmin: isAdmin,
  isUser: isUser
}
