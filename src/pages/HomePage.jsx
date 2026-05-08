import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage'
import useFoodSearch from '../hooks/useFoodSearch'
import { Container, Typography, Box, CircularProgress } from '@mui/material'
import './HomePage.css'

function HomePage() {
  const { results, loading, error, searchFood, hasSearched } = useFoodSearch()

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          🥗 FoodFacts
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Search any food name and see nutrition details from Open Food Facts.
        </Typography>
      </Box>

      <SearchBar onSearch={searchFood} />

      {error && <ErrorMessage message={error} />}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && !error && !hasSearched && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            Search for a food item to see its nutrition info.
          </Typography>
        </Box>
      )}

      {!loading && !error && hasSearched && results.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            No food items found. Try another search.
          </Typography>
        </Box>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
            Found {results.length} food items.
          </Typography>
          <FoodList products={results} />
        </>
      )}
    </Container>
  )
}

export default HomePage
