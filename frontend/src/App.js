import React from 'react'
import ApolloProvider from './apollo/provider'
import List from './components/List'
const App = () => (
  <ApolloProvider>
    <List />
  </ApolloProvider>
)

export default App
