'use strict'

const layerpath = process.env.LAYERPTH || '../layer/nodejs/'

const Response = require(layerpath + 'response')
const { Sala, Sequelize } = require(layerpath + 'models')

module.exports.handler = async event => {
  try {

    const salas = await Sala.findAll()

    return salas

  } catch (e) {

    throw new Error(Response(400, e.message))

  } finally {
    // empty
  }

}