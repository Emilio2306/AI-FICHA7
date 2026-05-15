import React from 'react'
import { Link } from 'react-router-dom'
import { assetUrl } from '../../services/api'

/**
 * Grid de posters de filmes. Componente puramente apresentacional.
 *
 * Props:
 *   - movies: Array<Movie>
 *   - onDelete: (id) => void
 */
function MovieGrid({ movies, onDelete }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <p className="mb-2" style={{ fontSize: '1.1rem' }}>🎬</p>
        <p className="mb-0">Nenhum filme no catálogo ainda.</p>
      </div>
    )
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <article key={movie.id} className="movie-card">
          <Link to={`/movies/get/${movie.id}`} className="movie-card-poster-link">
            <img
              src={assetUrl(movie.image)}
              alt={movie.title}
              className="movie-card-poster"
              loading="lazy"
            />
            <div className="movie-card-overlay">
              <span className="movie-card-overlay-text">Ver detalhes</span>
            </div>
          </Link>

          <div className="movie-card-body">
            <h3 className="movie-card-title" title={movie.title}>
              {movie.title}
            </h3>
            {movie.gender?.description && (
              <span className="movie-card-genre">
                {movie.gender.description}
              </span>
            )}

            <div className="movie-card-actions">
              <Link
                to={`/movies/edit/${movie.id}`}
                className="btn btn-sm btn-warning flex-grow-1"
              >
                Editar
              </Link>
              <button
                onClick={() => onDelete(movie.id)}
                className="btn btn-sm btn-danger"
                aria-label="Eliminar"
                title="Eliminar"
              >
                🗑
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default MovieGrid