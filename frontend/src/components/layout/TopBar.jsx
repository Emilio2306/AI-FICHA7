import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Topbar() {
  return (
    <header className="topbar">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/filmes" className="brand">
          <span className="brand-dot" />
          CINETECA
        </Link>

        <nav className="d-flex gap-4 align-items-center">
          <NavLink
            to="/filmes"
            className={({ isActive }) =>
              isActive ? 'text-primary-custom' : 'text-secondary-custom'
            }
            style={{ fontWeight: 500 }}
          >
            Catálogo
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Topbar