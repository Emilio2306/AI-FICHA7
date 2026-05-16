import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { moviesApi, assetUrl } from '../services/api'
import { useToast } from '../contexts/ToastContext'
import ConfirmModal from '../components/ui/ConfirmModal'
import MovieDetailSkeleton from '../components/movie/MovieDetailSkeleton'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    fetchMovie()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchMovie = async () => {
    setLoading(true)
    setNotFound(false)
    try {
      const data = await moviesApi.getById(id)
      setMovie(data)
    } catch (err) {
      if (err.response?.status === 404) {
        setNotFound(true)
      } else {
        toast.error('Erro ao carregar filme.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      await moviesApi.remove(id)
      toast.success(`"${movie.title}" eliminado com sucesso.`)
      navigate('/movies')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro ao eliminar filme.')
      setShowDeleteModal(false)
    }
  }

  if (loading) return <MovieDetailSkeleton />

  if (notFound) {
    return (
      <div className="container mt-5">
        <div className="empty-state">
          <p className="mb-2" style={{ fontSize: '1.2rem' }}>🎬</p>
          <p className="mb-3">Filme não encontrado.</p>
          <Link to="/movies" className="btn btn-primary">
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    )
  }

  if (!movie) return null

  return (
    <div className="container">
      <div className="mb-4">
        <Link to="/movies" className="btn btn-outline-secondary">
          ← Voltar ao catálogo
        </Link>
      </div>

      <div className="movie-detail">
        <div className="movie-detail-poster-wrapper">
          <img
            src={assetUrl(movie.image)}
            alt={movie.title}
            className="movie-detail-poster"
          />
        </div>

        <div className="movie-detail-content">
          {movie.Genders?.description && (
            <span className="movie-detail-genre">
              {movie.Genders.description}
            </span>
          )}

          <h1 className="movie-detail-title">{movie.title}</h1>

          <div className="movie-detail-meta">
            <span>ID #{movie.id}</span>
            {movie.createdAt && (
              <>
                <span className="movie-detail-meta-sep">•</span>
                <span>
                  Adicionado em{' '}
                  {new Date(movie.createdAt).toLocaleDateString('pt-PT', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </>
            )}
          </div>

          <div className="movie-detail-description">
            <h2 className="movie-detail-section-title">Descrição</h2>
            <p>{movie.description}</p>
          </div>

          <div className="movie-detail-actions">
            <Link
              to={`/movies/edit/${movie.id}`}
              className="btn btn-primary"
            >
              Editar filme
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showDeleteModal}
        title="Eliminar filme"
        message={`Tens a certeza que queres eliminar "${movie.title}"? Esta ação não pode ser revertida.`}
        confirmLabel="Eliminar"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  )
}

export default MovieDetail