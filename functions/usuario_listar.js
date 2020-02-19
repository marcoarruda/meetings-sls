'use strict'

const AWS = require('aws-sdk')

function wrapper() {

  const userPool = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' })

  var params = {
    AttributesToGet: ["name", "email"],
    Filter: "",
    Limit: 10,
    UserPoolId: "us-east-1_qToVlCku5"
  }

  return new Promise((resolve, reject) => {
    userPool.listUsers(params, (err, data) => {
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

  return users.Users.map(item => ({
    id: item.Username,
    name: item.Attributes.find(a => a.Name == "name").Value,
    email: item.Attributes.find(a => a.Name == "email").Value,
    created: item.UserCreateDate,
    modified: item.UserLastModifiedDate,
    enabled: item.Enabled,
    status: item.UserStatus,
  }))

}