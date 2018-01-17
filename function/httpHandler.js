const jwt = require('jsonwebtoken')

module.exports = tokenValidator => handler => (context, req) => {
  context.log('Context:', JSON.stringify(context, null, 2))
  context.log('Request:', JSON.stringify(req, null, 2))

  try {
    if (tokenValidator) {
      context.bindings.tokenClaim = tokenValidator(req.headers.token, process.env.tokenKey)
    }

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