import { useState } from 'react'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = (query) => {
    console.log('Searching for:', query)
  }

  return (
    <div>
      <h1>🥗 FoodFacts</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      <FoodList products={results} />
    </div>
  )
}

export default App