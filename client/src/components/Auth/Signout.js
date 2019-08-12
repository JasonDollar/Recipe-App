import React from 'react'
import { withRouter } from 'react-router-dom'
import { useApolloClient } from 'react-apollo'

const Signout = ({ history }) => {
  const { resetStore } = useApolloClient()
  // console.log(client)
  const handleSignout = (resetStore, history) => {
    localStorage.setItem('tokenR', '')
    resetStore()
    history.push('/')
  }
  return (

    <button onClick={() => handleSignout(resetStore, history)}>Signout</button>
    
  )
}

export default withRouter(Signout)
