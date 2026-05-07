import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage'
import './DetailPage.css'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isSaved = saved.some((item) => item.code === barcode)

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
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product })
    }
  }

  return (
    <div className="app-container detail-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>Nutrition Detail</h2>
      </div>

      {loading && <p className="status-message loading">Loading product details...</p>}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && product && (
        <div className="detail-grid">
          <div className="detail-sidebar">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.product_name || 'Product image'}
                className="detail-image"
              />
            ) : (
              <div className="detail-image-placeholder">No image available</div>
            )}

            <div className="detail-meta">
              <h3>{product.product_name || 'Unknown Product'}</h3>
              <p>{product.brands || 'Brand Unknown'}</p>
              {product.quantity && <p>Size: {product.quantity}</p>}
              <p>Barcode: {product.code}</p>
              <button className="save-button" onClick={handleSaveClick}>
                {isSaved ? 'Remove from Saved' : 'Save Product'}
              </button>
            </div>
          </div>

          <div className="detail-content">
            <section className="nutrition-section">
              <h3>Nutrition Facts (per 100g)</h3>
              <div className="nutriment-grid">
                <div>
                  <strong>Calories:</strong>{' '}
                  {product.nutriments?.['energy-kcal_100g'] ?? 'N/A'} kcal
                </div>
                <div>
                  <strong>Protein:</strong>{' '}
                  {product.nutriments?.['proteins_100g'] ?? 'N/A'} g
                </div>
                <div>
                  <strong>Carbohydrates:</strong>{' '}
                  {product.nutriments?.['carbohydrates_100g'] ?? 'N/A'} g
                </div>
                <div>
                  <strong>Fat:</strong>{' '}
                  {product.nutriments?.['fat_100g'] ?? 'N/A'} g
                </div>
                <div>
                  <strong>Sugars:</strong>{' '}
                  {product.nutriments?.['sugars_100g'] ?? 'N/A'} g
                </div>
                <div>
                  <strong>Salt:</strong>{' '}
                  {product.nutriments?.['salt_100g'] ?? 'N/A'} g
                </div>
                <div>
                  <strong>Fiber:</strong>{' '}
                  {product.nutriments?.['fiber_100g'] ?? 'N/A'} g
                </div>
                <div>
                  <strong>Saturated fat:</strong>{' '}
                  {product.nutriments?.['saturated-fat_100g'] ?? 'N/A'} g
                </div>
              </div>
            </section>

            <section className="detail-description">
              <h3>Additional Information</h3>
              <p>{product.generic_name || 'No additional description available.'}</p>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailPage
