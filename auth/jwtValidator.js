const jwt = require('jsonwebtoken')
const HttpError = require('../error/HttpError')

module.exports = tokenKey => token => {
  if (!tokenKey) {
    throw new HttpError(500, 'auth.tokenKey.missing')
  }

  try {
    return jwt.verify(token, tokenKey)
  } catch (e) {
    throw new HttpError(401, 'auth.token.invalid')
  }
}