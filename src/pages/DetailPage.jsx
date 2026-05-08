import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { addItem, removeItem } from '../store/savedSlice'
import ErrorMessage from '../components/ErrorMessage'
import NutritionRow from '../components/NutritionRow'
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import './DetailPage.css'

function DetailPage() {
  const { barcode } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const savedItems = useSelector((state) => state.saved.items)
  const isSaved = savedItems.some((item) => item.code === barcode)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )

        if (cancelled) {
          return
        }

        const fetchedProduct = response.data?.product

        if (!fetchedProduct) {
          setError('Product details could not be found. Please try another item.')
          setProduct(null)
        } else {
          setProduct(fetchedProduct)
        }
      } catch (err) {
        if (cancelled) {
          return
        }

        if (err.response) {
          setError(`Unable to load product: ${err.response.status} ${err.response.statusText}`)
        } else if (err.request) {
          setError('Network error. Check your internet connection and try again.')
        } else {
          setError('An unexpected error occurred while loading the product.')
        }
        setProduct(null)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const handleSaveClick = () => {
    if (!product) {
      return
    }

    if (isSaved) {
      dispatch(removeItem(barcode))
    } else {
      dispatch(addItem(product))
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>

      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Nutrition Detail
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && product && (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={product.image_url || '/food-placeholder.png'}
                alt={product.product_name || 'Product image'}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {product.product_name || 'Unknown Product'}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.brands || 'Brand Unknown'}
                </Typography>

                {product.quantity && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Size:</strong> {product.quantity}
                  </Typography>
                )}

                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Barcode:</strong> {product.code}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSaveClick}
                  startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  color={isSaved ? 'success' : 'primary'}
                  sx={{ textTransform: 'none' }}
                >
                  {isSaved ? 'Remove from Saved' : 'Save Product'}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Nutrition Facts (per 100g)
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <NutritionRow label="Calories" value={product.nutriments?.['energy-kcal_100g']} unit="kcal" />
                <NutritionRow label="Protein" value={product.nutriments?.['proteins_100g']} unit="g" />
                <NutritionRow label="Carbohydrates" value={product.nutriments?.['carbohydrates_100g']} unit="g" />
                <NutritionRow label="Fat" value={product.nutriments?.['fat_100g']} unit="g" />
                <NutritionRow label="Sugars" value={product.nutriments?.['sugars_100g']} unit="g" />
                <NutritionRow label="Salt" value={product.nutriments?.['salt_100g']} unit="g" />
                <NutritionRow label="Fiber" value={product.nutriments?.['fiber_100g']} unit="g" />
                <NutritionRow label="Saturated fat" value={product.nutriments?.['saturated-fat_100g']} unit="g" />
              </Box>
            </Paper>

            {product.generic_name && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Additional Information
                </Typography>
                <Typography variant="body1">{product.generic_name}</Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default DetailPage
