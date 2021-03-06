const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const DataLoader = require('dataloader')

const typeDefs = gql`
  type Person @key(fields: "_id") {
    _id: Int!
    name: String
  }

  extend type Query {
    person(_id: Int): Person
  }
`

const people = [
  { _id: 0, name: 'Amy' },
  { _id: 1, name: 'John' },
  { _id: 2, name: 'Rebecca' },
  { _id: 3, name: 'Alice' },
  { _id: 4, name: 'Jane' },
  { _id: 5, name: 'Ryan' },
  { _id: 6, name: 'Aaron' },
  { _id: 7, name: 'Jimmy' },
  { _id: 8, name: 'Rachel' },
]

const findPerson = _id => people.find(person => person._id === _id)
const resolvers = {
  Person: {
    __resolveReference: (ref, context) => {
      console.log('Resolve Reference to Person', ref._id)
      return context.PersonDataLoader.load(ref._id)
    }
  },
  Query: {
    person: (_obj, { _id }, context) => context.PersonDataLoader.load(_id)
  }
}

module.exports = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: ({ req }) => {
    console.log('Request', JSON.stringify(req.body))
    return {
      PersonDataLoader: new DataLoader(
        async ids => {
          console.log('Loading people', ids)
          return ids.map(findPerson)
        },
        { cacheKeyFn: id => `${id}` }
      )
    }
  }
})