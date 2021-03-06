// require('babel-register')({only: '/frontend/,'});
const buildSchema = require('graphql').buildSchema
const express = require('express')
const graphQLHTTP = require('express-graphql')
const cors = require('cors')

const connectMongo = require('./db/db-connector.js')
const Schema = buildSchema(require('./db/schema'))
const Root = require('./db/resolvers')

// const Root = require('./resolvers')
// const Schema = require('./schema.js')
// const Component = require('frontend/componenet.jsx')

const start = async () => {
  const mongo = await connectMongo()
  // console.log("Mongo - " + mongo.TODOs.find().forEach((item) => console.log(item)))
  // await mongo.insert(ExTodos)
  const app = express()
    // .use('/', graphQLHTTP({schema: Schema, graphiql: true, pretty: true} ))
    .use('*', cors({origin: 'http://localhost:8080'}))
    .use('/graphql', graphQLHTTP({
      schema: Schema,
      rootValue: Root,
      context: {mongo},
      graphiql: true,
      pretty: true}))
    .listen(8000, function (err) { err ? console.warn(err) : console.log('GraphQL is now running on localhost:8080') })
  console.log('Started')
}

start()
