'use strict'

const { Reuniao, Sequelize, sequelize } = require('../layer/models')

module.exports.handler = async event => {
  try {

    console.log(event)

    let {ano, mes} = event
    console.log(ano);
    console.log(mes);
    let lastday = new Date(ano, mes +1, 0).getDate();
    let inicio = new Date(ano+"-"+mes+"-01");
    let fim = new Date(ano+"-"+mes+"-"+lastday);

    const reunioes = await Reuniao.findAll({
        where: {
            UserId: {
                [Sequelize.Op.eq]: "a21a18bb-df19-46bb-b632-7b7f1529f6f9"
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
      throw new Error('Não há reunioes no periodo selecionado');
    }

    //console.log(reunioes);

    return reunioes;

  } catch (e){

    throw new Error(JSON.stringify({
        statusCode: 400,
        message: e.message
    }));

  } finally {

    sequelize.close();

  }

}