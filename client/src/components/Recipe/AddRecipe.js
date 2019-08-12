import React, { useState } from 'react'

const AddRecipe = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Lunch')
  const [description, setDescription] = useState('')
  const [instructions, setInstruction] = useState('')


  return (
    <div className="App">
      <h2 className="App">Add Recipe</h2>
      <form className="form">
        <input type="text" name="name" placeholder="Recipe Name" value={name} onChange={e => setName(e.target.value)} />
        <select name="category" value={category} onChange={e => setCategory(e.target.value)} id="">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>

        <input type="text" name="description" placeholder="Add description" value={description} onChange={e => setDescription(e.target.value)} />
        <textarea name="instructions" id="" cols="30" rows="10" placeholder="Add instructions" value={instructions} onChange={e => setInstruction(e.target.value)} />
        <button type="submit" className="button-primary">Submit</button>
      </form>
    </div>
  )
}

export default AddRecipe
