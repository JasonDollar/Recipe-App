import React from 'react'
import { Link } from 'react-router-dom'

const SearchItem = ({ searchItem }) => (
  <li key={searchItem.id}>
    <Link to={`/recipe/${searchItem.id}`}>
      <h4>{searchItem.name}</h4>
    </Link>
    <p>Likes: {searchItem.likes}</p>
  </li>
)

export default SearchItem
