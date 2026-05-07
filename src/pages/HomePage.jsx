import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage'
import useFoodSearch from '../hooks/useFoodSearch'
import './HomePage.css'

function HomePage() {
  const { results, loading, error, searchFood, hasSearched } = useFoodSearch()

  return (
    <div className="app-container">
      <header>
        <h1>🥗 FoodFacts</h1>
        <p>Search any food name and see nutrition details from Open Food Facts.</p>
      </header>

      <SearchBar onSearch={searchFood} />

      {error && <ErrorMessage message={error} />}
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

export default HomePage
