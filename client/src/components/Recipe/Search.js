import React, { useState } from 'react'
import { useApolloClient } from 'react-apollo'
import SearchItem from './SearchItem'
import { SEARCH_RECIPES } from '../../queries'

const Search = props => {
  // const [search, setSearch] = useState('')
  const [recipes, setRecipes] = useState([])
  const apollo = useApolloClient()
  // const { data, loading, error } = useQuery(SEARCH_RECIPES, {
  //   variables: {
  //     searchTerm: search,
  //   },
  // })
  // if (loading) return <p>loading...</p>
  // console.log(data)

  return (
    <div>
      <input
        type="search"
        // onChange={e => setSearch(e.target.value)}
        placeholder="Search for recipes" 
        onChange={async e => {
          e.persist()
          const { data } = await apollo.query({
            query: SEARCH_RECIPES,
            variables: { searchTerm: e.target.value },
          })
          setRecipes(data.searchRecipes)
          console.log(data)
        }}
      />
      <ul>
        {recipes.map(item => <SearchItem key={item.id} searchItem={item} />)}
      </ul>
    </div>
  )
}

export default Search
