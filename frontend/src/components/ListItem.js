import { useQuery } from '@apollo/client'
import React from 'react'

import gql from 'graphql-tag'

export const GET_TEAM = gql`
  query getTeam($_id: Int) {
    team(_id: $_id) {
      _id
      name
      people { _id name }
    }
  }
`

const ListItem = ({ _id }) => {
  const { data, loading, error } = useQuery(
    GET_TEAM,
    { variables: { _id } }
  )

  if (loading) return '...'
  if (error) return <li>loading failed for {_id}</li>
  const { team } = data
  return (
    <li>
      <h4>{team.name}</h4>
      <ol>
        {team.people.map(person => <li>{person.name}</li>)}
      </ol>
    </li>
  )
}

export default ListItem