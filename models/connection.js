const { MongoClient } = require('mongodb');
const { parsed } = require('dotenv').config();

const MONGO_DB_URL = parsed.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const DB_NAME = 'StoreManager';

const dbConnection = () => MongoClient
  .connect(MONGO_DB_URL, OPTIONS)
  .then((connect) => connect.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = {
  dbConnection,
};
