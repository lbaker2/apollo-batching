import React from 'react'
import ApolloProvider from './apollo/provider'
import List from './components/List'
import { DirectContext } from './components/Context'
const App = () => (
  <ApolloProvider>
    <DirectContext.Provider value={{ direct: false }}>
      <h2>Using Gateway</h2>
      <List />
    </DirectContext.Provider>
    <DirectContext.Provider value={{ direct: true }}>
      <h2>Using Service</h2>
      <List />
    </DirectContext.Provider>
  </ApolloProvider>
)

export default App
