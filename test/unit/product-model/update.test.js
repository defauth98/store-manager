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

  describe("update", () => {
      it("returns a product", async () => {
        const product = await productModel.create('Martelo Thor', 2)

        const updatedProduct = await productModel.update(product._id, 'Martelo do Thor Dourado', 2);

        expect(updatedProduct).to.have.property("_id");
        expect(updatedProduct).to.have.property("name");
        expect(updatedProduct).to.have.property("quantity");
      })
    })
});
