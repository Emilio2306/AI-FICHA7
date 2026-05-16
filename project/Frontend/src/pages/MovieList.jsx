import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { moviesApi, gendersApi } from '../services/api'
import { useToast } from '../contexts/ToastContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import MovieTable from '../components/movie/MovieTable'
import MovieGrid from '../components/movie/MovieGrid'
import MovieFilters from '../components/movie/MovieFilters'
import ConfirmModal from '../components/ui/ConfirmModal'
import MovieListSkeleton from '../components/movie/MovieListSkeleton'

function MovieList() {
  const toast = useToast()
  const [movies, setMovies] = useState([])
  const [genders, setGenders] = useState([])
  const [loading, setLoading] = useState(true)
  const [movieToDelete, setMovieToDelete] = useState(null)
  const [view, setView] = useLocalStorage('moviesView', 'grid')

  // Filtros
  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState('')

  useEffect(() => {
    fetchInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchInitialData = async () => {
    try {
      const [moviesList, gendersList] = await Promise.all([
        moviesApi.list(),
        gendersApi.list(),
      ])
      setMovies(moviesList)
      setGenders(gendersList)
    } catch {
      toast.error('Erro ao carregar dados.')
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

  // -------- FILTRAGEM (memoizada) --------
  const filteredMovies = useMemo(() => {
    const term = search.trim().toLowerCase()
    return movies.filter(movie => {
      const matchesSearch =
        !term ||
        movie.title?.toLowerCase().includes(term) ||
        movie.description?.toLowerCase().includes(term)

      const matchesGender =
        !genderFilter || String(movie.genderId) === String(genderFilter)

      return matchesSearch && matchesGender
    })
  }, [movies, search, genderFilter])

  const hasActiveFilters = search.trim() !== '' || genderFilter !== ''
  const clearFilters = () => {
    setSearch('')
    setGenderFilter('')
  }

  if (loading) return <MovieListSkeleton />

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h1 className="mb-1">Catálogo</h1>
          <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
            {hasActiveFilters ? (
              <>
                {filteredMovies.length} de {movies.length}{' '}
                {movies.length === 1 ? 'filme' : 'filmes'}
              </>
            ) : (
              <>
                {movies.length} {movies.length === 1 ? 'filme' : 'filmes'} no catálogo
              </>
            )}
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="view-switcher" role="group" aria-label="Modo de vista">
            <button
              className={`view-switcher-btn ${view === 'grid' ? 'active' : ''}`}
              onClick={() => setView('grid')}
              type="button"
            >
              ▦ Grid
            </button>
            <button
              className={`view-switcher-btn ${view === 'table' ? 'active' : ''}`}
              onClick={() => setView('table')}
              type="button"
            >
              ☰ Tabela
            </button>
          </div>

          <Link to="/movies/new" className="btn btn-primary">
            + Novo Filme
          </Link>
        </div>
      </div>

      <MovieFilters
        search={search}
        onSearchChange={setSearch}
        genderId={genderFilter}
        onGenderChange={setGenderFilter}
        genders={genders}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {filteredMovies.length === 0 && hasActiveFilters ? (
        <div className="empty-state">
          <p className="mb-2" style={{ fontSize: '1.1rem' }}>🔍</p>
          <p className="mb-3">Nenhum filme corresponde aos filtros.</p>
          <button onClick={clearFilters} className="btn btn-outline-secondary">
            Limpar filtros
          </button>
        </div>
      ) : view === 'grid' ? (
        <MovieGrid movies={filteredMovies} onDelete={setMovieToDelete} />
      ) : (
        <MovieTable movies={filteredMovies} onDelete={setMovieToDelete} />
      )}

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