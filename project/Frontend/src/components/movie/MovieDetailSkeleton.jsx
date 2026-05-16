import React from 'react'
import { Link } from 'react-router-dom'

function MovieDetailSkeleton() {
  return (
    <div className="container">
      <div className="mb-4">
        <Link to="/movies" className="btn btn-outline-secondary">
          ← Voltar ao catálogo
        </Link>
      </div>

      <div className="movie-detail">
        <div className="movie-detail-poster-wrapper">
          <div className="skeleton" style={{ width: '100%', aspectRatio: '2 / 3', borderRadius: 'var(--radius)' }} />
        </div>

        <div className="movie-detail-content">
          <div className="skeleton skeleton-text mb-2" style={{ width: '120px' }} />
          <div className="skeleton mb-3" style={{ height: '40px', width: '70%' }} />
          <div className="skeleton skeleton-text mb-4" style={{ width: '240px' }} />

          <div className="skeleton skeleton-text mb-2" style={{ width: '100px' }} />
          <div className="skeleton skeleton-text mb-2" />
          <div className="skeleton skeleton-text mb-2" />
          <div className="skeleton skeleton-text mb-4" style={{ width: '85%' }} />

          <div className="d-flex gap-2">
            <div className="skeleton skeleton-button" />
            <div className="skeleton skeleton-button" style={{ width: '100px' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailSkeleton