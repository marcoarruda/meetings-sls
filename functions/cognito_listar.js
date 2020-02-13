'use strict'

const AWS = require('aws-sdk')

function wrapper() {

  const userPool = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' })

  var params = {
    AttributesToGet: [],
    Filter: "",
    Limit: 10,
    UserPoolId: "us-east-1_qToVlCku5"
  }

  return new Promise((resolve, reject) => {
    userPool.listUsers(params, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports.handler = async event => {

  let users = await wrapper()

  return users

}