// require('babel-register')({only: '/frontend/,'});
// const graphql = require('graphql').graphql
const buildSchema = require('graphql').buildSchema
const express = require('express')
const graphQLHTTP = require('express-graphql')

const connectMongo = require('./db-connector.js')
const Schema = buildSchema(require('./schema'))
const Root = require('./resolvers')

// const Root = require('./resolvers')
// const Schema = require('./schema.js')
// const Component = require('frontend/componenet.jsx')

// var ExTodos = [{
//   'id': 1446739542,
//   'title': 'Read emails',
//   'completed': false
// }, {
//   'id': 1412740883,
//   'title': 'Buy orange',
//   'completed': true

// }]
const start = async () => {
  const mongo = await connectMongo()
  console.log("Mongo - " + mongo.TODOs.find().forEach((item) => console.log(item)))
  // await mongo.insert(ExTodos)
  const app = express()
    // .use('/', graphQLHTTP({schema: Schema, graphiql: true, pretty: true} ))
    .use('/', graphQLHTTP({
      schema: Schema,
      rootValue: Root,
      context: {mongo},
      graphiql: true,
      pretty: true}))
    .listen(8080, function (err) { err ? console.warn(err) : console.log('GraphQL is now running on localhost:8080') })
    console.log('Started')
}

start()

// const query = 'query { todos { id, title, completed} }'
// graphql(Schema, query, Root).then(function (result) {
//   console.log(JSON.stringify(result))
//   console.log(JSON.stringify(result.data.todos[0].title))
// })
