import React, { useState } from 'react'
import { useQuery, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import {
  GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER, 
} from '../../queries'

const UserRecipes = ({ username }) => {
  const [currentRecipeIdDelete, setRecipeId] = useState(null)

  const { data, loading, error } = useQuery(GET_USER_RECIPES, {
    variables: { username },
  })

  const handleDeleteRecipe = async (e, deleteRecipe) => {
    const confirmDelete = window.confirm('Are you realy want to delete this recipe?')
    if (confirmDelete) {
      await deleteRecipe()
    }
  }
  if (loading) return <p>Loading....</p>
  if (error) return <p>{error.message}</p>
  return (
    <div>
      <h3>Your recipes</h3>
      {!data.getUserRecipes.length && <p>You have not added any recipes yet</p>}
      <ul>
        {data.getUserRecipes.map(item => (
          <li key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <p>{item.name}</p>
              <p style={{ marginBottom: 0 }}>Likes: {item.likes}</p>
            </Link>
            <Mutation
              mutation={DELETE_USER_RECIPE}
              variables={{ id: item.id }}
              refetchQueries={[{ query: GET_ALL_RECIPES }, { query: GET_CURRENT_USER }]}
              update={(cache, { data: { deleteUserRecipe } }) => {
                const { getUserRecipes } = cache.readQuery({
                  query: GET_USER_RECIPES,
                  variables: { username },
                })
              
                cache.writeQuery({
                  query: GET_USER_RECIPES,
                  variables: { username },
                  data: {
                    getUserRecipes: getUserRecipes.filter(item => item.id !== deleteUserRecipe.id),
                  },
                })
              }}
            >
              {(deleteRecipe, { loadingMutation }) => (
                <p
                  className="delete-button"
                  onClick={e => {             
                    handleDeleteRecipe(e, deleteRecipe)
                  }}
                >{loadingMutation ? 'DELETING' : 'X'}
                </p>
              )}
            </Mutation>
            
          </li>
        ))}

      </ul>
    </div>
  )
  
}

export default UserRecipes
