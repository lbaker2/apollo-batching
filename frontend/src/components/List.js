import { gql, useQuery } from '@apollo/client'
import React from 'react'

import ListItem from './ListItem'

const ids = [0,1,2,3]
const List = () => (
  <ol>
    {
      ids.map(id => <ListItem key={id} _id={id} />)
    }
  </ol>
)

export default List


