import { useState } from 'react'

function SearchBar({ onSearch }) {
  // State for the search input field
  const [query, setQuery] = useState('')

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Only search if query is not empty
    if (query.trim()) {
      onSearch(query)
      setQuery('') // Clear input after search
    }
  }

  // Handle input change - this makes it a controlled component
  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search for a food (e.g., apple, bread, milk)..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  )
}

export default SearchBar