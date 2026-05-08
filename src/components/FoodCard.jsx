import { useNavigate } from 'react-router-dom'
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material'

function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url, code, quantity } = product

  const navigate = useNavigate()
  const calories = nutriments?.['energy-kcal_100g'] ?? 'N/A'
  const protein = nutriments?.['proteins_100g'] ?? 'N/A'
  const carbs = nutriments?.['carbohydrates_100g'] ?? 'N/A'
  const fat = nutriments?.['fat_100g'] ?? 'N/A'

  const handleClick = () => {
    if (code) {
      navigate(`/product/${code}`)
    }
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-4px)',
          transition: 'all 0.2s ease-in-out',
        },
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={image_small_url || '/food-placeholder.png'}
          alt={product_name || 'Food item image'}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
            {product_name || 'Unknown Product'}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {brands ? `Brand: ${brands}` : 'Brand: Unknown'}
          </Typography>

          {quantity && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              Size: {quantity}
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
            <Chip label={`${calories} kcal`} size="small" variant="outlined" />
            <Chip label={`${protein}g protein`} size="small" variant="outlined" />
            <Chip label={`${carbs}g carbs`} size="small" variant="outlined" />
            <Chip label={`${fat}g fat`} size="small" variant="outlined" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default FoodCard