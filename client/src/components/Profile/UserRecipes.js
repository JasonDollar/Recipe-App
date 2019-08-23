import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { GET_USER_RECIPES, DELETE_USER_RECIPE } from '../../queries'

const UserRecipes = ({ username }) => {
  const [currentRecipeIdDelete, setRecipeId] = useState(null)
  console.log(username)
  const { data, loading, error } = useQuery(GET_USER_RECIPES, {
    variables: { username },
  })
  const [deleteRecipe, { dataMutation }] = useMutation(DELETE_USER_RECIPE, {
    variables: {
      id: currentRecipeIdDelete,
    },
  })
  const handleDeleteRecipe = async (e, id) => {
    // e.stopPropagation()
    const confirmDelete = window.confirm('Are you realy want to delete this recipe?')
    if (confirmDelete) {
      setRecipeId(id)
      await deleteRecipe()

    }
  }
  if (loading) return <p>Loading....</p>
  if (error) return <p>{error.message}</p>
  return (
    <div>
      <h3>Your recipes</h3>
      <ul>
        {data.getUserRecipes.map(item => (
          <li key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <p>{item.name}</p>
              <p style={{ marginBottom: 0 }}>Likes: {item.likes}</p>
            </Link>
            <p className="delete-button" onClick={e => handleDeleteRecipe(e, item.id)}>X</p>
          </li>
        ))}

      </ul>
    </div>
  )
  
}

export default UserRecipes
