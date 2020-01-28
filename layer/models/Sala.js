'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sala = sequelize.define('Sala', {
    nome: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Sala',
  })
  Sala.associate = function(models) {
    Sala.hasMany(models.Reuniao, {
      foreignKey: {
        name: 'SalaId',
        fieldName: 'SalaId',
      },
      as: 'Reuniao',
    });
  }
  return Sala;
}