import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router, Route, Switch, Redirect, 
} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import App from './App'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import Constants from './constants'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError)
    }
    if (networkError.statusCode === 401) {
      localStorage.removeItem('token')
    }
  },
})

const Root = (
  <Router>
    <Switch>
      <Route path={Constants.PATHS.root} exact component={App} />
      <Route path={Constants.PATHS.signUp} component={SignUp} />
      <Route path={Constants.PATHS.signIn} component={SignIn} />
      <Redirect path={Constants.PATHS.root} />
    </Switch>
  </Router>
)

ReactDOM.render((
  <ApolloProvider client={client}>
    {Root}
  </ApolloProvider>
), document.getElementById('root'))

