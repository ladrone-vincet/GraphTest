const {MongoClient} = require('mongodb')

const MONGO_URL = 'mongodb://localhost:27017/gqlTest'

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL)//, (err, db) => {
  // err ? console.warn(err + ' - - - - ERROR!') : console.log('DB connected - - - - GREAT!')
  // })
  // console.log('Log  ' + await db.collection('todos').find())
  return {TODOs: db.collection('todos')}
}
