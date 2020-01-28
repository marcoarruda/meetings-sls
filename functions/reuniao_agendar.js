'use strict'

module.exports.handler = async event => {
  try {
    let { inicio, fim, sala_id } = event

    let reuniao = {
      reuniao_id: 1,
      sala_id: sala_id,
      user_id: '23456789-jhgfd-7890-kjhgfd',
      inicio: inicio,
      fim: fim
    }

    if (sala_id == 1) {
      throw new Error('invalid argument for sala_id')
    } else {
      return reuniao
    }
  } catch(ex) {
    const response = {
      statusCode: 400,
      erro: ex.message,
    }
    throw new Error(JSON.stringify(response))
  }
}
