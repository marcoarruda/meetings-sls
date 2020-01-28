'use strict'

const { Sala, Reuniao, Sequelize, sequelize } = require('../layer/models')

module.exports.handler = async event => {
  let nome = 'Sala 01'
  try {
    const sala = await Sala.create({ nome })
  } catch (ex) {
    throw new Error('Algo deu errado')
  }

  let {inicio, fim, sala_id} = event

  let inicioF = new Date(inicio);
  let fimF = new Date(fim);

  const ExisteSala = await Sala.findAll({
    where: {id: sala_id}
  });

  const ConflitoSala = await Reuniao.findAll({
    where: {
      inicio: {
        [Sequelize.Op.lt]: fimF
        },
      fim: {
        [Sequelize.Op.gt]: inicioF
        }
     }
  });

  let reuniao = '';
  if(ExisteSala !='' && ConflitoSala ==''){

    const reuniaoSave = await Reuniao.create({inicio: inicioF, fim: fimF, SalaId: sala_id, UserId: 'a21a18bb-df19-46bb-b632-7b7f1529f6f9'});

    reuniao = {
      reuniao_id: reuniaoSave.dataValues.id,
      sala_id: reuniaoSave.dataValues.SalaId,
      user_id: reuniaoSave.dataValues.UserId,
      inicio: reuniaoSave.dataValues.inicio,
      fim: reuniaoSave.dataValues.fim
    };
  }else{
    reuniao = "erro";
  }

  sequelize.close()

  return reuniao;

}
