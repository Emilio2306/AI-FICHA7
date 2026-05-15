import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { moviesApi, gendersApi } from '../services/api'
import { useToast } from '../contexts/ToastContext'
import MovieForm from '../components/movie/MovieForm'
import MovieFormSkeleton from '../components/movie/MovieFormSkeleton'

function MovieEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [initialValues, setInitialValues] = useState({
    title: '',
    genderId: '',
    description: '',
  })
  const [currentImage, setCurrentImage] = useState(null)
  const [genders, setGenders] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movie, gendersList] = await Promise.all([
          moviesApi.getById(id),
          gendersApi.list(),
        ])

        setInitialValues({
          title: movie.title,
          genderId: movie.genderId,
          description: movie.description,
        })
        setCurrentImage(movie.image)
        setGenders(gendersList)
      } catch {
        toast.error('Erro ao carregar dados do filme.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSubmit = async (formData) => {
    try {
      await moviesApi.update(id, formData)
      toast.success('Filme atualizado com sucesso!')
      navigate('/movies')
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao atualizar filme.'
      setSubmitError(message)
      toast.error(message)
    }
  }

  if (loading) return <MovieFormSkeleton title="Editar Filme" />

  return (
    <div className="container" style={{ maxWidth: '640px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">Editar Filme</h1>
          <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
            Atualiza os dados do filme.
          </p>
        </div>
        <Link to="/movies" className="btn btn-outline-secondary">← Voltar</Link>
      </div>

      <div className="surface">
        <MovieForm
          initialValues={initialValues}
          currentImage={currentImage}
          genders={genders}
          onSubmit={handleSubmit}
          submitLabel="Guardar Alterações"
          submitVariant="primary"
          requireImage={false}
          error={submitError}
        />
      </div>
    </div>
  )
}

export default MovieEdit