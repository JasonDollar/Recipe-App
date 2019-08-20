import React from 'react'
import { useQuery } from 'react-apollo'
import { Link } from 'react-router-dom'
import { GET_USER_RECIPES } from '../../queries'

const UserRecipes = ({ username }) => {
  console.log(username)
  const { data, loading, error } = useQuery(GET_USER_RECIPES, {
    variables: { username },
  })
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
              <p>{item.likes}</p>
            </Link>
          </li>
        ))}

      </ul>
    </div>
  )
  
}

export default UserRecipes
