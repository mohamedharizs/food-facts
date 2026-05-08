import { useState } from 'react'
import { Box, TextField, Button, FormHelperText } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

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
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          fullWidth
          type="search"
          placeholder="Search for a food (e.g. banana, oats, milk)"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          variant="outlined"
          error={!!validationError}
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!query.trim()}
          startIcon={<SearchIcon />}
          sx={{ textTransform: 'none', px: 4, minWidth: 120 }}
        >
          Search
        </Button>
      </Box>
      {validationError && (
        <FormHelperText error sx={{ ml: 0 }}>
          {validationError}
        </FormHelperText>
      )}
    </Box>
  )
}

export default SearchBar