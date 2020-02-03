'use strict'

const layerpath = process.env.LAYERPTH || '../layer/nodejs/'

const Response = require(layerpath + 'response')
const { Sala, Reuniao, Sequelize } = require(layerpath + 'models')

module.exports.handler = async event => {
  try {

    let {inicio, fim, sala_id} = event
    let reuniao = ''

    inicio = new Date(inicio)
    fim = new Date(fim)

    const ExisteSala = await Sala.findByPk(sala_id)

    if(ExisteSala == null){
      throw new Error('Sala não existe')
    }

    const ConflitoSala = await Reuniao.findAll({
      where: {
        SalaId: {
          [Sequelize.Op.eq]: sala_id
        },
        inicio: {
          [Sequelize.Op.lt]: fim
        },
        fim: {
          [Sequelize.Op.gt]: inicio
        }
      }
    })

    if(ConflitoSala.length > 0){
      throw new Error('Já existe uma reunião neste horario')
    }

    const reuniaoSave = await Reuniao.create({inicio, fim, SalaId: sala_id, UserId: 'a21a18bb-df19-46bb-b632-7b7f1529f6f9'})

    reuniao = {
      reuniao_id: reuniaoSave.dataValues.id,
      sala_id: reuniaoSave.dataValues.SalaId,
      user_id: reuniaoSave.dataValues.UserId,
      inicio: reuniaoSave.dataValues.inicio,
      fim: reuniaoSave.dataValues.fim
    }

    return reuniao

  } catch (e) {

    throw new Error(Response(400, e.message))

  } finally {
    // empty
  }

}
