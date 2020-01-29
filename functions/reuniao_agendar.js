'use strict'

const { Sala, Reuniao, Sequelize, sequelize } = require('../layer/models')

module.exports.handler = async event => {
  try {
    // let nome = 'Sala 01'
    // try {
    //   const sala = await Sala.create({ nome })
    // } catch (ex) {
    //   throw new Error('Algo deu errado')
    // }

    let {inicio, fim, sala_id} = event

    inicio = new Date(inicio);
    fim = new Date(fim);

    const ExisteSala = await Sala.findByPk(sala_id);

    let reuniao = '';
    if(ExisteSala == null){
      throw new Error('Sala não existe');
    }

    const ConflitoSala = await Reuniao.findAll({
      where: {
        inicio: {
          [Sequelize.Op.lt]: fim
          },
        fim: {
          [Sequelize.Op.gt]: inicio
          }
       }
    });

    if(ConflitoSala.length > 0){
      throw new Error('Já existe uma reunião neste horario');
    }

    const reuniaoSave = await Reuniao.create({inicio, fim, SalaId: sala_id, UserId: 'a21a18bb-df19-46bb-b632-7b7f1529f6f9'});

    reuniao = {
      reuniao_id: reuniaoSave.dataValues.id,
      sala_id: reuniaoSave.dataValues.SalaId,
      user_id: reuniaoSave.dataValues.UserId,
      inicio: reuniaoSave.dataValues.inicio,
      fim: reuniaoSave.dataValues.fim
    };

    return reuniao;

  } catch (e){

    throw new Error(e.message);

  } finally {

    sequelize.close();

  }

}
