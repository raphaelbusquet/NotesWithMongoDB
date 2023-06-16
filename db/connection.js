
require('dotenv').config()
const {MongoClient} = require('mongodb');

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.kgann8z.mongodb.net/Notes?retryWrites=true&w=majority`; 

let _db; 

const initDb = cb => {

  MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      _db = client;
      cb(null, _db);
    })
    .catch(err => {
      cb(err);
    });

}

const getDb = () => {

  return _db;

}

module.exports = {
  initDb,
  getDb
}