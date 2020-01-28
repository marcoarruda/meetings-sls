'use strict';

module.exports.handler = async event => {
  let {inicio, fim, sala_id} = event;
  console.log(inicio);
  let reuniao = {
    reuniao_id: 1,
    user_id: '23456789-jhgfd-7890-kjhgfd',
    sala_id: sala_id,
    inicio: inicio,
    fim: fim
  };

  const responseError = {
    statusCode: 400,
    erro: 'qlqer coisa!'
  }
  // throw new Error(JSON.stringify(responseError))

  return reuniao;

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
