'use strict'

const layerpath = process.env.LAYERPTH || '../layer/nodejs/'

const Response = require(layerpath + 'response')
const { Sala, Reuniao, Sequelize } = require(layerpath + 'models')

module.exports.handler = async event => {
  try {

    let { user_id, id, inicio, fim, sala_id, nome } = event

    let reuniao = ''

    inicio = new Date(inicio)
    fim = new Date(fim)

    const reuniaoSave = await Reuniao.findByPk(id)

    if (reuniaoSave == null) {
      throw new Error('Reunião não existe')
    }

    const ExisteSala = await Sala.findByPk(sala_id)

    if (ExisteSala == null) {
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
        },
        id: {
          [Sequelize.Op.ne]: id
        }
      }
    })

    if (ConflitoSala.length > 0) {
      throw new Error('Já existe uma reunião neste horario')
    }

    reuniaoSave.inicio = inicio
    reuniaoSave.fim = fim
    reuniaoSave.SalaId = sala_id
    reuniaoSave.nome = nome

    await reuniaoSave.save()

    reuniao = {
      nome: reuniaoSave.nome,
      reuniao_id: reuniaoSave.id,
      sala_id: reuniaoSave.SalaId,
      user_id: reuniaoSave.UserId,
      inicio: reuniaoSave.inicio,
      fim: reuniaoSave.fim
    }

    return reuniao

  } catch (e) {

    throw new Error(Response(400, e.message))

  } finally {
    // empty
  }

}
