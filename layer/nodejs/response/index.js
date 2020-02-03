'use strict'

module.exports = function Response(statusCode, body) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body, null, 2)
  }
}