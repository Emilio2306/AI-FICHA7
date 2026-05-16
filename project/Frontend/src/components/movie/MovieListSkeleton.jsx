import React from 'react'

function MovieListSkeleton() {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <div className="skeleton skeleton-title mb-2" style={{ width: '180px' }} />
          <div className="skeleton skeleton-text" style={{ width: '120px' }} />
        </div>
        <div className="skeleton skeleton-button" />
      </div>

      <div className="surface" style={{ padding: 0, overflow: 'hidden' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="skeleton-row">
            <div className="skeleton skeleton-poster-sm" />
            <div className="flex-grow-1">
              <div className="skeleton skeleton-text mb-2" style={{ width: '40%' }} />
              <div className="skeleton skeleton-text" style={{ width: '70%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieListSkeleton