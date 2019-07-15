import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNUP_USER } from '../../queries'
import Error from '../Error'


const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const clearState = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
  }
  const validateForm = () => {
    let isInvalid = !username || !email || !password || !passwordConfirm
    if (password !== passwordConfirm) isInvalid = true
    return isInvalid
  }
  const handleFormSubmit = async (e, signup) => {
    e.preventDefault()
    
    clearState()
    const res = await signup()
    localStorage.setItem('token', res.data.signUpUser.token)
  }
  return (
    <div className="App">
      <h2> Sign Up</h2>
      <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
        {(signUpUser, { data, loading, error }) => (
          <form className="form" onSubmit={e => handleFormSubmit(e, signUpUser)}>
            <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
            <input id="passwordConfirm" type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="password" />
            <button type="submit" className="button-primary" disabled={loading || validateForm()}>Submit</button>
            {error && <Error error={error} />}
          </form>
        )}
      </Mutation>
      
    </div>
  )
}

export default SignUp
