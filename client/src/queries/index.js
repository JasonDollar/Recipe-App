import gql from 'graphql-tag'

/* Recipes Comments */
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      id
      name
      category
     }
  }
`

export const GET_RECIPE = gql`
  query($id: ID!) {
    getRecipe(id: $id) {
      id
      name
      category
      description
      instructions
      createdDate
      name
      likes
    }
  }
`

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUpUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      token
    }
  }
`

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
    }
  }
`