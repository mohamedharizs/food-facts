import { Grid, Typography, Box } from '@mui/material'
import FoodCard from './FoodCard'

function FoodList({ products }) {
  if (!products || products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">No food items found. Try a different search.</Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={3}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.code || product._id || index}>
          <FoodCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

export default FoodList