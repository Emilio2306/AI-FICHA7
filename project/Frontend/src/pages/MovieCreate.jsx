import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { moviesApi, gendersApi } from '../services/api'
import { useToast } from '../contexts/ToastContext'
import MovieForm from '../components/movie/MovieForm'

function MovieCreate() {
  const toast = useToast()
  const navigate = useNavigate()
  const [genders, setGenders] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    gendersApi.list()
      .then(setGenders)
      .catch(() => toast.error('Erro ao carregar géneros.'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (formData) => {
    try {
      await moviesApi.create(formData)
      toast.success('Filme criado com sucesso!')
      navigate('/movies')
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao criar filme.'
      setError(message)
      toast.error(message)
    }
  }

  return (
    <div className="container" style={{ maxWidth: '640px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">Novo Filme</h1>
          <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
            Adiciona um novo filme ao catálogo.
          </p>
        </div>
        <Link to="/movies" className="btn btn-outline-secondary">← Voltar</Link>
      </div>

      <div className="surface">
        <MovieForm
          genders={genders}
          onSubmit={handleSubmit}
          submitLabel="Criar Filme"
          submitVariant="primary"
          requireImage={true}
          error={error}
        />
      </div>
    </div>
  )
}

export default MovieCreate