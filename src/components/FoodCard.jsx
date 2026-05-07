import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
  const {
    product_name,
    brands,
    nutriments,
    image_small_url,
    code,
    quantity,
  } = product

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
    <article className="food-card food-card-clickable" onClick={handleClick} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && handleClick()}>
      {image_small_url ? (
        <img
          src={image_small_url}
          alt={product_name || 'Food item image'}
          className="food-image"
        />
      ) : (
        <div className="food-image-placeholder">No image available</div>
      )}

      <div className="food-card-content">
        <h2 className="product-name">{product_name || 'Unknown Product'}</h2>
        <p className="product-brand">{brands ? `Brand: ${brands}` : 'Brand: Unknown'}</p>
        {quantity && <p className="product-quantity">Size: {quantity}</p>}
        {code && <p className="product-code">Barcode: {code}</p>}

        <div className="nutrition-info">
          <p>
            <strong>Calories:</strong> {calories} kcal
          </p>
          <p>
            <strong>Protein:</strong> {protein} g
          </p>
          <p>
            <strong>Carbs:</strong> {carbs} g
          </p>
          <p>
            <strong>Fat:</strong> {fat} g
          </p>
        </div>
      </div>
    </article>
  )
}

export default FoodCard