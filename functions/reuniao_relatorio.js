'use strict'

const { Reuniao, Sequelize, sequelize } = require('../layer/models')

module.exports.handler = async event => {
  try {

    let {user, ano, mes} = event

    let lastday = new Date(ano, mes, 0).getDate();
    let inicio = new Date(ano+"-"+mes+"-01");
    let fim = new Date(ano+"-"+mes+"-"+lastday);

    const reunioes = await Reuniao.findAll({
        where: {
            UserId: {
                [Sequelize.Op.eq]: user
            },
            inicio: {
              [Sequelize.Op.lte]: fim
              },
            fim: {
              [Sequelize.Op.gte]: inicio
              }
        }
    });

    if(reunioes.length < 1){
      throw new Error('Não há reunioes para o usuário selecionado no periodo selecionado');
    }

    //console.log(reunioes);

    return reunioes;

  } catch (e){

    throw new Error(JSON.stringify({
        statusCode: 400,
        message: e.message
    }));

  } finally {

  }

}