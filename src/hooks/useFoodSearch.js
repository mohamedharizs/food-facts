import { useState } from 'react'
import axios from 'axios'

function useFoodSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const searchFood = async (query) => {
    if (!query || !query.trim()) {
      setError('Please enter a search term.')
      return
    }

    setLoading(true)
    setError(null)
    setHasSearched(true)
    setResults([])

    try {
      const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
        params: {
          search_terms: query,
          search_simple: 1,
          action: 'process',
          json: 1,
        },
      })

      const filteredProducts = (response.data.products || []).filter(
        (product) => product.product_name && product.product_name.trim() !== ''
      )

      setResults(filteredProducts)
    } catch (err) {
      if (err.response) {
        setError(`Unable to load food data: ${err.response.status} ${err.response.statusText}`)
      } else if (err.request) {
        setError('Network error. Check your internet connection and try again.')
      } else {
        setError('Unable to load food data. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    results,
    loading,
    error,
    hasSearched,
    searchFood,
  }
}

export default useFoodSearch
