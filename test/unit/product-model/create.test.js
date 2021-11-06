const { expect } = require('chai');
const sinon = require('sinon');
const mongoConnection = require('../../../src/model/connection');
const productModel = require('../../../src/model/productsModel');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe("#productsModel", () => {
  let connectionMock;

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db('model_example'));


    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  /* Restauraremos a função `getConnection` original após os testes. */
  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe("create", () => {
      it('returns a object' , async () => {
        const response = await productModel.create("Martelo do Thor", 1);

        expect(response).to.be.a('object');
      })

      it('the object has an id' , async () => {
        const response = await productModel.create("Martelo do Thor", 1);

        expect(response).to.have.a.property('_id');
      })

      it('the object has name and quantity' , async () => {
        const response = await productModel.create("Martelo do Thor", 1);

        expect(response).to.have.a.property('name');
        expect(response).to.have.a.property('quantity');
      })

      it('name and quantity are the same as the parameters' , async () => {
        const response = await productModel.create("Martelo do Thor", 1);

        expect(response.name).to.eq('Martelo do Thor');
        expect(response.quantity).to.eq(1);
      })
  })
});
