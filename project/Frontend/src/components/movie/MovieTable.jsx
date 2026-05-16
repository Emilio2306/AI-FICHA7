import React from 'react'
import { Link } from 'react-router-dom'
import { assetUrl } from '../../services/api'

function MovieTable({ movies, onDelete }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <p className="mb-2" style={{ fontSize: '1.1rem' }}>🎬</p>
        <p className="mb-0">Nenhum filme no catálogo ainda.</p>
      </div>
    )
  }

  return (
    <div
  className="surface"
  style={{
    padding: 0,
    overflow: 'hidden',
    border: '1px solid var(--border)',
  }}>
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Poster</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Género</th>
            <th style={{ textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <td style={{ color: 'var(--text-muted)' }}>{movie.id}</td>
              <td>
                <img
                  src={assetUrl(movie.image)}
                  alt={movie.title}
                  className="poster poster-sm"
                />
              </td>
              <td style={{ fontWeight: 500 }}>
                <Link
                    to={`/movies/${movie.id}`}
                    style={{ color: 'var(--text-primary)' }}
                >
                    {movie.title}
                </Link>
                </td>              
                <td style={{ color: 'var(--text-secondary)' }}>
                {movie.description?.substring(0, 80)}
                {movie.description?.length > 80 && '...'}
              </td>
              <td>{movie.genderName || movie.genderId || '—'}</td>
              <td style={{ textAlign: 'right' }}>
                <Link
                  to={`/movies/edit/${movie.id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Editar
                </Link>
                <button
                  onClick={() => onDelete(movie.id)}
                  className="btn btn-sm btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MovieTable