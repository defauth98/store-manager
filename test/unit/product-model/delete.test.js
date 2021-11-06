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

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe("delete", () => {
      it("return a id of deleted product", async () => {
        const product = await productModel.create('Martelo Thor', 2)

        const deletedProduct = await productModel.delete(product._id);

        expect(deletedProduct).to.have.property("_id");
        expect(deletedProduct).to.have.property("name");
        expect(deletedProduct).to.have.property("quantity");
      })
    })
});
