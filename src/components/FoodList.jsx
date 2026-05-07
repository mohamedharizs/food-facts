import FoodCard from './FoodCard'

function FoodList({ products }) {
  // Handle empty state
  if (!products || products.length === 0) {
    return <p className="no-results">No food items found. Try a different search.</p>
  }

  return (
    <div className="food-list">
      {/* Map through products array and render a FoodCard for each item */}
      {products.map((product) => (
        <FoodCard
          // Use product.code as unique key (barcode from API)
          key={product.code}
          product={product}
        />
      ))}
    </div>
  )
}

export default FoodList