import gql from 'graphql-tag'

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