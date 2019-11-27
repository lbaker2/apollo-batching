import { ApolloClient, InMemoryCache, split } from '@apollo/client'
import { BatchHttpLink } from 'apollo-link-batch-http'

const batchLink = new BatchHttpLink({ uri: 'http://127.0.0.1:4000' })
const directBatchLink = new BatchHttpLink({ uri: 'http://127.0.0.1:4002' })
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        person: {
          keyArgs: ['_id']
        }
      }
    }
  }
})

const client = new ApolloClient({
  // uri: 'http://127.0.0.1:4000',
  cache,
  link: split(
    op => op.getContext().direct,
    directBatchLink,
    batchLink
  )
})

export default client