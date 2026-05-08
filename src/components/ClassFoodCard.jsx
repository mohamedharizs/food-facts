import React from 'react'

class ClassFoodCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }

  componentDidMount() {
    console.log('ClassFoodCard mounted:', this.props.product?.product_name)
  }

  componentWillUnmount() {
    console.log('ClassFoodCard unmounted:', this.props.product?.product_name)
  }

  toggleExpanded = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }))
  }

  render() {
    const { product } = this.props
    const { expanded } = this.state

    if (!product) {
      return null
    }

    const { product_name, brands, nutriments, image_small_url, code, quantity } = product
    const calories = nutriments?.['energy-kcal_100g'] ?? 'N/A'
    const protein = nutriments?.['proteins_100g'] ?? 'N/A'

    return (
      <div
        className="food-card"
        onClick={this.toggleExpanded}
        style={{
          border: '1px solid #ddd',
          padding: '1rem',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        <h3>{product_name || 'Unknown Product'}</h3>
        {expanded && <p>{brands || 'Brand Unknown'}</p>}
        <p>
          <strong>Calories:</strong> {calories} kcal
        </p>
        <p>
          <strong>Protein:</strong> {protein} g
        </p>
        {quantity && <p>Size: {quantity}</p>}
        {code && <p>Barcode: {code}</p>}
      </div>
    )
  }
}

export default ClassFoodCard
