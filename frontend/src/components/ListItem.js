import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React from 'react'

import { useDirectContext } from './Context'


export const GET_TEAM_FEDERATION = gql`
  query getTeamFederation($_id: Int) {
    team(_id: $_id) {
      _id
      name
      # people { _id name }
    }
  }
`

export const GET_TEAM_SERVICE = gql`
  query getTeamService($_id: Int) {
    team(_id: $_id) {
      _id
      name
    }
  }
`

const ListItem = ({ _id }) => {
  const { direct } = useDirectContext()
  const { data, loading, error } = useQuery(
    direct ? GET_TEAM_SERVICE : GET_TEAM_FEDERATION,
    { variables: { _id }, fetchPolicy: 'network-only', context: { direct } }
  )

  if (loading) return '...'
  if (error) return <li>loading failed for {_id}</li>
  const { team } = data
  return (
    <li>
      <h4>{team.name}</h4>
      <ol>
        {team.people && team.people.map((person, index) => <li key={index} >{person.name}</li>)}
      </ol>
    </li>
  )
}

export default ListItem