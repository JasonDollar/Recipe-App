import React from 'react'
import { Query } from 'react-apollo'
import { GET_CURRENT_USER } from '../queries'

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER} fetchPolicy="cache-and-network">
    {({ 
      data, loading, refetch, 
    }) => {
      if (loading) return <p>loading</p>
      console.log(data)
      return (
        <Component {...props} refetch={refetch} />
      )
    }}
  </Query>
)

export default withSession
