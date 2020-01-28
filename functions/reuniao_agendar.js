'use strict';

module.exports.handler = async event => {
  console.log(event)

  let reuniao = {
    reuniao_id: 1,
    user_id: '23456789-jhgfd-7890-kjhgfd',
    sala_id: 1,
    inicio: new Date(),
    fim: new Date()
  }

  return reuniao

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
