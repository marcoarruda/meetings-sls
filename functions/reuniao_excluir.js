'use strict'

const layerpath = process.env.LAYERPTH || '../layer/nodejs/'

const Response = require(layerpath + 'response')
const { Reuniao } = require(layerpath + 'models')

module.exports.handler = async event => {
  try {

    let {id} = event
    let reuniao = ''

    const reuniaoSave = await Reuniao.findByPk(id)

    if(reuniaoSave == null){
      throw new Error('Reunião não existe')
    }

    reuniao = {
      reuniao_id: reuniaoSave.id,
      sala_id: reuniaoSave.SalaId,
      user_id: reuniaoSave.UserId,
      inicio: reuniaoSave.inicio,
      fim: reuniaoSave.fim
    }

    await reuniaoSave.destroy()

    return reuniao

  } catch (e) {

    throw new Error(Response(400, e.message))

  } finally {
    // empty
  }

}
