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
})

const Root = (
  <Router>
    <Switch>
      <Route to={Constants.PATHS.root} exact component={App} />
      <Route to={Constants.PATHS.signIn} component={SignIn} />
      <Route to={Constants.PATHS.signUp} component={SignIn} />
      <Redirect to={Constants.PATHS.root} />
    </Switch>
  </Router>
)

ReactDOM.render((
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>
), document.getElementById('root'))

