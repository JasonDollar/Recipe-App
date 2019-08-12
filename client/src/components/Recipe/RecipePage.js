import React from 'react'
import { useQuery } from 'react-apollo'
import { GET_RECIPE } from '../../queries'

const RecipePage = ({ match }) => {
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { id: match.params.id },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <div className="App">
      <h2>{data.getRecipe.name}</h2>
      <p>Category: {data.getRecipe.category}</p>
      <p>Description: {data.getRecipe.description}</p>
      <p>Instructions: {data.getRecipe.instruction}</p>
      <p>Likes: {data.getRecipe.likes}</p>
      <p>Created by:: {data.getRecipe.username}</p>
      <button>Like</button>
    </div>
  )
}

export default RecipePage
