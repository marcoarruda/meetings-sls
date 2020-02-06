'use strict'

const layerpath = process.env.LAYERPTH || '../layer/nodejs/'

const Response = require(layerpath + 'response')
const { Reuniao, Sequelize } = require(layerpath + 'models')

module.exports.handler = async event => {
  try {

    let { user_id, ano, mes } = event

    let lastday = new Date(ano, mes, 0).getDate()
    let inicio = new Date(ano + '-' + mes + '-01')
    let fim = new Date(ano + '-' + mes + '-' + lastday)

    const reunioes = await Reuniao.findAll({
      where: {
        UserId: {
          [Sequelize.Op.eq]: user_id
        },
        inicio: {
          [Sequelize.Op.lte]: fim
        },
        fim: {
          [Sequelize.Op.gte]: inicio
        }
      }
    })

    return reunioes

  } catch (e) {

    throw new Error(Response(400, e.message))

  } finally {
    // empty
  }

}