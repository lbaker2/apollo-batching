const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const DataLoader = require('dataloader')

const typeDefs = gql`
  type Team @key(fields: "_id") {
    _id: Int!
    name: String
    people: [Person]
  }

  extend type Person @key(fields: "_id") {
    _id: Int! @external
  }

  extend type Query {
    team(_id: Int): Team
  }
`

const teams = [
  { _id: 0, name: 'Falcons', people: [0, 1, 2] },
  { _id: 1, name: 'Rangers', people: [3, 4, 5] },
  { _id: 2, name: 'Stars', people: [6, 7, 8] },
  { _id: 3, name: 'Warriors', people: [0, 3, 6] }
]

const findTeam = _id => teams.find(team => team._id === _id)
const TeamDataLoader = new DataLoader(async ids => {
  console.log('Loading teams', ids)
  return ids.map(findTeam)
}, { cacheKeyFn: id => `${id}` })

const resolvers = {
  Team: {
    people: team => team.people.map(
      personId => ({ _id: personId, __typename: 'Person' })
    )
  },
  Query: {
    team: (_obj, { _id }, context) => {
      console.log('TS:', context.timestamp)
      return TeamDataLoader.load(_id)
    }
  }
}

module.exports = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  // typeDefs, resolvers,
  context: () => {
    const timestamp = new Date().getTime()
    console.log('creating teams context', timestamp)
    return { timestamp }
  }
})