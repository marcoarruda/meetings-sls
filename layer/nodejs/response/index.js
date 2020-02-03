'use strict'

module.exports = function Response(statusCode, message) {
  return JSON.stringify({
    statusCode: statusCode,
    message: message
  })
}