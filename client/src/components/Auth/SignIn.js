import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNIN_USER, GET_CURRENT_USER } from '../../queries'
import Error from '../Error'

const SignIn = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const clearState = () => {
    setUsername('')
    setPassword('')
  }
  const validateForm = () => {
    let isInvalid = !username || !password 
    return isInvalid
  }
  const handleFormSubmit = async (e, signin) => {
    e.preventDefault()
    
    clearState()
    const res = await signin()
    localStorage.setItem('tokenR', res.data.signInUser.token)
    await props.refetch()
    props.history.push('/')
  }
  return (
    <div className="App">
      <h2> Sign Up</h2>
      <Mutation mutation={SIGNIN_USER} variables={{ username, password }} refetchQueries={[{ query: GET_CURRENT_USER }]}>
        {(signInUser, { data, loading, error }) => (
          <form className="form" onSubmit={e => handleFormSubmit(e, signInUser)}>
            <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
            <button type="submit" className="button-primary" disabled={loading || validateForm()}>Submit</button>
            {error && <Error error={error} />}
          </form>
        )}
      </Mutation>
      
    </div>
  )
}

export default SignIn
