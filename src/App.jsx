import { useState } from 'react'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'
import './App.css'

function App() {
  // State for storing search results and loading status
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Handle search query from SearchBar component
  const handleSearch = async (query) => {
    setLoading(true)

    try {
      // Fetch data from Open Food Facts API
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1`
      const response = await fetch(url)
      const data = await response.json()

      // Filter out products without names to avoid empty cards
      const filteredProducts = data.products.filter(
        (product) => product.product_name && product.product_name.trim() !== ''
      )

      setResults(filteredProducts)
    } catch (error) {
      console.error('Error fetching data:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>🥗 FoodFacts</h1>
        <p>Discover nutritional information about food items</p>
      </header>

      {/* Search bar component */}
      <SearchBar onSearch={handleSearch} />

      {/* Loading state */}
      {loading && <p className="status-message loading">Loading...</p>}

      {/* Initial state - no search yet */}
      {!loading && results.length === 0 && (
        <p className="status-message">Search for a food item to see its nutrition info.</p>
      )}

      {/* Display search results */}
      {!loading && results.length > 0 && <FoodList products={results} />}
    </div>
  )
}

export default App
