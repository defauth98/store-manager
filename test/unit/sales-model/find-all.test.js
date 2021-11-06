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

  describe("findAll", () => {
    const sales = [
      {
        "productId": "6160267b2aa22b59a3012e2a",
        "quantity": 2
      }
    ]

    describe("when list is empty" , () => {
      it("returns a array", async () => {
        const response = await salesModel.findAll();

        expect(response).to.be.a("array");
      })

      it("the array is empty", async () => {
        const response = await salesModel.findAll();

        expect(response.length).equals(0)
      })
    })

    describe("when have a sales", () => {
      before(async () => {
        await salesModel.create(sales);
      })

      it("return a array of sales", async () => {
        const response = await salesModel.findAll();

        expect(response.length).equals(1)
      })

      it('the sale have an id', async () => {
        const response = await salesModel.findAll();

        expect(response[0]).to.have.property("_id");
      })

      it('the sale have name and quantity', async () => {
        const response = await salesModel.findAll();

        expect(response[0]).to.have.property("_id");
      })
    })
  })
});
