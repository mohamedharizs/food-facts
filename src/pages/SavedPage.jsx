import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../store/savedSlice'
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  CardMedia,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import './SavedPage.css'

function SavedPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const savedItems = useSelector((state) => state.saved.items)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Saved Items
      </Typography>

      {savedItems.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            You have no saved products yet. Save an item from the detail page.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {savedItems.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.code}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out',
                  },
                }}
              >
                {product.image_url && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image_url}
                    alt={product.product_name || 'Product image'}
                    sx={{ objectFit: 'cover' }}
                  />
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                    {product.product_name || 'Unknown Product'}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.brands || 'Brand Unknown'}
                  </Typography>

                  {product.quantity && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Size:</strong> {product.quantity}
                    </Typography>
                  )}

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Calories:</strong> {product.nutriments?.['energy-kcal_100g'] ?? 'N/A'} kcal
                  </Typography>
                </CardContent>

                <CardActions sx={{ pt: 0 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/product/${product.code}`)}
                    sx={{ flex: 1, textTransform: 'none' }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => dispatch(removeItem(product.code))}
                    sx={{ flex: 1, textTransform: 'none' }}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default SavedPage
