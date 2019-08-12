import React from 'react'
import './App.css'
import { Query } from 'react-apollo'
import { GET_ALL_RECIPES } from './queries'


function App() {

  return ( 
    <div>
      <h1>Recipes</h1>
      <Query query={GET_ALL_RECIPES}>  
        {({ data, loading, error }) => {
          console.log(data)
          if (loading) return <p>lol</p>
          if (error) return <p>{error.message}</p>
          return (
            data.getAllRecipes.map(item => (
              <p key={item.id}>{item.name}</p>
            ))
          )
        }}
      </Query>
    </div>
  )
}

export default App
