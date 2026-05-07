import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setValidationError('Search cannot be empty.')
      return
    }

    if (trimmedQuery.length < 2) {
      setValidationError('Please enter at least 2 characters.')
      return
    }

    setValidationError('')
    onSearch(trimmedQuery)
    setQuery('')
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim().length >= 2) {
      setValidationError('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="search"
        aria-label="Search food items"
        placeholder="Search for a food (e.g. banana, oats, milk)"
        value={query}
        onChange={handleChange}
        className="search-input"
        autoComplete="off"
      />
      <button type="submit" className="search-button" disabled={!query.trim()}>
        Search
      </button>
      {validationError && <p className="validation-error">{validationError}</p>}
    </form>
  )
}

export default SearchBar