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

  describe("find", () => {
    describe("when id not exists" , () => {
      it("returns null", async () => {
        const response = await productModel.find(999);

        expect(response).to.be.a("null");
      })
    })

    describe("when have an product", () => {
      it("return product", async () => {
        const product = await productModel.create("Martelo do Thor", 1);

        const response = await productModel.findOne(product._id);

        expect(response).to.have.property("_id");
        expect(response).to.have.property("name");
        expect(response).to.have.property("quantity");
      })
    })
  })
});
