function FoodCard({ product }) {
  // Destructure the product data
  const { product_name, brands, nutriments, image_small_url } = product

  return (
    <div className="food-card">
      {/* Display product image if available, otherwise show fallback */}
      {image_small_url ? (
        <img
          src={image_small_url}
          alt={product_name}
          className="food-image"
        />
      ) : (
        <div className="food-image-placeholder">No Image</div>
      )}

      {/* Product name */}
      <h2 className="product-name">{product_name || 'Unknown Product'}</h2>

      {/* Brand information */}
      {brands && <p className="product-brand">Brand: {brands}</p>}

      {/* Nutrition information with optional chaining to avoid crashes */}
      <div className="nutrition-info">
        <p>
          <strong>Calories:</strong> {nutriments?.['energy-kcal_100g'] || 'N/A'}{' '}
          kcal
        </p>
        <p>
          <strong>Protein:</strong> {nutriments?.['proteins_100g'] || 'N/A'} g
        </p>
        <p>
          <strong>Carbs:</strong> {nutriments?.['carbohydrates_100g'] || 'N/A'} g
        </p>
        <p>
          <strong>Fat:</strong> {nutriments?.['fat_100g'] || 'N/A'} g
        </p>
      </div>
    </div>
  )
}

export default FoodCard