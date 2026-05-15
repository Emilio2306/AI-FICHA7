import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { moviesApi, gendersApi } from '../services/api'
import MovieForm from '../components/movie/MovieForm'

function MovieCreate() {
  const [genders, setGenders] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    gendersApi.list()
      .then(setGenders)
      .catch(() => console.error('Erro ao buscar géneros'))
  }, [])

  const handleSubmit = async (formData) => {
    try {
      await moviesApi.create(formData)
      navigate('/movies')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar filme.')
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