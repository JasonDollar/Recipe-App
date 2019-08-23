import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries'
import Error from '../Error'

const AddRecipe = ({ session, history }) => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Lunch')
  const [description, setDescription] = useState('')
  const [instructions, setInstruction] = useState('')
  
  const [addRecipe, { data, loading, error }] = useMutation(ADD_RECIPE, {
    variables: {
      name, category, description, instructions, username: session.getCurrentUser.username,
    },
    refetchQueries: [{ query: GET_USER_RECIPES, variables: { username: session.getCurrentUser.username } }],
    update: (cache, { data: { addRecipe } }) => {
      console.log(cache)
      const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES })
      cache.writeQuery({
        query: GET_ALL_RECIPES,
        data: {
          getAllRecipes: [addRecipe, ...getAllRecipes],
        },
      })
    },
  })
  
  // console.log(session.getCurrentUser.username)
  const validateForm = () => {
    const isInvalid = !name || !category || !description || !instructions
    return isInvalid
  }

  return (
    <div className="App">
      <h2 className="App">Add Recipe</h2>
      <form
        className="form"
        onSubmit={async e => {
          e.preventDefault()
          const res = await addRecipe()
          console.log(res)
          // history.push(`/recipe/${res.data.addRecipe.id}`)
          history.push('/')
        }}
      >
        <input type="text" name="name" placeholder="Recipe Name" value={name} onChange={e => setName(e.target.value)} />
        <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>

        <input type="text" name="description" placeholder="Add description" value={description} onChange={e => setDescription(e.target.value)} />
        <textarea name="instructions" id="" cols="30" rows="10" placeholder="Add instructions" value={instructions} onChange={e => setInstruction(e.target.value)} />
        <button type="submit" className="button-primary" disabled={loading || validateForm()}>Submit</button>
        {error && <Error error={error} />}
      </form>
    </div>
  )
}

export default AddRecipe
