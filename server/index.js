const { ApolloServer, gql } = require('apollo-server')
const { ApolloGateway } = require('@apollo/gateway')
const peopleService = require('./services/people')
const teamsService = require('./services/teams')

const startServices = () => {
  return Promise.all([
    peopleService.listen(4001)
      .then(({ url }) => console.log(`People service ready at ${url}`)),
    teamsService.listen(4002)
      .then(({ url }) => console.log(`Teams service ready at ${url}`))
  ])
}

// Start the services and then run the gateway
startServices().then(() => {
  const gateway = new ApolloGateway({
    serviceList: [
      { name: 'people', url: 'http://localhost:4001' },
      { name: 'teams', url: 'http://localhost:4002'}
    ]
  })
  
  const gatewayServer = new ApolloServer({ gateway, subscriptions: false })
  gatewayServer.listen(4000).then(({ url }) => console.log(`Gateway ready at ${url}`))
}).catch((errs) => console.log('Federated graph could not start...', errs))
