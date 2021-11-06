const { expect } = require('chai');
const sinon = require('sinon');
const mongoConnection = require('../../../src/model/connection');
const salesModel = require('../../../src/model/salesModel');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe("#salesModel", () => {
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
    const sales = [
      {
        "productId": "6160267b2aa22b59a3012e2a",
        "quantity": 2
      }
    ]

      it("return a id of deleted product", async () => {
        const sale = await salesModel.create(sales);

        const response = await salesModel.delete(sale.id);

        expect(response).to.have.property("_id");
        expect(response).to.have.property("itensSold");
      })
    })
});
