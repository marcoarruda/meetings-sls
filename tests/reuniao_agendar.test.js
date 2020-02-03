const chai = require('chai')
const expect = chai.expect

const { Sala } = require(layerpath + 'models/index')

const reuniao_agendar = require('../functions/reuniao_agendar').handler

describe('Teste reuniao_agendar', () => {
  // Setup de testes
  before(async () => {
    // nada
  })

  it('agendar uma reuniao', async () => {
    // Definir variaveis

    let event = {
      inicio: '2020-01-28T07:00:00Z',
      fim: '2020-01-28T12:00:00Z',
      sala_id: 1
    }

    let reuniao = await reuniao_agendar(event)

    expect(reuniao).to.have.property('reuniao_id')
    expect(reuniao).to.have.property('user_id')
    expect(reuniao).to.have.property('sala_id')
    expect(reuniao).to.have.property('inicio')
    expect(reuniao).to.have.property('fim')
  })

  it('validar horario conflitante', async () => {
    // Definir variaveis

    let event = {
      inicio: '2020-01-28T07:00:00Z',
      fim: '2020-01-28T12:00:00Z',
      sala_id: 1
    }

    let reuniao = await reuniao_agendar(event)

    expect(reuniao).not.to.have.property('reuniao_id')
    expect(reuniao).not.to.have.property('user_id')
    expect(reuniao).not.to.have.property('sala_id')
    expect(reuniao).not.to.have.property('inicio')
    expect(reuniao).not.to.have.property('fim')
  })
})