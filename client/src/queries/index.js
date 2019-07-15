import gql from 'graphql-tag'

/* Recipes Comments */
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      id
      name
      description
      instructions
      category
      likes
      createdDate
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