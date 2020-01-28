'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sala = sequelize.define('Sala', {
    nome: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Sala',
  })
  Sala.associate = function(models) {
    // associations can be defined here
  }
  return Sala;
}