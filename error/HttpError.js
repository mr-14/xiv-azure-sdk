function HttpError(status, message, fileName, lineNumber) {
  var instance = new Error(message, fileName, lineNumber)
  instance.status = status
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, HttpError)
  }
  return instance
}

HttpError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(HttpError, Error)
} else {
  HttpError.__proto__ = Error
}

module.exports = HttpError