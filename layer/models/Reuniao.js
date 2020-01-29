'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reuniao = sequelize.define('Reuniao', {
    inicio: DataTypes.DATE,
    fim: DataTypes.DATE,
    SalaId: DataTypes.STRING,
    UserId: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Reuniao',
  });
  Reuniao.associate = function(models) {
    Reuniao.belongsTo(models.Sala, {
      foreignKey: {
        name: 'SalaId',
        fieldName: 'SalaId',
      },
      as: 'Sala',
    });
  };
  return Reuniao;
};