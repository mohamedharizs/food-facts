import { NavLink } from 'react-router-dom'
import './NavBar.css'

function NavBar({ savedCount }) {
  return (
    <nav className="nav-bar">
      <div className="nav-brand">FoodFacts</div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          Home
        </NavLink>
        <NavLink to="/saved" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          Saved{savedCount > 0 && <span className="badge">{savedCount}</span>}
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar
