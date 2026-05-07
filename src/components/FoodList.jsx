import FoodCard from './FoodCard'

function FoodList({ products }) {
  if (!products || products.length === 0) {
    return <p className="no-results">No food items found. Try a different search.</p>
  }

  return (
    <div className="food-list">
      {products.map((product, index) => (
        <FoodCard key={product.code || product._id || index} product={product} />
      ))}
    </div>
  )
}

export default FoodList