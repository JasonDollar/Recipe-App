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
      username
    }
  }
`

export const ADD_RECIPE = gql`
  mutation($name: String!, $description: String!, $category: String!, $instructions: String!, $username: String) {
    addRecipe(name: $name, description: $description, category: $category, instructions: $instructions, username: $username) {
      id
      name
      description
      instructions
    }
  }
`

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      id
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
      favorites {
        id
        name
      }
    }
  }
`

export const GET_USER_RECIPES = gql`
  query($username: String!) {
    getUserRecipes(username: $username) {
      id
      name
      likes
    }
  }
`