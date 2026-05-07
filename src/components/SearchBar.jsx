import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    onSearch(trimmedQuery)
    setQuery('')
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="search"
        aria-label="Search food items"
        placeholder="Search for a food (e.g. banana, oats, milk)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        autoComplete="off"
      />
      <button type="submit" className="search-button" disabled={!query.trim()}>
        Search
      </button>
    </form>
  )
}

export default SearchBar