import React from 'react'
import { useQuery } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { GET_CURRENT_USER } from '../queries'

const withAuth = conditionFunc => Component => props => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER)
  if (loading) return null
  return conditionFunc(data) ? <Component {...props} /> : <Redirect to="/" />
}

export default withAuth
