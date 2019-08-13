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
import Search from './components/Recipe/Search'
import AddRecipe from './components/Recipe/AddRecipe'
import RecipePage from './components/Recipe/RecipePage'
import Profile from './components/Profile/Profile'
import Navbar from './components/Navbar'
import withSession from './components/withSession'
import Constants from './constants'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('tokenR')
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
    // if (networkError.statusCode === 401) {
    //   localStorage.removeItem('token')
    // }
  },
})

const NavBarWithSession = withSession(({ session }) => <Navbar session={session} />)

const Root = (
  <Router>
    <NavBarWithSession />
    <Switch>
      <Route path={Constants.PATHS.root} exact component={withSession(App)} />
      <Route path={Constants.PATHS.search} component={Search} />
      <Route path={Constants.PATHS.addRecipe} render={withSession(({ session, ...rest }) => <AddRecipe session={session} {...rest} />)} />
      <Route path={Constants.PATHS.recipePage} component={RecipePage} />
      <Route path={Constants.PATHS.profile} component={Profile} />
      <Route path={Constants.PATHS.signUp} render={withSession(({ refetch, ...rest }) => <SignUp refetch={refetch} {...rest} />)} />
      <Route path={Constants.PATHS.signIn} render={withSession(({ refetch, ...rest }) => <SignIn refetch={refetch} {...rest} />)} />
      <Redirect to={Constants.PATHS.root} />
    </Switch>
  </Router>
)


ReactDOM.render((
  <ApolloProvider client={client}>
    {Root}
  </ApolloProvider>
), document.getElementById('root'))

