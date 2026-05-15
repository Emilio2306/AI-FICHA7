import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { moviesApi } from '../services/api'
import MovieTable from '../components/movie/MovieTable'
import ConfirmModal from '../components/ui/ConfirmModal'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [movieToDelete, setMovieToDelete] = useState(null)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const data = await moviesApi.list()
      setMovies(data)
    } catch {
      setError('Erro ao carregar filmes.')
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = async () => {
    if (!movieToDelete) return
    try {
      await moviesApi.remove(movieToDelete)
      setMovies(movies.filter(m => m.id !== movieToDelete))
    } catch {
      alert('Erro ao eliminar filme.')
    } finally {
      setMovieToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner" />
        <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>
          A carregar filmes...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">Catálogo</h1>
          <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
            {movies.length} {movies.length === 1 ? 'filme' : 'filmes'} no catálogo
          </p>
        </div>
        <Link to="/movies/new" className="btn btn-primary">
          + Novo Filme
        </Link>
      </div>

      <MovieTable movies={movies} onDelete={setMovieToDelete} />

      <ConfirmModal
        show={movieToDelete !== null}
        title="Eliminar filme"
        message="Tens a certeza que queres eliminar este filme? Esta ação não pode ser revertida."
        confirmLabel="Eliminar"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setMovieToDelete(null)}
      />
    </div>
  )
}

export default MovieList