import React from 'react'
import { Link } from 'react-router-dom'

function MovieFormSkeleton({ title = 'A carregar...' }) {
  return (
    <div className="container" style={{ maxWidth: '640px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">{title}</h1>
          <div className="skeleton skeleton-text" style={{ width: '180px' }} />
        </div>
        <Link to="/movies" className="btn btn-outline-secondary">← Voltar</Link>
      </div>

      <div className="surface">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="mb-3">
            <div className="skeleton skeleton-text mb-2" style={{ width: '80px', height: '14px' }} />
            <div className="skeleton" style={{ height: '44px', borderRadius: '6px' }} />
          </div>
        ))}
        <div className="skeleton skeleton-button" style={{ width: '100%', height: '44px' }} />
      </div>
    </div>
  )
}

export default MovieFormSkeleton