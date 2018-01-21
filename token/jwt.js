const HttpError = require('../error/HttpError')
const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')

exports.createAccessToken = (user, tokenKey) => jwt.sign({
  merchantId: user.merchantId,
  userId: user.id,
  exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2) // 2 hours
}, tokenKey)

exports.createRefreshToken = () => ({
  token: uuidv4(),
  exp: Math.floor(Date.now() / 1000) + (60 * 60 * 8) // 8 hours
})

exports.saveRefreshToken = (tokenDao, user, refreshToken) => (
  tokenDao.insert({
    id: refreshToken.token,
    ttl: refreshToken.exp,
    userId: user.id
  })
)

exports.validateToken = tokenKey => token => {
  if (!tokenKey) {
    throw new HttpError(500, 'auth.tokenKey.missing')
  }

  try {
    return jwt.verify(token, tokenKey)
  } catch (e) {
    throw new HttpError(401, 'auth.token.invalid')
  }
}