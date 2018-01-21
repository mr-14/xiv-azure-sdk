const HttpError = require('../error/HttpError')

module.exports = ({ tokenValidator } = {}) => handler => (context, req) => {
  context.log('Request =', JSON.stringify(req, null, 2))

  try {
    if (tokenValidator) {
      context.bindings.tokenClaim = tokenValidator(req.headers.token)
    }

    const res = ({ err, status, body }) => {
      if (err) {
        handleError(context, err)
        return
      }

      context.log('Response =', JSON.stringify({ status, body }, null, 2))
      context.done(null, { status, body })
    }

    handler(context, req, res)
  } catch (e) {
    handleError(context, e)
  }
}

function handleError(context, e) {
  context.log.error(e)

  if (e instanceof HttpError) {
    context.done(null, {
      status: e.status || 500,
      body: {
        message: e.message,
        fields: e.fields
      }
    })
    return
  }

  context.done(null, {
    status: e.code || 500,
    body: { message: e.message || 'error.internal' }
  })
}