// require('babel-register')({only: '/frontend/,'});
const graphql = require('graphql').graphql
const buildSchema = require('graphql').buildSchema
const express = require('express')
const graphQLHTTP = require('express-graphql')
var Schema = buildSchema(require('./schema'))
var Root = require('./resolvers')
// const Root = require('./resolvers')
// const Schema = require('./schema.js')
// const Component = require('frontend/componenet.jsx')

const query = 'query { todos { id, title, completed} }'
graphql(Schema, query, Root).then(function (result) {
  console.log(JSON.stringify(result))
  console.log(JSON.stringify(result.data.todos[0].title))
})

const app = express()
 // .use('/', graphQLHTTP({schema: Schema, graphiql: true, pretty: true} ))
  .use('/', graphQLHTTP({schema: Schema, rootValue: Root, graphiql: true, pretty: true}) )
  .listen(8080, function(err) { console.log("GraphQL is now running on localhost:8080")})
