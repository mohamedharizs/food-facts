import { useNavigate } from 'react-router-dom'
import './SavedPage.css'

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate()

  return (
    <div className="app-container saved-page">
      <div className="page-header">
        <h2>Saved Items</h2>
      </div>

      {saved.length === 0 ? (
        <p className="status-message">You have no saved products yet. Save an item from the detail page.</p>
      ) : (
        <div className="saved-list">
          {saved.map((product) => (
            <article key={product.code} className="saved-card">
              <div>
                <h3>{product.product_name || 'Unknown Product'}</h3>
                <p>{product.brands || 'Brand Unknown'}</p>
              </div>
              <div className="saved-actions">
                <button onClick={() => navigate(`/product/${product.code}`)}>
                  View Details
                </button>
                <button onClick={() => dispatch({ type: 'REMOVE', code: product.code })} className="remove-button">
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedPage
