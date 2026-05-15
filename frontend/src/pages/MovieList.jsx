import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { moviesApi } from '../services/api'
import { useToast } from '../contexts/ToastContext'
import MovieTable from '../components/movie/MovieTable'
import ConfirmModal from '../components/ui/ConfirmModal'
import MovieListSkeleton from '../components/movie/MovieListSkeleton'

function MovieList() {
  const toast = useToast()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [movieToDelete, setMovieToDelete] = useState(null)

  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMovies = async () => {
    try {
      const data = await moviesApi.list()
      setMovies(data)
    } catch {
      toast.error('Erro ao carregar filmes.')
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = async () => {
    if (!movieToDelete) return
    const movieTitle = movies.find(m => m.id === movieToDelete)?.title || 'filme'
    try {
      await moviesApi.remove(movieToDelete)
      setMovies(movies.filter(m => m.id !== movieToDelete))
      toast.success(`"${movieTitle}" eliminado com sucesso.`)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro ao eliminar filme.')
    } finally {
      setMovieToDelete(null)
    }
  }

  if (loading) return <MovieListSkeleton />

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