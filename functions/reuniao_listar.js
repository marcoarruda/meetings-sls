'use strict'

const layerpath = process.env.LAYERPTH || '../layer/nodejs/'

const { Reuniao, Sequelize } = require(layerpath + 'models')

module.exports.handler = async event => {
  try {

    let {ano, mes} = event
    let lastday = new Date(ano, mes, 0).getDate()
    let inicio = new Date(ano+'-'+mes+'-01')
    let fim = new Date(ano+'-'+mes+'-'+lastday)

    const reunioes = await Reuniao.findAll({
      where: {
        UserId: {
          [Sequelize.Op.eq]: 'a21a18bb-df19-46bb-b632-7b7f1529f6f9'
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

  } catch (e){

    throw new Error(JSON.stringify({
      statusCode: 400,
      message: e.message
    }))

  } finally {
    // empty
  }

}