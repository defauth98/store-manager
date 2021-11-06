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

  describe("findAll", () => {
    describe("when list is empty" , () => {
      it("returns a array", async () => {
        const response = await productModel.findAll();

        expect(response).to.be.a("array");
      })

      it("the array is empty", async () => {
        const response = await productModel.findAll();

        expect(response.length).equals(0)
      })
    })

    describe("when have a products", () => {
      before(async () => {
        await productModel.create("Martelo do Thor", 1);
      })

      it("return a array of products", async () => {
        const response = await productModel.findAll();

        expect(response.length).equals(1)
      })

      it('the product have an id', async () => {
        const response = await productModel.findAll();

        expect(response[0]).to.have.property("_id");
      })

      it('the product have name and quantity', async () => {
        const response = await productModel.findAll();

        expect(response[0]).to.have.property("name");
        expect(response[0]).to.have.property("quantity");
      })
    })
  })
});
