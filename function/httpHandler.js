'use strict'

const HttpError = require('../error/HttpError')

module.exports = ({ tokenValidator }) => handler => (context, req) => {
  context.log('Request =', JSON.stringify(req, null, 2))

  try {
    if (tokenValidator) {
      context.bindings.tokenClaim = tokenValidator(req.headers.token)
    }

    const res = (status, body) => {
      context.log('Response =', JSON.stringify({ status, body }, null, 2))
      context.res = { status, body }
    }

    handler(context, req, res)
    context.done(null, context.res)
  } catch (e) {
    context.log.error(e)

    const message = e.message || 'error.internal'
    let status = 500

    if (e instanceof HttpError) {
      status = e.status || 500
    }
    
    context.done(null, { status, body: { message } })
  }
}