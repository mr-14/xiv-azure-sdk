const jwt = require('jsonwebtoken')

module.exports = (token, tokenKey) => {
  if (!tokenKey) {
    throw new Error('auth.tokenKey.missing')
  }

  try {
    return jwt.verify(token, tokenKey)
  } catch (e) {
    throw new Error('auth.token.invalid')
  }
}