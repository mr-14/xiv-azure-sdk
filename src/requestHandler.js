const jwt = require('jsonwebtoken')

module.exports = handler => context => {
  context.log('Request:', JSON.stringify(context, null, 2))

  try {
    context.bindings.tokenClaim = verifyToken(req.headers.token, process.env.tokenKey)

    const resp = (status, body) => {
      context.log('Response:', JSON.stringify({ status, body }, null, 2))
      context.res = { status, body }
    }

    handler(context, req, resp)
    context.done()
  } catch (e) {
    context.done(e)
  }
}

function verifyToken(token, tokenKey) {
  if (!tokenKey) {
    throw new Error('auth.tokenKey.missing')
  }

  try {
    return jwt.verify(token, tokenKey)
  } catch (e) {
    throw new Error('auth.token.invalid')
  }
}