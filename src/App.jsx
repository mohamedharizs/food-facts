import { useState } from 'react'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'
import './App.css'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)
    setError(null)
    setHasSearched(true)
    setResults([])

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      const filteredProducts = (data.products || []).filter(
        (product) => product.product_name && product.product_name.trim() !== ''
      )

      setResults(filteredProducts)
    } catch (fetchError) {
      console.error('Error fetching data:', fetchError)
      setError('Unable to load food data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>🥗 FoodFacts</h1>
        <p>Search any food name and see nutrition details from Open Food Facts.</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {error && <p className="status-message error">{error}</p>}
      {loading && <p className="status-message loading">Loading...</p>}

      {!loading && !error && !hasSearched && (
        <p className="status-message">Search for a food item to see its nutrition info.</p>
      )}

      {!loading && !error && hasSearched && results.length === 0 && (
        <p className="status-message no-results">No food items found. Try another search.</p>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <p className="results-summary">Found {results.length} food items.</p>
          <FoodList products={results} />
        </>
      )}
    </div>
  )
}

export default App
