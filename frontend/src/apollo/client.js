import { ApolloClient, InMemoryCache } from '@apollo/client'
import { BatchHttpLink } from 'apollo-link-batch-http'

const batchLink = new BatchHttpLink({ uri: 'http://127.0.0.1:4000' })
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        person: {
          keyArgs: ['_id'],
          // read: (existing, options) => {
          //   console.log(existing, options)
          //   if (existing) return existing
          // },
          // merge: (...args) => {
          //   console.log('Merge', args)
          // }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000',
  cache,
  link: batchLink
})

export default client