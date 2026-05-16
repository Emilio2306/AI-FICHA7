import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Topbar() {
  return (
    <header className="topbar">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/movies" className="brand"> <span className="brand-dot" /> CINEMA </Link>
        <nav className="d-flex gap-4 align-items-center">
          <NavLink to="/movies" className={({ isActive }) => (isActive ? 'active' : '')} > Catálogo </NavLink>
          <NavLink to="/movies/new" className={({ isActive }) => (isActive ? 'active' : '')} > Adicionar </NavLink>
          <NavLink to="/genders" className={({ isActive }) => (isActive ? 'active' : '')} > Géneros </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Topbar