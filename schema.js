var graphql = require('graphql');

var TODOs = [{
    "id": 1446739542,
    "title": "Read emails",
    "completed": false
}, {
    "id": 1412740883,
    "title": "Buy orange",
    "completed": true
}];

var TodoType = new graphql.GraphQLObjectType({
    name: 'todo',
    fields: function() {
        return {
            id: {
                type: graphql.GraphQLID
            },
            title: {
                type: graphql.GraphQLString
            },
            completed: {
                type: graphql.GraphQLBoolean
            }
        };
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function() {
        return {
            todos: {
                type: new graphql.GraphQLList(TodoType),
                resolve: () => {
                    return TODOs;
                }
            }
        }
    }
});

var MutationAdd = {
  type: new graphql.GraphQLList(TodoType),
  description: 'Add a Todo',
  args: {
    title: {
      name: 'Todo title',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    }
  },
  resolve: (root, {title}) => {
    // adding to database
    var newTodo = {
      id: (new Date()).getTime(),
      title: title,
      completed: false
      }
    TODOs.push(newTodo);
    return TODOs;
  }
}

var MutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd
  }
  })


module.exports = new graphql.GraphQLSchema({
    query: queryType,
    mutation: MutationType
});
