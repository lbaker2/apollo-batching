import React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './client'
const GuestBookProvider = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

export default GuestBookProvider