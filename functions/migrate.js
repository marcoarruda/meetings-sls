const Umzug = require('umzug')
const models = require(layerpath + 'models')
const sequelize = models.sequelize
const Sequelize = models.Sequelize

let migrationsPath = 'layer/migrations'
let seedersPath = 'layer/seeders'

module.exports.handler = async function (event) {
  const { undo } = event
  try {
    let response
    const umzug = new Umzug({
      storage: 'sequelize',

      storageOptions: {
        sequelize: sequelize,
      },

      migrations: {
        path: migrationsPath,
        pattern: /\.js$/,
        params: [
          sequelize.getQueryInterface(),
          Sequelize, // Sequelize constructor - the required module
        ],
      },
    })
    if (undo) {
      const migrationsUndo = await umzug.down({ to: 0 })
      console.log('Desfazendo Migrations...', migrationsUndo)
      await models.Seeders.destroy({ where: {}, truncate: true })
    }

    const pendingMigrations = await umzug.pending()
    console.log('Migrations Pendentes', pendingMigrations)

    const migrationsExecuted = await umzug.execute({
      migrations: pendingMigrations.map(m => m.file),
      method: 'up',
    })
    console.log('Executando Migrations...', migrationsExecuted)

    response = migrationsExecuted

    return response.map(r => ({ path: r.path, file: r.file }))
  } catch (error) {
    const response = {
      statusCode: 500,
      erro: error.message,
    }
    throw new Error(JSON.stringify(response))
  }
}
