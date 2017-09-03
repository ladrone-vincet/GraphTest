const {MongoClient} = require('mongodb')

const MONGO_URL = 'mongodb://localhost:27017/gqlTest'

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL) // Validation?
  return {TODOs: db.collection('todos')}
}
